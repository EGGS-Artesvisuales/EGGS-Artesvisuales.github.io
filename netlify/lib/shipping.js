const SHIPPING_DESTINATIONS = Object.freeze({
  santiago: Object.freeze({
    group: "chile",
    labels: Object.freeze({
      es: "Santiago — entrega sin costo",
      en: "Santiago — free delivery",
      mpd: "Santiago mew müley müten eluwün",
      chn: "圣地亚哥市内免费交付",
    }),
  }),
  rm_outer: Object.freeze({
    group: "chile",
    labels: Object.freeze({
      es: "Región Metropolitana fuera de Santiago",
      en: "Metropolitan Region outside Santiago",
      mpd: "Santiago wechun Región Metropolitana",
      chn: "圣地亚哥以外的首都大区",
    }),
  }),
  chile_central: Object.freeze({
    group: "chile",
    labels: Object.freeze({
      es: "Chile centro",
      en: "Central Chile",
      mpd: "Chile ragiñ mapu",
      chn: "智利中部",
    }),
  }),
  chile_north: Object.freeze({
    group: "chile",
    labels: Object.freeze({
      es: "Chile norte",
      en: "Northern Chile",
      mpd: "Chile pikun mapu",
      chn: "智利北部",
    }),
  }),
  chile_south: Object.freeze({
    group: "chile",
    labels: Object.freeze({
      es: "Chile sur",
      en: "Southern Chile",
      mpd: "Chile willi mapu",
      chn: "智利南部",
    }),
  }),
  chile_extreme: Object.freeze({
    group: "chile",
    labels: Object.freeze({
      es: "Chile extremo o insular",
      en: "Remote or island Chile",
      mpd: "Chile afpun kam wapi mapu",
      chn: "智利偏远或岛屿地区",
    }),
  }),
  international_americas: Object.freeze({
    group: "international",
    labels: Object.freeze({
      es: "Internacional — América",
      en: "International — Americas",
      mpd: "Ka mapu — América",
      chn: "国际 — 美洲",
    }),
  }),
  international_europe: Object.freeze({
    group: "international",
    labels: Object.freeze({
      es: "Internacional — Europa",
      en: "International — Europe",
      mpd: "Ka mapu — Europa",
      chn: "国际 — 欧洲",
    }),
  }),
  international_rest: Object.freeze({
    group: "international",
    labels: Object.freeze({
      es: "Internacional — Asia, Oceanía y resto del mundo",
      en: "International — Asia, Oceania and rest of world",
      mpd: "Ka mapu — Asia, Oceanía ka kom mapu",
      chn: "国际 — 亚洲、大洋洲及世界其他地区",
    }),
  }),
});

const SHIPPING_TARIFFS_CLP = Object.freeze({
  santiago: Object.freeze({ small: 0, standard: 0, large: 0, oversized: 0 }),
  rm_outer: Object.freeze({ small: 6000, standard: 10000, large: 16000, oversized: 30000 }),
  chile_central: Object.freeze({ small: 9000, standard: 16000, large: 26000, oversized: 48000 }),
  chile_north: Object.freeze({ small: 12000, standard: 24000, large: 38000, oversized: 70000 }),
  chile_south: Object.freeze({ small: 12000, standard: 26000, large: 42000, oversized: 76000 }),
  chile_extreme: Object.freeze({ small: 18000, standard: 42000, large: 68000, oversized: 120000 }),
  international_americas: Object.freeze({ small: 90000, standard: 140000, large: 230000, oversized: 390000 }),
  international_europe: Object.freeze({ small: 125000, standard: 190000, large: 310000, oversized: 500000 }),
  international_rest: Object.freeze({ small: 145000, standard: 220000, large: 360000, oversized: 580000 }),
});

const INTERNATIONAL_PROTECTION_RATE = 0.015;
const INTERNATIONAL_PROTECTION_MIN_CLP = 15000;
const VALID_SHIPPING_PROFILES = new Set(["small", "standard", "large", "oversized"]);

function inferShippingProfile(product) {
  const generatedProfile = String(product?.shippingProfile || "").trim().toLowerCase();
  if (VALID_SHIPPING_PROFILES.has(generatedProfile)) return generatedProfile;

  const sku = String(product?.sku || "").toUpperCase();
  const title = String(product?.title || "").toLowerCase();

  if (sku.includes("PUB")) return "small";
  if (sku.includes("F120170") || title.includes("el colgado")) return "oversized";
  if (
    sku.includes("F80130") ||
    sku.includes("F8080") ||
    sku.includes("F70120") ||
    sku.includes("F70100")
  ) {
    return "large";
  }
  return "standard";
}

function getDestinationLabel(destinationKey, locale = "es") {
  const destination = SHIPPING_DESTINATIONS[destinationKey];
  if (!destination) return "";
  return destination.labels[locale] || destination.labels.es;
}

function calculateProtectionCost(product, destinationGroup) {
  if (destinationGroup !== "international") return 0;
  const declaredValue = Number(product?.unitPrice || 0);
  if (!Number.isFinite(declaredValue) || declaredValue <= 0) return null;
  return Math.max(
    INTERNATIONAL_PROTECTION_MIN_CLP,
    Math.round(declaredValue * INTERNATIONAL_PROTECTION_RATE),
  );
}

function calculateShipping({ product, destinationKey, locale = "es" }) {
  const destination = SHIPPING_DESTINATIONS[destinationKey];
  const tariff = SHIPPING_TARIFFS_CLP[destinationKey];
  if (!destination || !tariff) return null;

  const profile = inferShippingProfile(product);
  const baseCost = Number(tariff[profile]);
  const protectionCost = calculateProtectionCost(product, destination.group);
  if (!Number.isInteger(baseCost) || baseCost < 0 || !Number.isInteger(protectionCost) || protectionCost < 0) {
    return null;
  }

  return Object.freeze({
    destinationKey,
    destinationGroup: destination.group,
    label: getDestinationLabel(destinationKey, locale),
    profile,
    baseCost,
    protectionCost,
    protectionRate: destination.group === "international" ? INTERNATIONAL_PROTECTION_RATE : 0,
    cost: baseCost + protectionCost,
    currency: "CLP",
  });
}

module.exports = {
  SHIPPING_DESTINATIONS,
  SHIPPING_TARIFFS_CLP,
  INTERNATIONAL_PROTECTION_RATE,
  INTERNATIONAL_PROTECTION_MIN_CLP,
  calculateProtectionCost,
  calculateShipping,
  getDestinationLabel,
  inferShippingProfile,
};
