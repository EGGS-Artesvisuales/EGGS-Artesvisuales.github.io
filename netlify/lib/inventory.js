const { PRODUCTS } = require("./products");
const { COMMERCE_CONFIG } = require("./commerce-config");

const STORE_NAME = COMMERCE_CONFIG.storeName;
const MAX_WRITE_ATTEMPTS = COMMERCE_CONFIG.maxWriteAttempts;
const DEFAULT_RESERVATION_TTL_MS = COMMERCE_CONFIG.reservationTtlMs;

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

function nowMilliseconds(value) {
  if (value instanceof Date) return value.getTime();
  if (Number.isFinite(value)) return Number(value);
  return Date.now();
}

function activeReservations(state, now = Date.now()) {
  const currentTime = nowMilliseconds(now);
  if (!Array.isArray(state?.reservations)) return [];
  return state.reservations.filter((reservation) => {
    const expiration = Date.parse(reservation?.expires_at || "");
    return Boolean(reservation?.id) && Number.isFinite(expiration) && expiration > currentTime;
  });
}

function normalizedState(sku, state) {
  const product = PRODUCTS[sku];
  if (!state) {
    return {
      sku,
      initial_stock: product.initialStock,
      stock: product.initialStock,
      processed_payment_ids: [],
      reservations: [],
    };
  }
  if (!Number.isInteger(state.stock) || !Array.isArray(state.processed_payment_ids)) {
    throw new Error("Invalid inventory state");
  }
  return {
    ...state,
    reservations: Array.isArray(state.reservations) ? state.reservations : [],
  };
}

function publicInventory(sku, state, now = Date.now()) {
  const current = normalizedState(sku, state);
  const reserved = activeReservations(current, now).length;
  const stock = Math.max(current.stock - reserved, 0);
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

  return publicInventory(sku, entry?.data, options.now);
}

async function reserveInventory(sku, reservationId, options = {}) {
  const product = PRODUCTS[sku];
  if (!product) throw new Error("Unknown inventory SKU");

  const normalizedReservationId = String(reservationId || "").trim();
  if (!normalizedReservationId) throw new Error("Missing reservation ID");

  const store = options.store || (await getInventoryStore());
  const key = inventoryKey(sku);
  const now = nowMilliseconds(options.now);
  const ttlMs = Number.isFinite(options.ttlMs)
    ? Number(options.ttlMs)
    : DEFAULT_RESERVATION_TTL_MS;
  const expiresAt = new Date(now + ttlMs).toISOString();
  const buyerFingerprint = String(options.buyerFingerprint || "").trim();

  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const entry = await store.getWithMetadata(key, { type: "json" });
    const current = normalizedState(sku, entry?.data);
    const reservations = activeReservations(current, now);
    const existing = reservations.find(({ id }) => id === normalizedReservationId);

    if (existing) {
      return {
        ...publicInventory(sku, current, now),
        reserved: true,
        reservation_expires_at: existing.expires_at,
      };
    }

    if (current.stock - reservations.length <= 0) {
      return { ...publicInventory(sku, current, now), reserved: false };
    }

    const nextReservation = {
      id: normalizedReservationId,
      expires_at: expiresAt,
    };
    if (buyerFingerprint) nextReservation.buyer_fingerprint = buyerFingerprint;

    const next = {
      ...current,
      reservations: [...reservations, nextReservation],
      updated_at: new Date(now).toISOString(),
    };
    const writeOptions = entry ? { onlyIfMatch: entry.etag } : { onlyIfNew: true };
    const result = await store.setJSON(key, next, writeOptions);
    if (result.modified) {
      return {
        ...publicInventory(sku, next, now),
        reserved: true,
        reservation_expires_at: expiresAt,
      };
    }
  }

  throw new Error("Inventory reservation conflict");
}

async function releaseReservation(sku, reservationId, options = {}) {
  const product = PRODUCTS[sku];
  if (!product) throw new Error("Unknown inventory SKU");

  const normalizedReservationId = String(reservationId || "").trim();
  if (!normalizedReservationId) throw new Error("Missing reservation ID");

  const store = options.store || (await getInventoryStore());
  const key = inventoryKey(sku);
  const now = nowMilliseconds(options.now);

  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const entry = await store.getWithMetadata(key, { type: "json" });
    if (!entry) return { ...publicInventory(sku, null, now), released: false };

    const current = normalizedState(sku, entry.data);
    const reservations = activeReservations(current, now);
    if (!reservations.some(({ id }) => id === normalizedReservationId)) {
      return { ...publicInventory(sku, current, now), released: false };
    }

    const next = {
      ...current,
      reservations: reservations.filter(({ id }) => id !== normalizedReservationId),
      updated_at: new Date(now).toISOString(),
    };
    const result = await store.setJSON(key, next, { onlyIfMatch: entry.etag });
    if (result.modified) {
      return { ...publicInventory(sku, next, now), released: true };
    }
  }

  throw new Error("Inventory release conflict");
}

async function recordApprovedPayment(sku, paymentId, options = {}) {
  const product = PRODUCTS[sku];
  if (!product) throw new Error("Unknown inventory SKU");

  const normalizedPaymentId = String(paymentId || "").trim();
  if (!normalizedPaymentId) throw new Error("Missing payment ID");
  const reservationId = String(options.reservationId || "").trim();

  const store = options.store || (await getInventoryStore());
  const key = inventoryKey(sku);
  const now = nowMilliseconds(options.now);

  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const entry = await store.getWithMetadata(key, {
      type: "json",
    });
    const current = normalizedState(sku, entry?.data);

    if (!entry) {
      const state = {
        ...current,
        stock: Math.max(product.initialStock - 1, 0),
        processed_payment_ids: [normalizedPaymentId],
        updated_at: new Date(now).toISOString(),
      };
      const result = await store.setJSON(key, state, { onlyIfNew: true });
      if (result.modified) {
        return { ...publicInventory(sku, state, now), decremented: true, duplicate: false };
      }
      continue;
    }

    if (current.processed_payment_ids.includes(normalizedPaymentId)) {
      return { ...publicInventory(sku, current, now), decremented: false, duplicate: true };
    }

    if (current.stock <= 0) {
      return { ...publicInventory(sku, current, now), decremented: false, duplicate: false };
    }

    const reservations = activeReservations(current, now).filter(
      ({ id }) => !reservationId || id !== reservationId,
    );
    const next = {
      ...current,
      stock: current.stock - 1,
      processed_payment_ids: [...current.processed_payment_ids, normalizedPaymentId],
      reservations,
      updated_at: new Date(now).toISOString(),
    };
    const result = await store.setJSON(key, next, { onlyIfMatch: entry.etag });
    if (result.modified) {
      return { ...publicInventory(sku, next, now), decremented: true, duplicate: false };
    }
  }

  throw new Error("Inventory update conflict");
}

module.exports = {
  activeReservations,
  connectInventory,
  getInventory,
  releaseReservation,
  reserveInventory,
  recordApprovedPayment,
};
