const { randomUUID } = require("crypto");
const { PRODUCTS } = require("../lib/products");
const {
  connectInventory,
  getInventory,
  releaseReservation,
  reserveInventory,
} = require("../lib/inventory");
const {
  connectOrders,
  deleteOrder,
  savePendingOrder,
} = require("../lib/orders");

const MERCADOPAGO_API_URL = "https://api.mercadopago.com/checkout/preferences";
const SITE_URL = "https://eggs-studio.cl";
const MERCADOPAGO_ENV = (process.env.MERCADOPAGO_ENV || "test").toLowerCase();
const PREFERENCE_VALIDITY_MS = 15 * 60 * 1000;
const CHECKOUT_LOCALES = Object.freeze({
  es: Object.freeze({
    success: "/ES/pago-exitoso.html",
    pending: "/ES/pago-pendiente.html",
    failure: "/ES/pago-rechazado.html",
    delivery: Object.freeze({
      santiago: "Entrega sin costo en Santiago",
      quote_later: "Despacho fuera de Santiago cotizado y pagado después",
    }),
  }),
  en: Object.freeze({
    success: "/EN/payment-success.html",
    pending: "/EN/payment-pending.html",
    failure: "/EN/payment-failed.html",
    delivery: Object.freeze({
      santiago: "Free delivery in Santiago",
      quote_later: "Shipping outside Santiago quoted and paid afterward",
    }),
  }),
  mpd: Object.freeze({
    success: "/MPD/pago-exitoso.html",
    pending: "/MPD/pago-pendiente.html",
    failure: "/MPD/pago-rechazado.html",
    delivery: Object.freeze({
      santiago: "Santiago mew müley müten eluwün",
      quote_later: "Santiago mülelay; werkün ñi falintun wüla feypingeay ka kullingeay",
    }),
  }),
  chn: Object.freeze({
    success: "/CHN/pago-exitoso.html",
    pending: "/CHN/pago-pendiente.html",
    failure: "/CHN/pago-rechazado.html",
    delivery: Object.freeze({
      santiago: "圣地亚哥市内免费交付",
      quote_later: "圣地亚哥以外地区的运费稍后报价并支付",
    }),
  }),
});

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

function normalizedText(value, maxLength) {
  return String(value || "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function validatedBuyer(value, options = {}) {
  const buyer = {
    name: normalizedText(value?.name, 120),
    email: normalizedText(value?.email, 254).toLowerCase(),
    phone: normalizedText(value?.phone, 25),
    location: normalizedText(value?.location, 120),
    address: normalizedText(value?.address, 200),
  };
  const validPhone = /^\+?[0-9 ()-]{7,25}$/.test(buyer.phone);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email);
  const consent = value?.consent === true;

  if (
    !validPhone ||
    buyer.location.length < 2 ||
    buyer.address.length < 5 ||
    !consent ||
    (options.requireContact && (buyer.name.length < 2 || !validEmail))
  ) {
    return null;
  }
  return buyer;
}

async function submitShippingQuote({ buyer, deliveryLabel, locale, product, sku }) {
  const localizedProduct = product.localized?.[locale] || product.localized?.es || product;
  const fields = new URLSearchParams({
    "form-name": "ventas-aprobadas",
    subject: `Cotización de despacho EGGS-Studio — ${sku}`,
    estado: "COTIZACIÓN DE DESPACHO SOLICITADA",
    pago_mercado_pago: "Pendiente de cotización",
    sku,
    producto: localizedProduct.title,
    monto: `${Number(product.unitPrice).toLocaleString("es-CL")} CLP + despacho por cotizar`,
    comprador: buyer.name,
    email: buyer.email,
    telefono: buyer.phone,
    modalidad_entrega: deliveryLabel,
    region_comuna: buyer.location,
    direccion: buyer.address,
    idioma: locale,
    fecha_pago: "Aún no se ha realizado ningún cobro",
  });
  const response = await fetch(`${SITE_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: fields.toString(),
  });
  if (!response.ok) throw new Error(`Netlify Forms respondió ${response.status}`);
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Método no permitido." });
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("MERCADOPAGO_ACCESS_TOKEN no está configurado.");
    return jsonResponse(500, { error: "El sistema de pagos aún no está configurado." });
  }

  let requestBody;
  try {
    requestBody = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "La solicitud no contiene JSON válido." });
  }

  const sku = String(requestBody.sku || "").trim();
  const product = PRODUCTS[sku];
  if (!product) {
    return jsonResponse(400, { error: "Producto no habilitado para Checkout Pro." });
  }

  const deliveryOption = String(requestBody.delivery_option || "").trim();
  if (!product.deliveryOptions[deliveryOption]) {
    return jsonResponse(400, { error: "Selecciona una opción de entrega válida." });
  }
  const localeKey = String(requestBody.lang || "es").trim().toLowerCase();
  const locale = CHECKOUT_LOCALES[localeKey] ? localeKey : "es";
  const localeSettings = CHECKOUT_LOCALES[locale];
  const localizedProduct = product.localized?.[locale] || product.localized?.es || product;
  const deliveryLabel = localeSettings.delivery[deliveryOption];
  const quoteMode = deliveryOption === "quote_later";
  const buyer = validatedBuyer(requestBody.buyer, { requireContact: quoteMode });
  if (!buyer) {
    return jsonResponse(400, { error: "Completa correctamente los datos para la entrega." });
  }

  if (quoteMode) {
    try {
      await connectInventory(event);
      const inventory = await getInventory(sku);
      if (!inventory.available) {
        return jsonResponse(409, { error: "Este producto está agotado." });
      }
      await submitShippingQuote({ buyer, deliveryLabel, locale, product, sku });
      return jsonResponse(200, { quote_requested: true });
    } catch (error) {
      console.error("No se pudo enviar la cotización de despacho.", error);
      return jsonResponse(502, { error: "No se pudo enviar la solicitud de cotización." });
    }
  }

  const orderId = randomUUID();
  let reservation;
  try {
    await connectInventory(event);
    reservation = await reserveInventory(sku, orderId);
    if (!reservation.reserved) {
      return jsonResponse(409, { error: "Este producto está agotado." });
    }
  } catch (error) {
    console.error("No se pudo reservar el producto antes del pago.", error);
    return jsonResponse(503, { error: "No se pudo reservar el producto. Intenta nuevamente." });
  }

  try {
    await connectOrders(event);
    await savePendingOrder(orderId, {
      sku,
      delivery_option: deliveryOption,
      locale,
      buyer,
    });
  } catch (error) {
    await releaseReservation(sku, orderId).catch(() => {});
    console.error("No se pudieron guardar los datos de entrega.", error);
    return jsonResponse(503, { error: "No se pudieron guardar los datos de entrega." });
  }

  // Los prefijos de credenciales de prueba varían según la integración.
  // Producción debe habilitarse de forma explícita mediante MERCADOPAGO_ENV.
  const testMode = MERCADOPAGO_ENV !== "production";
  const preferenceStartsAt = new Date();
  const preferenceExpiresAt = new Date(preferenceStartsAt.getTime() + PREFERENCE_VALIDITY_MS);
  const preference = {
    items: [
      {
        id: sku,
        title: localizedProduct.title,
        description: `${localizedProduct.description}. ${deliveryLabel}.`,
        quantity: 1,
        currency_id: product.currency,
        unit_price: product.unitPrice,
      },
    ],
    back_urls: {
      success: `${SITE_URL}${localeSettings.success}`,
      pending: `${SITE_URL}${localeSettings.pending}`,
      failure: `${SITE_URL}${localeSettings.failure}`,
    },
    notification_url: `${SITE_URL}/.netlify/functions/mercadopago-webhook`,
    auto_return: "approved",
    binary_mode: Boolean(product.binaryMode),
    expires: true,
    expiration_date_from: preferenceStartsAt.toISOString(),
    expiration_date_to: preferenceExpiresAt.toISOString(),
    external_reference: `${sku}:${orderId}`,
    statement_descriptor: "EGGS STUDIO",
    metadata: {
      sku,
      order_id: orderId,
      delivery_option: deliveryOption,
      lang: locale,
      source: "eggs-studio.cl",
    },
  };

  try {
    const response = await fetch(MERCADOPAGO_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": orderId,
      },
      body: JSON.stringify(preference),
    });

    const responseBody = await response.json().catch(() => ({}));
    if (!response.ok) {
      await releaseReservation(sku, orderId).catch((error) => {
        console.error("No se pudo liberar una reserva rechazada por Mercado Pago.", error);
      });
      await deleteOrder(orderId).catch((error) => {
        console.error("No se pudo eliminar una orden rechazada por Mercado Pago.", error);
      });
      console.error("Mercado Pago rechazó la preferencia.", {
        status: response.status,
        cause: responseBody.cause,
        message: responseBody.message,
      });
      return jsonResponse(502, {
        error: "Mercado Pago no pudo iniciar el pago.",
      });
    }

    const checkoutUrl = testMode
      ? responseBody.sandbox_init_point || responseBody.init_point
      : responseBody.init_point;

    if (!checkoutUrl) {
      await releaseReservation(sku, orderId).catch(() => {});
      await deleteOrder(orderId).catch(() => {});
      console.error("Mercado Pago no devolvió una URL de Checkout Pro.");
      return jsonResponse(502, { error: "No se recibió la URL de pago." });
    }

    return jsonResponse(200, {
      preference_id: responseBody.id,
      checkout_url: checkoutUrl,
      mode: testMode ? "test" : "production",
      reservation_expires_at: reservation.reservation_expires_at,
    });
  } catch (error) {
    await releaseReservation(sku, orderId).catch(() => {});
    await deleteOrder(orderId).catch(() => {});
    console.error("No se pudo conectar con Mercado Pago.", error);
    return jsonResponse(502, {
      error: "No se pudo conectar con Mercado Pago.",
    });
  }
};
