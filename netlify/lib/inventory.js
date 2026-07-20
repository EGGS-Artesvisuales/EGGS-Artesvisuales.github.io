const { PRODUCTS } = require("./products");

const STORE_NAME = "eggs-commerce";
const MAX_WRITE_ATTEMPTS = 8;

let inventoryStorePromise;

async function connectInventory(event) {
  const { connectLambda, getStore } = await import("@netlify/blobs");
  connectLambda(event);
  inventoryStorePromise = Promise.resolve(getStore(STORE_NAME));
}

async function getInventoryStore() {
  if (!inventoryStorePromise) {
    inventoryStorePromise = import("@netlify/blobs").then(({ getStore }) => getStore(STORE_NAME));
  }
  return inventoryStorePromise;
}

function inventoryKey(sku) {
  return `inventory/${sku}`;
}

function publicInventory(sku, state) {
  const product = PRODUCTS[sku];
  const stock = Number.isInteger(state?.stock) ? state.stock : product.initialStock;
  return {
    sku,
    stock,
    available: stock > 0,
  };
}

async function getInventory(sku, options = {}) {
  const product = PRODUCTS[sku];
  if (!product) throw new Error("Unknown inventory SKU");

  const store = options.store || (await getInventoryStore());
  const entry = await store.getWithMetadata(inventoryKey(sku), {
    type: "json",
  });

  return publicInventory(sku, entry?.data);
}

async function recordApprovedPayment(sku, paymentId, options = {}) {
  const product = PRODUCTS[sku];
  if (!product) throw new Error("Unknown inventory SKU");

  const normalizedPaymentId = String(paymentId || "").trim();
  if (!normalizedPaymentId) throw new Error("Missing payment ID");

  const store = options.store || (await getInventoryStore());
  const key = inventoryKey(sku);

  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const entry = await store.getWithMetadata(key, {
      type: "json",
    });
    const current = entry?.data;

    if (!entry) {
      const state = {
        sku,
        initial_stock: product.initialStock,
        stock: Math.max(product.initialStock - 1, 0),
        processed_payment_ids: [normalizedPaymentId],
        updated_at: new Date().toISOString(),
      };
      const result = await store.setJSON(key, state, { onlyIfNew: true });
      if (result.modified) {
        return { ...publicInventory(sku, state), decremented: true, duplicate: false };
      }
      continue;
    }

    if (!Number.isInteger(current?.stock) || !Array.isArray(current?.processed_payment_ids)) {
      throw new Error("Invalid inventory state");
    }

    if (current.processed_payment_ids.includes(normalizedPaymentId)) {
      return { ...publicInventory(sku, current), decremented: false, duplicate: true };
    }

    if (current.stock <= 0) {
      return { ...publicInventory(sku, current), decremented: false, duplicate: false };
    }

    const next = {
      ...current,
      stock: current.stock - 1,
      processed_payment_ids: [...current.processed_payment_ids, normalizedPaymentId],
      updated_at: new Date().toISOString(),
    };
    const result = await store.setJSON(key, next, { onlyIfMatch: entry.etag });
    if (result.modified) {
      return { ...publicInventory(sku, next), decremented: true, duplicate: false };
    }
  }

  throw new Error("Inventory update conflict");
}

module.exports = {
  connectInventory,
  getInventory,
  recordApprovedPayment,
};
