const STORE_NAME = "eggs-commerce-orders";
const MAX_WRITE_ATTEMPTS = 8;
const NOTIFICATION_LOCK_MS = 5 * 60 * 1000;

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

async function savePendingOrder(orderId, order, options = {}) {
  const store = options.store || (await getOrdersStore());
  const now = options.now instanceof Date ? options.now : new Date(options.now || Date.now());
  const record = {
    id: orderId,
    ...order,
    status: "payment_pending",
    created_at: now.toISOString(),
    notification: { status: "ready" },
  };
  const result = await store.setJSON(orderKey(orderId), record, { onlyIfNew: true });
  if (!result.modified) throw new Error("Order already exists");
  return record;
}

async function deleteOrder(orderId, options = {}) {
  const store = options.store || (await getOrdersStore());
  await store.delete(orderKey(orderId));
}

async function claimSaleNotification(orderId, paymentId, options = {}) {
  const store = options.store || (await getOrdersStore());
  const key = orderKey(orderId);
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
  const store = options.store || (await getOrdersStore());
  const key = orderKey(orderId);
  const now = options.now instanceof Date ? options.now : new Date(options.now || Date.now());

  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const entry = await store.getWithMetadata(key, { type: "json" });
    if (!entry?.data) return false;
    if (entry.data.notification?.status === "sent") return true;

    const next = {
      id: entry.data.id,
      sku: entry.data.sku,
      delivery_option: entry.data.delivery_option,
      locale: entry.data.locale,
      created_at: entry.data.created_at,
      status: "approved_notified",
      payment_id: String(paymentId),
      notification: { status: "sent", sent_at: now.toISOString() },
    };
    const result = await store.setJSON(key, next, { onlyIfMatch: entry.etag });
    if (result.modified) return true;
  }

  throw new Error("Order notification completion conflict");
}

async function releaseSaleNotification(orderId, paymentId, options = {}) {
  const store = options.store || (await getOrdersStore());
  const key = orderKey(orderId);

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
  claimSaleNotification,
  completeSaleNotification,
  connectOrders,
  deleteOrder,
  releaseSaleNotification,
  savePendingOrder,
};
