const { createHmac, timingSafeEqual } = require("crypto");

const MERCADOPAGO_PAYMENTS_URL = "https://api.mercadopago.com/v1/payments";

const PRODUCTS = Object.freeze({
  "EGGS-S0008-PUB01": {
    currency: "CLP",
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

function getHeader(headers, name) {
  const target = name.toLowerCase();
  const entry = Object.entries(headers || {}).find(([key]) => key.toLowerCase() === target);
  return entry ? entry[1] : "";
}

function parseSignature(value) {
  return String(value || "")
    .split(",")
    .reduce((parts, item) => {
      const [key, partValue] = item.split("=").map((part) => part.trim());
      if (key && partValue) parts[key] = partValue;
      return parts;
    }, {});
}

function isValidSignature({ dataId, requestId, signature, secret }) {
  const { ts, v1 } = parseSignature(signature);
  if (!dataId || !requestId || !ts || !v1 || !secret) return false;

  const manifest = `id:${String(dataId).toLowerCase()};request-id:${requestId};ts:${ts};`;
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");

  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(v1, "hex");
  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return jsonResponse(200, { status: "ready" });
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Método no permitido." });
  }

  const webhookSecret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!webhookSecret || !accessToken) {
    console.error("Faltan secretos de Mercado Pago para validar el webhook.");
    return jsonResponse(503, { error: "Webhook pendiente de configuración." });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "La notificación no contiene JSON válido." });
  }

  const dataId = event.queryStringParameters?.["data.id"];
  const requestId = getHeader(event.headers, "x-request-id");
  const signature = getHeader(event.headers, "x-signature");

  if (!isValidSignature({ dataId, requestId, signature, secret: webhookSecret })) {
    console.warn("Se rechazó una notificación con firma inválida.");
    return jsonResponse(401, { error: "Firma inválida." });
  }

  if (body.type !== "payment") {
    return jsonResponse(200, { received: true, ignored: true });
  }

  try {
    const response = await fetch(`${MERCADOPAGO_PAYMENTS_URL}/${encodeURIComponent(dataId)}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const payment = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("No se pudo consultar el pago notificado.", { status: response.status });
      return jsonResponse(502, { error: "No se pudo verificar el pago." });
    }

    const externalReference = String(payment.external_reference || "");
    const sku = String(payment.metadata?.sku || externalReference.split(":")[0] || "");
    const product = PRODUCTS[sku];
    const amountMatches = product && Number(payment.transaction_amount) === product.unitPrice;
    const currencyMatches = product && payment.currency_id === product.currency;

    if (!product || !amountMatches || !currencyMatches) {
      console.error("Pago válido de Mercado Pago con datos de producto inesperados.", {
        paymentId: String(payment.id || dataId),
        sku,
      });
      return jsonResponse(200, { received: true, verified: false });
    }

    console.log("Pago de Mercado Pago verificado.", {
      paymentId: String(payment.id || dataId),
      sku,
      status: payment.status,
      liveMode: Boolean(payment.live_mode),
    });

    return jsonResponse(200, {
      received: true,
      verified: true,
      status: payment.status,
    });
  } catch (error) {
    console.error("Error al verificar la notificación de Mercado Pago.", error);
    return jsonResponse(502, { error: "No se pudo verificar la notificación." });
  }
};
