(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const sku = String(params.get("producto") || "").trim();
  const title = String(params.get("obra") || "").trim();
  const validSku = /^[A-Za-z0-9-]{3,80}$/.test(sku);

  if (!validSku) return;

  const message = document.querySelector("#message");
  if (!message || message.value.trim()) return;

  const safeTitle = title.replace(/[\r\n\t]+/g, " ").slice(0, 160);
  const productLabel = safeTitle ? `la obra “${safeTitle}”` : "este producto";
  message.value = [
    `Hola, quisiera consultar por ${productLabel}.`,
    `SKU: ${sku}`,
    "",
    "Quisiera confirmar su disponibilidad, las condiciones de entrega o despacho y la forma de pago.",
    "",
    "Consulta adicional:",
    "",
  ].join("\n");
})();
