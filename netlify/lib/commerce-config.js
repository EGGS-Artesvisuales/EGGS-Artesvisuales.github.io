const MINUTE_MS = 60 * 1000;

const COMMERCE_CONFIG = Object.freeze({
  storeName: "eggs-commerce",
  ordersStoreName: "eggs-commerce-orders",
  securityStoreName: "eggs-commerce-security",
  reservationTtlMs: 20 * MINUTE_MS,
  paymentPreferenceTtlMs: 15 * MINUTE_MS,
  notificationLockMs: 5 * MINUTE_MS,
  maxWriteAttempts: 8,
  rateLimit: Object.freeze({
    windowMs: 10 * MINUTE_MS,
    maxRequestsPerIp: 12