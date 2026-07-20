(function () {
  "use strict";

  const checkoutHosts = new Set([
    "www.mercadopago.cl",
    "sandbox.mercadopago.cl",
  ]);

  document.querySelectorAll("[data-mercadopago-checkout]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const button = form.querySelector("button[type='submit']");
      const status = form.querySelector("[data-checkout-status]");
      const deliveryOption = form.elements.delivery_option.value;
      const sku = form.dataset.sku;

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
          throw new Error(result.error || "No se pudo iniciar el pago.");
        }

        const checkoutUrl = new URL(result.checkout_url);
        if (checkoutUrl.protocol !== "https:" || !checkoutHosts.has(checkoutUrl.hostname)) {
          throw new Error("Mercado Pago devolvió una dirección no válida.");
        }

        window.location.assign(checkoutUrl.href);
      } catch (error) {
        status.textContent = error.message || "No se pudo iniciar el pago. Intenta nuevamente.";
        button.disabled = false;
        button.removeAttribute("aria-busy");
      }
    });
  });
})();
