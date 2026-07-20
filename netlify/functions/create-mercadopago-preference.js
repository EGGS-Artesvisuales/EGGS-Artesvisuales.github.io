const { randomUUID } = require("crypto");
const { PRODUCTS } = require("../lib/products");
const {
  connectInventory,
  releaseReservation,
  reserveInventory,
} = require("../lib/inventory");

const MERCADOPAGO_API_URL = "https://api.mercadopago.com/checkout/preferences";
const SITE_URL = "https://eggs-studio.cl";
const MERCADOPAGO_ENV = (process.env.MERCADOPAGO_ENV || "test").toLowerCase();
const PREFERENCE_VALIDITY_MS = 15 * 60 * 1000;

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
  const deliveryLabel = product.deliveryOptions[deliveryOption];
  if (!deliveryLabel) {
    return jsonResponse(400, { error: "Selecciona una opción de entrega válida." });
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

  // Los prefijos de credenciales de prueba varían según la integración.
  // Producción debe habilitarse de forma explícita mediante MERCADOPAGO_ENV.
  const testMode = MERCADOPAGO_ENV !== "production";
  const preferenceStartsAt = new Date();
  const preferenceExpiresAt = new Date(preferenceStartsAt.getTime() + PREFERENCE_VALIDITY_MS);
  const preference = {
    items: [
      {
        id: sku,
        title: product.title,
        description: `${product.description}. ${deliveryLabel}.`,
        quantity: 1,
        currency_id: product.currency,
        unit_price: product.unitPrice,
      },
    ],
    back_urls: {
      success: `${SITE_URL}/ES/pago-exitoso.html`,
      pending: `${SITE_URL}/ES/pago-pendiente.html`,
      failure: `${SITE_URL}/ES/pago-rechazado.html`,
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
    console.error("No se pudo conectar con Mercado Pago.", error);
    return jsonResponse(502, {
      error: "No se pudo conectar con Mercado Pago.",
    });
  }
};
