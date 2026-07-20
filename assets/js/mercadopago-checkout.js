(function () {
  "use strict";

  const checkoutHosts = new Set([
    "www.mercadopago.cl",
    "sandbox.mercadopago.cl",
  ]);

  document.querySelectorAll("[data-mercadopago-checkout]").forEach((form) => {
    const button = form.querySelector("button[type='submit']");
    const inventoryStatus = form.querySelector("[data-inventory-status]");
    const status = form.querySelector("[data-checkout-status]");
    const deliverySelect = form.elements.delivery_option;
    const sku = form.dataset.sku;

    fetch(`/.netlify/functions/get-inventory?sku=${encodeURIComponent(sku)}`, {
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        const inventory = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(inventory.error || "No se pudo consultar el stock.");

        if (!inventory.available) {
          form.dataset.soldOut = "true";
          inventoryStatus.textContent = "Agotado";
          deliverySelect.disabled = true;
          return;
        }

        inventoryStatus.textContent = `${inventory.stock} ejemplares disponibles`;
        button.disabled = false;
      })
      .catch(() => {
        inventoryStatus.textContent = "No pudimos verificar el stock. Intenta recargar la página.";
      });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (form.dataset.soldOut === "true") return;

      const deliveryOption = deliverySelect.value;

      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      status.textContent = "Abriendo el pago seguro…";

      try {
        const response = await fetch("/.netlify/functions/create-mercadopago-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sku, delivery_option: deliveryOption }),
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok || !result.checkout_url) {
          if (response.status === 409) {
            form.dataset.soldOut = "true";
            inventoryStatus.textContent = "Agotado";
            deliverySelect.disabled = true;
          }
          throw new Error(result.error || "No se pudo iniciar el pago.");
        }

        const checkoutUrl = new URL(result.checkout_url);
        if (checkoutUrl.protocol !== "https:" || !checkoutHosts.has(checkoutUrl.hostname)) {
          throw new Error("Mercado Pago devolvió una dirección no válida.");
        }

        window.location.assign(checkoutUrl.href);
      } catch (error) {
        status.textContent = error.message || "No se pudo iniciar el pago. Intenta nuevamente.";
        if (form.dataset.soldOut !== "true") button.disabled = false;
        button.removeAttribute("aria-busy");
      }
    });
  });
})();
