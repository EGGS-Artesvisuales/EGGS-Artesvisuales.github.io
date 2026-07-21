const { createHmac, timingSafeEqual } = require("crypto");
const { isProductionCommerce } = require("../lib/commerce-config");
const { PRODUCTS } = require("../lib/products");
const {
  connectInventory,
  recordApprovedPayment,
  releaseReservation,
} = require("../lib/inventory");
const {
  ORDER_STATUSES,
  claimSaleNotification,
  completeSaleNotification,
  connectOrders,
  getOrder,
  releaseSaleNotification,
  updateOrderStatus,
  validateOrderForPayment,
} = require("../lib/orders");
const {
  clearActiveReservation,
  logCommerceEvent,
} = require("../lib/checkout-security");

const MERCADOPAGO_PAYMENTS_URL = "https://api.mercadopago.com/v1/payments";
const SITE_URL = "https://eggs-studio.cl";

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

function parseExternalReference(payment) {
  const metadata = payment.metadata || {};
  const externalReference = String(payment.external_reference || "");
  const fromExternalReference = externalReference.match(/^([^:]+):([0-9a-f-]{36})$/i);
  const sku = String(metadata.sku || fromExternalReference?.[1] || "").trim();
  const orderId = String(metadata.order_id || fromExternalReference?.[2] || "").trim();
  if (!sku || !/^[0-9a-f-]{36}$/i.test(orderId)) return null;
  return { sku, orderId };
}

function orderStatusFromPayment(payment) {
  const status = String(payment.status || "");
  if (status === "approved") return ORDER_STATUSES.approved;
  if (["rejected", "cancelled"].includes(status)) return ORDER_STATUSES.rejected;
  if (status === "expired") return ORDER_STATUSES.expired;
  if (status === "refunded") return ORDER_STATUSES.refunded;
  return ORDER_STATUSES.pending;
}

async function submitApprovedSale(order, payment, product) {
  const localizedProduct = product.localized?.[order.locale] || product.localized?.es || product;
  const payerName = [payment.payer?.first_name, payment.payer?.last_name]
    .filter(Boolean)
    .join(" ") || "No informado por Mercado Pago";
  const shippingCost = Number(order.shipping?.cost || 0);
  const productAmount = Number(product.unitPrice || 0);
  const totalAmount = Number(order.total_amount || payment.transaction_amount || productAmount + shippingCost);
  const deliveryLabel = order.shipping?.label || order.delivery_option;
  const fields = new URLSearchParams({
    "form-name": "ventas-aprobadas",
    subject: `Venta aprobada EGGS-Studio — ${order.sku}`,
    estado: "PAGO APROBADO",
    pago_mercado_pago: String(payment.id),
    sku: order.sku,
    producto: localizedProduct.title,
    monto: `${totalAmount.toLocaleString("es-CL")} CLP`,
    precio_producto: `${productAmount.toLocaleString("es-CL")} CLP`,
    despacho: `${shippingCost.toLocaleString("es-CL")} CLP`,
    comprador: payerName,
    email: String(payment.payer?.email || ""),
    telefono: order.buyer.phone,
    modalidad_entrega: deliveryLabel,
    region_comuna: order.buyer.location,
    direccion: order.buyer.address,
    idioma: order.locale,
    fecha_pago: String(payment.date_approved || new Date().toISOString()),
  });
  const response = await fetch(`${SITE_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: fields.toString(),
  });
  if (!response.ok) throw new Error(`Netlify Forms respondió ${response.status}`);
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
  if (!accessToken) {
    logCommerceEvent("error", "webhook_missing_access_token");
    return jsonResponse(503, { error: "Webhook pendiente de configuración." });
  }
  if (isProductionCommerce() && !webhookSecret) {
    logCommerceEvent("error", "webhook_missing_signature_secret_in_production");
    return jsonResponse(503, { error: "Webhook sin firma configurada." });
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

  if (!dataId || !/^\d+$/.test(String(dataId))) {
    return jsonResponse(400, { error: "La notificación no incluye un pago válido." });
  }

  if (webhookSecret && !isValidSignature({ dataId, requestId, signature, secret: webhookSecret })) {
    logCommerceEvent("warn", "webhook_invalid_signature", { dataId: String(dataId) });
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
      logCommerceEvent("error", "webhook_payment_lookup_failed", { dataId: String(dataId), status: response.status });
      return jsonResponse(502, { error: "No se pudo verificar el pago." });
    }

    const reference = parseExternalReference(payment);
    if (!reference) {
      logCommerceEvent("error", "webhook_invalid_external_reference", { paymentId: String(payment.id || dataId) });
      return jsonResponse(200, { received: true, verified: false });
    }

    const { sku, orderId } = reference;
    const product = PRODUCTS[sku];
    await connectOrders(event);
    const order = await getOrder(orderId);

    if (!product || !order || !validateOrderForPayment(order, payment, product)) {
      logCommerceEvent("error", "webhook_order_validation_failed", {
        paymentId: String(payment.id || dataId),
        sku,
        orderId,
      });
      return jsonResponse(200, { received: true, verified: false });
    }

    logCommerceEvent("info", "webhook_payment_verified", {
      paymentId: String(payment.id || dataId),
      sku,
      orderId,
      status: payment.status,
      totalAmount: order.total_amount,
      shippingCost: order.shipping?.cost,
      liveMode: Boolean(payment.live_mode),
    });

    let inventory = null;
    const targetStatus = orderStatusFromPayment(payment);
    if (payment.status === "approved") {
      await connectInventory(event);
      inventory = await recordApprovedPayment(sku, payment.id || dataId, {
        reservationId: orderId,
      });
      if (!inventory.decremented && !inventory.duplicate && !inventory.available) {
        logCommerceEvent("error", "approved_payment_after_stock_depleted", {
          paymentId: String(payment.id || dataId),
          sku,
          orderId,
        });
      }
      const notification = await claimSaleNotification(orderId, payment.id || dataId);
      if (notification.claimed) {
        try {
          await submitApprovedSale(notification.order, payment, product);
          await completeSaleNotification(orderId, payment.id || dataId);
          await clearActiveReservation(order.buyer_fingerprint).catch(() => {});
        } catch (error) {
          await releaseSaleNotification(orderId, payment.id || dataId).catch(() => {});
          throw error;
        }
      }
    } else if (["rejected", "cancelled", "expired", "refunded"].includes(payment.status)) {
      await connectInventory(event);
      inventory = await releaseReservation(sku, orderId);
      await updateOrderStatus(orderId, targetStatus, {
        payment_id: String(payment.id || dataId),
        payment_status: payment.status,
        closed_at: new Date().toISOString(),
      });
      await clearActiveReservation(order.buyer_fingerprint).catch(() => {});
    } else {
      await updateOrderStatus(orderId, ORDER_STATUSES.pending, {
        payment_id: String(payment.id || dataId),
        payment_status: payment.status,
      });
    }

    return jsonResponse(200, {
      received: true,
      verified: true,
      status: payment.status,
      order_status: targetStatus,
      inventory_stock: inventory?.stock,
    });
  } catch (error) {
    logCommerceEvent("error", "webhook_processing_failed", { message: error.message });
    return jsonResponse(502, { error: "No se pudo verificar la notificación." });
  }
};
