const { createHash, randomUUID } = require("crypto");
const { COMMERCE_CONFIG } = require("./commerce-config");

const STORE_NAME = COMMERCE_CONFIG.securityStoreName;
const MAX_WRITE_ATTEMPTS = COMMERCE_CONFIG.maxWriteAttempts;

let securityStorePromise;

async function connectCheckoutSecurity(event) {
  const { connectLambda, getStore } = await import("@netlify/blobs");
  connectLambda(event);
  securityStorePromise = Promise.resolve(getStore(STORE_NAME));
}

async function getSecurityStore() {
  if (!securityStorePromise) {
    securityStorePromise = import("@netlify/blobs").then(({ getStore }) => getStore(STORE_NAME));
  }
  return securityStorePromise;
}

function getHeader(headers, name) {
  const target = name.toLowerCase();
  const entry = Object.entries(headers || {}).find(([key]) => key.toLowerCase() === target);
  return entry ? String(entry[1] || "") : "";
}

function getClientIp(event) {
  return (
    getHeader(event.headers, "x-nf-client-connection-ip") ||
    getHeader(event.headers, "client-ip") ||
    getHeader(event.headers, "x-forwarded-for").split(",")[0] ||
    "unknown"
  ).trim();
}

function normalizedBuyerId(buyer) {
  return [buyer?.email, buyer?.phone, buyer?.location]
    .map((value) => String(value || "").trim().toLowerCase())
    .filter(Boolean)
    .join("|");
}

function hashValue(value) {
  const secret = process.env.COMMERCE_FINGERPRINT_SECRET || "eggs-commerce-public-salt";
  return createHash("sha256").update(`${secret}:${value}`).digest("hex");
}

function buyerFingerprint(event, buyer) {
  const userAgent = getHeader(event.headers, "user-agent");
  const ip = getClientIp(event);
  return hashValue([ip, userAgent, normalizedBuyerId(buyer)].join("|"));
}

function rateKey(scope, id, windowId) {
  return `rate/${scope}/${id}/${windowId}`;
}

function activeReservationKey(fingerprint) {
  return `active-reservations/${fingerprint}`;
}

function nowMilliseconds(value) {
  if (value instanceof Date) return value.getTime();
  if (Number.isFinite(value)) return Number(value);
  return Date.now();
}

async function incrementCounter(store, key, now, windowMs) {
  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const entry = await store.getWithMetadata(key, { type: "json" });
    const current = entry?.data || { count: 0 };
    const next = {
      count: Number(current.count || 0) + 1,
      updated_at: new Date(now).toISOString(),
      expires_at: new Date(now + windowMs).toISOString(),
    };
    const writeOptions = entry ? { onlyIfMatch: entry.etag } : { onlyIfNew: true };
    const result = await store.setJSON(key, next, writeOptions);
    if (result.modified) return next.count;
  }
  throw new Error("Rate limit counter conflict");
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;

  const form = new URLSearchParams({
    secret,
    response: String(token),
    remoteip: ip,
  });

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  const result = await response.json().catch(() => ({}));
  return Boolean(response.ok && result.success);
}

async function checkCheckoutGate({ event, sku, buyer, captchaToken, now = Date.now() }) {
  const store = await getSecurityStore();
  const config = COMMERCE_CONFIG.rateLimit;
  const currentTime = nowMilliseconds(now);
  const windowId = Math.floor(currentTime / config.windowMs);
  const ip = getClientIp(event);
  const fingerprint = buyerFingerprint(event, buyer);
  const ipHash = hashValue(ip);
  const skuHash = hashValue(`${sku}:${ip}`);
  const activeEntry = await store.getWithMetadata(activeReservationKey(fingerprint), { type: "json" });
  const active = activeEntry?.data;

  if (active?.order_id && Date.parse(active.expires_at || "") > currentTime) {
    return {
      allowed: false,
      statusCode: 429,
      reason: "active_reservation",
      fingerprint,
      retry_after_seconds: Math.ceil((Date.parse(active.expires_at) - currentTime) / 1000),
    };
  }

  const ipCount = await incrementCounter(store, rateKey("ip", ipHash, windowId), currentTime, config.windowMs);
  const skuCount = await incrementCounter(store, rateKey("sku", skuHash, windowId), currentTime, config.windowMs);
  const captchaRequired = ipCount > config.captchaAfterAttempts || skuCount > config.captchaAfterAttempts;
  const captchaOk = captchaRequired ? await verifyTurnstile(captchaToken, ip) : true;

  if (ipCount > config.maxRequestsPerIp || skuCount > config.maxRequestsPerSku || !captchaOk) {
    return {
      allowed: false,
      statusCode: 429,
      reason: captchaRequired && !captchaOk ? "captcha_required" : "rate_limited",
      captcha_required: captchaRequired,
      fingerprint,
      retry_after_seconds: Math.ceil(config.windowMs / 1000),
    };
  }

  return {
    allowed: true,
    fingerprint,
    ip_count: ipCount,
    sku_count: skuCount,
    captcha_required: false,
  };
}

async function rememberActiveReservation({ fingerprint, orderId, sku, expiresAt }) {
  if (!fingerprint || !orderId || !expiresAt) return;
  const store = await getSecurityStore();
  await store.setJSON(activeReservationKey(fingerprint), {
    order_id: orderId,
    sku,
    expires_at: expiresAt,
    updated_at: new Date().toISOString(),
  });
}

async function clearActiveReservation(fingerprint) {
  if (!fingerprint) return;
  const store = await getSecurityStore();
  await store.delete(activeReservationKey(fingerprint));
}

function logCommerceEvent(level, event, fields = {}) {
  const logger = level === "error" ? console.error : level === "warn" ? console.warn : console.log;
  logger(JSON.stringify({
    scope: "commerce",
    event,
    at: new Date().toISOString(),
    ...fields,
  }));
}

module.exports = {
  buyerFingerprint,
  checkCheckoutGate,
  clearActiveReservation,
  connectCheckoutSecurity,
  logCommerceEvent,
  rememberActiveReservation,
};
