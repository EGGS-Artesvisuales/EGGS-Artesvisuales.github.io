const { randomUUID } = require("crypto");

const MERCADOPAGO_API_URL = "https://api.mercadopago.com/checkout/preferences";
const SITE_URL = "https://eggs-studio.cl";
const MERCADOPAGO_ENV = (process.env.MERCADOPAGO_ENV || "test").toLowerCase();

// El precio se define en el servidor para impedir que el navegador lo modifique.
// En esta primera etapa solo habilitamos un producto piloto y no mostramos botones.
const PRODUCTS = Object.freeze({
  "EGGS-S0008-PUB01": {
    title: "Intervenciones publicitarias 2007–2011",
    description: "Publicación de artista numerada y firmada",
    unitPrice: 120000,
  },
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

  const orderId = randomUUID();
  // Los prefijos de credenciales de prueba varían según la integración.
  // Producción debe habilitarse de forma explícita mediante MERCADOPAGO_ENV.
  const testMode = MERCADOPAGO_ENV !== "production";
  const preference = {
    items: [
      {
        id: sku,
        title: product.title,
        description: product.description,
        quantity: 1,
        currency_id: "CLP",
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
    external_reference: `${sku}:${orderId}`,
    statement_descriptor: "EGGS STUDIO",
    metadata: {
      sku,
      order_id: orderId,
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
    });
  } catch (error) {
    console.error("No se pudo conectar con Mercado Pago.", error);
    return jsonResponse(502, {
      error: "No se pudo conectar con Mercado Pago.",
    });
  }
};
