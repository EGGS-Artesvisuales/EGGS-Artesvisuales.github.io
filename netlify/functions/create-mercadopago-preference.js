const { randomUUID } = require("crypto");
const { COMMERCE_CONFIG } = require("../lib/commerce-config");
const { PRODUCTS } = require("../lib/products");
const { calculateShipping } = require("../lib/shipping");
const {
  connectInventory,
  releaseReservation,
  reserveInventory,
} = require("../lib/inventory");
const {
  connectOrders,
  deleteOrder,
  savePendingOrder,
} = require("../lib/orders");
const {
  checkCheckoutGate,
  connectCheckoutSecurity,
  logCommerceEvent,
  rememberActiveReservation,
} = require("../lib/checkout-security");

const MERCADOPAGO_API_URL = "https://api.mercadopago.com/checkout/preferences";
const SITE_URL = "https://eggs-studio.cl";
const MERCADOPAGO_ENV = (process.env.MERCADOPAGO_ENV || "test").toLowerCase();
const PREFERENCE_VALIDITY_MS = COMMERCE_CONFIG.paymentPreferenceTtlMs;
const CHECKOUT_LOCALES = Object.freeze({
  es: Object.freeze({
    success: "/ES/pago-exitoso.html",
    pending: "/ES/pago-pendiente.html",
    failure: "/ES/pago-rechazado.html",
  }),
  en: Object.freeze({
    success: "/EN/payment-success.html",
    pending: "/EN/payment-pending.html",
    failure: "/EN/payment-failed.html",
  }),
  mpd: Object.freeze({
    success: "/MPD/pago-exitoso.html",
    pending: "/MPD/pago-pendiente.html",
    failure: "/MPD/pago-rechazado.html",
  }),
  chn: Object.freeze({
    success: "/CHN/pago-exitoso.html",
    pending: "/CHN/pago-pendiente.html",
    failure: "/CHN/pago-rechazado.html",
  }),
});

function jsonResponse(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
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

function validatedBuyer(value) {
  const buyer = {
    phone: normalizedText(value?.phone, 25),
    location: normalizedText(value?.location, 120),
    address: normalizedText(value?.address, 200),
  };
  const validPhone = /^\+?[0-9 ()-]{7,25}$/.test(buyer.phone);
  const consent = value?.consent === true;

  if (!validPhone || buyer.location.length < 2 || buyer.address.length < 5 || !consent) {
    return null;
  }
  return buyer;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Método no permitido." });
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    logCommerceEvent("error", "missing_mercadopago_access_token");
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
  const shipping = calculateShipping({
    product: { ...product, sku },
    destinationKey: deliveryOption,
    locale,
  });
  if (!shipping) {
    return jsonResponse(400, { error: "No se pudo calcular el despacho para el destino seleccionado." });
  }

  const buyer = validatedBuyer(requestBody.buyer);
  if (!buyer) {
    return jsonResponse(400, { error: "Completa correctamente los datos para la entrega." });
  }

  let gate;
  try {
    await connectCheckoutSecurity(event);
    gate = await checkCheckoutGate({
      event,
      sku,
      buyer,
      captchaToken: requestBody.captcha_token,
    });
  } catch (error) {
    logCommerceEvent("error", "checkout_security_error", { sku, message: error.message });
    return jsonResponse(503, { error: "No se pudo validar la seguridad del checkout." });
  }

  if (!gate.allowed) {
    logCommerceEvent("warn", "checkout_blocked", { sku, reason: gate.reason });
    return jsonResponse(
      gate.statusCode || 429,
      {
        error: "Demasiados intentos de compra. Intenta nuevamente en unos minutos.",
        reason: gate.reason,
        captcha_required: Boolean(gate.captcha_required),
      },
      { "Retry-After": String(gate.retry_after_seconds || 600) },
    );
  }

  const orderId = randomUUID();
  let reservation;
  try {
    await connectInventory(event);
    reservation = await reserveInventory(sku, orderId, {
      ttlMs: COMMERCE_CONFIG.reservationTtlMs,
      buyerFingerprint: gate.fingerprint,
    });
    if (!reservation.reserved) {
      return jsonResponse(409, { error: "Este producto está agotado." });
    }
  } catch (error) {
    logCommerceEvent("error", "inventory_reservation_failed", { sku, message: error.message });
    return jsonResponse(503, { error: "No se pudo reservar el producto. Intenta nuevamente." });
  }

  try {
    await connectOrders(event);
    await savePendingOrder(orderId, {
      sku,
      delivery_option: deliveryOption,
      shipping,
      total_amount: Number(product.unitPrice) + Number(shipping.cost),
      locale,
      buyer,
      buyer_fingerprint: gate.fingerprint,
    }, { expiresAt: reservation.reservation_expires_at });
    await rememberActiveReservation({
      fingerprint: gate.fingerprint,
      orderId,
      sku,
      expiresAt: reservation.reservation_expires_at,
    });
  } catch (error) {
    await releaseReservation(sku, orderId).catch(() => {});
    logCommerceEvent("error", "order_save_failed", { sku, orderId, message: error.message });
    return jsonResponse(503, { error: "No se pudieron guardar los datos de entrega." });
  }

  const testMode = MERCADOPAGO_ENV !== "production";
  const preferenceStartsAt = new Date();
  const preferenceExpiresAt = new Date(preferenceStartsAt.getTime() + PREFERENCE_VALIDITY_MS);
  const preference = {
    items: [
      {
        id: sku,
        title: localizedProduct.title,
        description: `${localizedProduct.description}. ${shipping.label}.`,
        quantity: 1,
        currency_id: product.currency,
        unit_price: product.unitPrice,
      },
    ],
    shipments: {
      cost: shipping.cost,
      mode: "not_specified",
    },
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
      shipping_cost: shipping.cost,
      shipping_profile: shipping.profile,
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
        logCommerceEvent("warn", "reservation_release_failed_after_mp_reject", { sku, orderId, message: error.message });
      });
      await deleteOrder(orderId).catch((error) => {
        logCommerceEvent("warn", "order_delete_failed_after_mp_reject", { sku, orderId, message: error.message });
      });
      logCommerceEvent("error", "mercadopago_preference_rejected", {
        sku,
        orderId,
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
      logCommerceEvent("error", "mercadopago_missing_checkout_url", { sku, orderId });
      return jsonResponse(502, { error: "No se recibió la URL de pago." });
    }

    logCommerceEvent("info", "mercadopago_preference_created", {
      sku,
      orderId,
      shippingCost: shipping.cost,
      shippingProfile: shipping.profile,
      mode: testMode ? "test" : "production",
    });
    return jsonResponse(200, {
      preference_id: responseBody.id,
      checkout_url: checkoutUrl,
      mode: testMode ? "test" : "production",
      shipping,
      total_amount: Number(product.unitPrice) + Number(shipping.cost),
      reservation_expires_at: reservation.reservation_expires_at,
    });
  } catch (error) {
    await releaseReservation(sku, orderId).catch(() => {});
    await deleteOrder(orderId).catch(() => {});
    logCommerceEvent("error", "mercadopago_connection_failed", { sku, orderId, message: error.message });
    return jsonResponse(502, {
      error: "No se pudo conectar con Mercado Pago.",
    });
  }
};
