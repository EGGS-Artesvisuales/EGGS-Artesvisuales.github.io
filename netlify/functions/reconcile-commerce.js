const { COMMERCE_CONFIG } = require("../lib/commerce-config");
const {
  connectInventory,
  releaseReservation,
} = require("../lib/inventory");
const {
  ORDER_STATUSES,
  connectOrders,
  updateOrderStatus,
} = require("../lib/orders");
const {
  clearActiveReservation,
  connectCheckoutSecurity,
  logCommerceEvent,
} = require("../lib/checkout-security");

exports.config = {
  schedule: "*/30 * * * *",
};

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

async function getOrdersStore(event) {
  const { connectLambda, getStore } = await import("@netlify/blobs");
  connectLambda(event);
  return getStore(COMMERCE_CONFIG.ordersStoreName);
}

async function listOrderKeys(store) {
  if (typeof store.list !== "function") return [];
  const result = await store.list({ prefix: "orders/" });
  return (result.blobs || []).map((blob) => blob.key).filter(Boolean);
}

exports.handler = async (event) => {
  const now = Date.now();
  const summary = {
    scanned: 0,
    expired: 0,
    skipped: 0,
    errors: 0,
  };

  try {
    await connectInventory(event);
    await connectOrders(event);
    await connectCheckoutSecurity(event);
    const store = await getOrdersStore(event);
    const keys = await listOrderKeys(store);

    for (const key of keys) {
      summary.scanned += 1;
      try {
        const order = await store.get(key, { type: "json" });
        if (!order || order.status !== ORDER_STATUSES.pending) {
          summary.skipped += 1;
          continue;
        }
        const expiresAt = Date.parse(order.expires_at || "");
        if (!Number.isFinite(expiresAt) || expiresAt > now) {
          summary.skipped += 1;
          continue;
        }

        await releaseReservation(order.sku, order.id).catch((error) => {
          logCommerceEvent("warn", "reconcile_release_failed", {
            orderId: order.id,
            sku: order.sku,
            message: error.message,
          });
        });
        await updateOrderStatus(order.id, ORDER_STATUSES.expired, {
          expired_at: new Date(now).toISOString(),
          reconciliation_reason: "reservation_timeout",
        });
        await clearActiveReservation(order.buyer_fingerprint).catch(() => {});
        summary.expired += 1;
      } catch (error) {
        summary.errors += 1;
        logCommerceEvent("error", "reconcile_order_failed", { key, message: error.message });
      }
    }

    logCommerceEvent("info", "reconcile_completed", summary);
    return jsonResponse(200, summary);
  } catch (error) {
    logCommerceEvent("error", "reconcile_failed", { message: error.message });
    return jsonResponse(500, { error: "No se pudo conciliar comercio." });
  }
};
