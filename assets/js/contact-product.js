(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const sku = String(params.get("producto") || params.get("product") || "").trim();
  const title = String(params.get("obra") || "").trim();
  const validSku = /^[A-Za-z0-9-]{3,80}$/.test(sku);

  if (!validSku) return;

  const message = document.querySelector("#message");
  if (!message || message.value.trim()) return;

  const form = message.closest("form");
  const locale = form?.dataset.contactLang || "es";
  const translations = {
    es: {
      intro: (label) => `Hola, quisiera consultar por ${label}.`,
      label: (name) => (name ? `la obra “${name}”` : "este producto"),
      sku: (value) => `SKU: ${value}`,
      details: "Quisiera confirmar su disponibilidad, las condiciones de entrega o despacho y la forma de pago.",
      additional: "Consulta adicional:",
    },
    en: {
      intro: (label) => `Hello, I would like to enquire about ${label}.`,
      label: (name) => (name ? `the work “${name}”` : "this product"),
      sku: (value) => `SKU: ${value}`,
      details: "I would like to confirm its availability, delivery or shipping conditions, and payment options.",
      additional: "Additional question:",
    },
    mpd: {
      intro: (label) => `Mari mari, ${label} mew ramtuafun.`,
      label: (name) => (name ? `“${name}” az-küdaw` : "fachi producto"),
      sku: (value) => `SKU: ${value}`,
      details: "Disponibilidad, eluwün kam werkün ñi az ka chumgechi kulliñ kimafun.",
      additional: "Kake ramtu:",
    },
    chn: {
      intro: (label) => `您好，我想咨询${label}。`,
      label: (name) => (name ? `作品“${name}”` : "此商品"),
      sku: (value) => `SKU：${value}`,
      details: "我想确认库存、交付或运输条件以及付款方式。",
      additional: "其他问题：",
    },
  };
  const copy = translations[locale] || translations.es;
  const safeTitle = title.replace(/[\r\n\t]+/g, " ").slice(0, 160);
  const productLabel = copy.label(safeTitle);
  message.value = [
    copy.intro(productLabel),
    copy.sku(sku),
    "",
    copy.details,
    "",
    copy.additional,
    "",
  ].join("\n");
})();
