(function () {
  "use strict";

  const checkoutHosts = new Set([
    "www.mercadopago.cl",
    "sandbox.mercadopago.cl",
  ]);
  const translations = {
    es: {
      soldOut: "Agotado",
      available: (count) => `${count} ejemplares disponibles`,
      inventoryError: "No pudimos verificar el stock. Intenta recargar la página.",
      opening: "Calculando despacho y abriendo el pago seguro…",
      startError: "No se pudo iniciar el pago. Intenta nuevamente.",
      rateLimited: "Hay demasiados intentos recientes. Espera unos minutos antes de volver a comprar.",
      captchaRequired: "Por seguridad necesitamos validar este intento. Recarga la página e intenta nuevamente.",
      invalidUrl: "Mercado Pago devolvió una dirección no válida.",
      buyButton: "Comprar ahora con Mercado Pago",
    },
    en: {
      soldOut: "Sold out",
      available: (count) => `${count} copies available`,
      inventoryError: "We could not verify stock. Please reload the page.",
      opening: "Calculating shipping and opening secure payment…",
      startError: "Payment could not be started. Please try again.",
      rateLimited: "There have been too many recent attempts. Please wait a few minutes before trying again.",
      captchaRequired: "For security, this attempt needs extra validation. Reload the page and try again.",
      invalidUrl: "Mercado Pago returned an invalid address.",
      buyButton: "Buy now with Mercado Pago",
    },
    mpd: {
      soldOut: "Afuy stock",
      available: (count) => `${count} ejemplar müley`,
      inventoryError: "Stock kimfal-lay. Página wiñokintunge.",
      opening: "Werkün falintun calculaley ka küme kulliñ rüpü nülagey…",
      startError: "Kullin tüwlay. Ka kiñe rupa küdawtunge.",
      rateLimited: "Fentre rupachi ngillatukan müley. Pichi mew ülkantunge ka wiñotunge.",
      captchaRequired: "Küme elkawün mew, página wiñokintunge ka wiñotunge.",
      invalidUrl: "Mercado Pago küme dirección elulay.",
      buyButton: "Mercado Pago mew fachantü ngillange",
    },
    chn: {
      soldOut: "已售罄",
      available: (count) => `可购买：${count} 件`,
      inventoryError: "无法确认库存，请重新加载页面。",
      opening: "正在计算运费并打开安全付款页面…",
      startError: "无法开始付款，请重试。",
      rateLimited: "近期尝试次数过多。请等待几分钟后再试。",
      captchaRequired: "出于安全原因，本次尝试需要额外验证。请重新加载页面后再试。",
      invalidUrl: "Mercado Pago 返回了无效地址。",
      buyButton: "使用 Mercado Pago 立即购买",
    },
  };

  document.querySelectorAll("[data-mercadopago-checkout]").forEach((form) => {
    const button = form.querySelector("button[type='submit']");
    const inventoryStatus = form.querySelector("[data-inventory-status]");
    const status = form.querySelector("[data-checkout-status]");
    const deliverySelect = form.elements.delivery_option;
    const captchaInput = form.elements.captcha_token;
    const sku = form.dataset.sku;
    const locale = form.dataset.checkoutLang || "es";
    const copy = translations[locale] || translations.es;

    button.textContent = copy.buyButton;

    fetch(`/.netlify/functions/get-inventory?sku=${encodeURIComponent(sku)}`, {
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        const inventory = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(copy.inventoryError);

        if (!inventory.available) {
          form.dataset.soldOut = "true";
          inventoryStatus.textContent = copy.soldOut;
          deliverySelect.disabled = true;
          return;
        }

        inventoryStatus.textContent = copy.available(inventory.stock);
        button.disabled = false;
      })
      .catch(() => {
        inventoryStatus.textContent = copy.inventoryError;
      });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (form.dataset.soldOut === "true") return;

      const deliveryOption = deliverySelect.value;
      const buyer = {
        phone: form.elements.buyer_phone.value.trim(),
        location: form.elements.buyer_location.value.trim(),
        address: form.elements.buyer_address.value.trim(),
        consent: form.elements.privacy_consent.checked,
      };

      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      status.textContent = copy.opening;

      try {
        const response = await fetch("/.netlify/functions/create-mercadopago-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sku,
            delivery_option: deliveryOption,
            lang: locale,
            buyer,
            captcha_token: captchaInput ? captchaInput.value : "",
          }),
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok || !result.checkout_url) {
          if (response.status === 409) {
            form.dataset.soldOut = "true";
            inventoryStatus.textContent = copy.soldOut;
            deliverySelect.disabled = true;
          }
          if (response.status === 429) {
            throw new Error(result.captcha_required ? copy.captchaRequired : copy.rateLimited);
          }
          throw new Error(copy.startError);
        }

        const checkoutUrl = new URL(result.checkout_url);
        if (checkoutUrl.protocol !== "https:" || !checkoutHosts.has(checkoutUrl.hostname)) {
          throw new Error(copy.invalidUrl);
        }

        window.location.assign(checkoutUrl.href);
      } catch (error) {
        status.textContent = error.message || copy.startError;
        if (form.dataset.soldOut !== "true") button.disabled = false;
        button.removeAttribute("aria-busy");
      }
    });
  });
})();
