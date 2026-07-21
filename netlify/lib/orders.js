const { COMMERCE_CONFIG } = require("./commerce-config");

const STORE_NAME = COMMERCE_CONFIG.ordersStoreName;
const MAX_WRITE_ATTEMPTS = COMMERCE_CONFIG.maxWriteAttempts;
const NOTIFICATION_LOCK_MS = COMMERCE_CONFIG.notificationLockMs;
const ORDER_STATUSES = COMMERCE_CONFIG.orderStatuses;

let ordersStorePromise;

async function connectOrders(event) {
  const { connectLambda, getStore } = await import("@netlify/blobs");
  connectLambda(event);
  ordersStorePromise = Promise.resolve(getStore(STORE_NAME));
}

async function getOrdersStore() {
  if (!ordersStorePromise) {
    ordersStorePromise = import("@netlify/blobs").then(({ getStore }) => getStore(STORE_NAME));
  }
  return ordersStorePromise;
}

function orderKey(orderId) {
  return `orders/${orderId}`;
}

function normalizeOrderId(orderId) {
  const value = String(orderId || "").trim();
  if (!/^[0-9a-f-]{36}$/i.test(value)) throw new Error("Invalid order ID");
  return value;
}

async function savePendingOrder(orderId, order, options = {}) {
  const normalizedOrderId = normalizeOrderId(orderId);
  const store = options.store || (await getOrdersStore());
  const now = options.now instanceof Date ? options.now : new Date(options.now || Date.now());
  const expiresAt = options.expiresAt || new Date(now.getTime() + COMMERCE_CONFIG.reservationTtlMs).toISOString();
  const record = {
    id: normalizedOrderId,
    ...order,
    status: ORDER_STATUSES.pending,
    created_at: now.toISOString(),
    expires_at: expiresAt,
    notification: { status: "ready" },
  };
  const result = await store.setJSON(orderKey(normalizedOrderId), record, { onlyIfNew: true });
  if (!result.modified) throw new Error("Order already exists");
  return record;
}

async function getOrder(orderId, options = {}) {
  const normalizedOrderId = normalizeOrderId(orderId);
  const store = options.store || (await getOrdersStore());
  const entry = await store.getWithMetadata(orderKey(normalizedOrderId), { type: "json" });
  return entry?.data || null;
}

function validateOrderForPayment(order, payment, product) {
  if (!order || !payment || !product) return false;
  const metadata = payment.metadata || {};
  const expectedAmount = Number(order.total_amount ?? product.unitPrice);
  const paidAmount = Number(payment.transaction_amount);
  const amountMatches = Number.isFinite(expectedAmount) && Number.isFinite(paidAmount) && paidAmount === expectedAmount;
  const currencyMatches = payment.currency_id === product.currency;
  const skuMatches = String(order.sku) === String(metadata.sku || order.sku);
  const orderMatches = String(order.id) === String(metadata.order_id || order.id);
  const deliveryMatches = Boolean(product.deliveryOptions[order.delivery_option]);
  const shippingMatches = Number(metadata.shipping_cost ?? order.shipping?.cost ?? 0) === Number(order.shipping?.cost ?? 0);
  return amountMatches && currencyMatches && skuMatches && orderMatches && deliveryMatches && shippingMatches;
}

async function updateOrderStatus(orderId, status, patch = {}, options = {}) {
  if (!Object.values(ORDER_STATUSES).includes(status)) throw new Error("Invalid order status");
  const normalizedOrderId = normalizeOrderId(orderId);
  const store = options.store || (await getOrdersStore());
  const key = orderKey(normalizedOrderId);
  const now = options.now instanceof Date ? options.now : new Date(options.now || Date.now());

  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const entry = await store.getWithMetadata(key, { type: "json" });
    if (!entry?.data) return null;
    const next = {
      ...entry.data,
      ...patch,
      status,
      updated_at: now.toISOString(),
    };
    const result = await store.setJSON(key, next, { onlyIfMatch: entry.etag });
    if (result.modified) return next;
  }

  throw new Error("Order status update conflict");
}

async function deleteOrder(orderId, options = {}) {
  const normalizedOrderId = normalizeOrderId(orderId);
  const store = options.store || (await getOrdersStore());
  await store.delete(orderKey(normalizedOrderId));
}

async function claimSaleNotification(orderId, paymentId, options = {}) {
  const normalizedOrderId = normalizeOrderId(orderId);
  const store = options.store || (await getOrdersStore());
  const key = orderKey(normalizedOrderId);
  const now = options.now instanceof Date ? options.now : new Date(options.now || Date.now());

  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const entry = await store.getWithMetadata(key, { type: "json" });
    if (!entry?.data) return { claimed: false, reason: "missing" };

    const current = entry.data;
    const notification = current.notification || { status: "ready" };
    if (notification.status === "sent") return { claimed: false, reason: "sent" };

    const lockTime = Date.parse(notification.claimed_at || "");
    if (
      notification.status === "sending" &&
      Number.isFinite(lockTime) &&
      now.getTime() - lockTime < NOTIFICATION_LOCK_MS
    ) {
      return { claimed: false, reason: "sending" };
    }

    const next = {
      ...current,
      notification: {
        status: "sending",
        payment_id: String(paymentId),
        claimed_at: now.toISOString(),
      },
    };
    const result = await store.setJSON(key, next, { onlyIfMatch: entry.etag });
    if (result.modified) return { claimed: true, order: next };
  }

  throw new Error("Order notification conflict");
}

async function completeSaleNotification(orderId, paymentId, options = {}) {
  const normalizedOrderId = normalizeOrderId(orderId);
  const store = options.store || (await getOrdersStore());
  const key = orderKey(normalizedOrderId);
  const now = options.now instanceof Date ? options.now : new Date(options.now || Date.now());

  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const entry = await store.getWithMetadata(key, { type: "json" });
    if (!entry?.data) return false;
    if (entry.data.notification?.status === "sent") return true;

    const next = {
      ...entry.data,
      status: ORDER_STATUSES.approved,
      payment_id: String(paymentId),
      approved_at: now.toISOString(),
      notification: { status: "sent", sent_at: now.toISOString() },
    };
    const result = await store.setJSON(key, next, { onlyIfMatch: entry.etag });
    if (result.modified) return true;
  }

  throw new Error("Order notification completion conflict");
}

async function releaseSaleNotification(orderId, paymentId, options = {}) {
  const normalizedOrderId = normalizeOrderId(orderId);
  const store = options.store || (await getOrdersStore());
  const key = orderKey(normalizedOrderId);

  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const entry = await store.getWithMetadata(key, { type: "json" });
    if (!entry?.data) return false;
    if (
      entry.data.notification?.status !== "sending" ||
      String(entry.data.notification?.payment_id || "") !== String(paymentId)
    ) {
      return false;
    }

    const next = { ...entry.data, notification: { status: "ready" } };
    const result = await store.setJSON(key, next, { onlyIfMatch: entry.etag });
    if (result.modified) return true;
  }

  throw new Error("Order notification release conflict");
}

module.exports = {
  ORDER_STATUSES,
  claimSaleNotification,
  completeSaleNotification,
  connectOrders,
  deleteOrder,
  getOrder,
  releaseSaleNotification,
  savePendingOrder,
  updateOrderStatus,
  validateOrderForPayment,
};
