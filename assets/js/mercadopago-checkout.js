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
      opening: "Abriendo el pago seguro…",
      startError: "No se pudo iniciar el pago. Intenta nuevamente.",
      invalidUrl: "Mercado Pago devolvió una dirección no válida.",
      buyButton: "Comprar ahora con Mercado Pago",
      quoteButton: "Solicitar cotización de despacho",
      quoteSending: "Enviando la solicitud…",
      quoteSuccess: "Solicitud enviada. Te contactaremos con el costo total antes de cobrar.",
      quoteError: "No pudimos enviar la solicitud. Intenta nuevamente.",
    },
    en: {
      soldOut: "Sold out",
      available: (count) => `${count} copies available`,
      inventoryError: "We could not verify stock. Please reload the page.",
      opening: "Opening secure payment…",
      startError: "Payment could not be started. Please try again.",
      invalidUrl: "Mercado Pago returned an invalid address.",
      buyButton: "Buy now with Mercado Pago",
      quoteButton: "Request a shipping quote",
      quoteSending: "Sending request…",
      quoteSuccess: "Request sent. We will contact you with the full cost before charging.",
      quoteError: "We could not send the request. Please try again.",
    },
    mpd: {
      soldOut: "Afuy stock",
      available: (count) => `${count} ejemplar müley`,
      inventoryError: "Stock kimfal-lay. Página wiñokintunge.",
      opening: "Küme kulliñ rüpü nülagey…",
      startError: "Kullin tüwlay. Ka kiñe rupa küdawtunge.",
      invalidUrl: "Mercado Pago küme dirección elulay.",
      buyButton: "Mercado Pago mew fachantü ngillange",
      quoteButton: "Werkün ñi falintun ramtu",
      quoteSending: "Ramtu werküley…",
      quoteSuccess: "Ramtu werküngey. Petu kullin, kom falintun mew nütramkayu.",
      quoteError: "Ramtu werküfal-lay. Ka kiñe rupa küdawtunge.",
    },
    chn: {
      soldOut: "已售罄",
      available: (count) => `可购买：${count} 件`,
      inventoryError: "无法确认库存，请重新加载页面。",
      opening: "正在打开安全付款页面…",
      startError: "无法开始付款，请重试。",
      invalidUrl: "Mercado Pago 返回了无效地址。",
      buyButton: "使用 Mercado Pago 立即购买",
      quoteButton: "申请运费报价",
      quoteSending: "正在发送申请…",
      quoteSuccess: "申请已发送。收费前我们会联系您确认总价。",
      quoteError: "无法发送申请，请重试。",
    },
  };

  document.querySelectorAll("[data-mercadopago-checkout]").forEach((form) => {
    const button = form.querySelector("button[type='submit']");
    const inventoryStatus = form.querySelector("[data-inventory-status]");
    const status = form.querySelector("[data-checkout-status]");
    const deliverySelect = form.elements.delivery_option;
    const quoteContact = form.querySelector("[data-quote-contact]");
    const quoteName = form.elements.buyer_name;
    const quoteEmail = form.elements.buyer_email;
    const sku = form.dataset.sku;
    const locale = form.dataset.checkoutLang || "es";
    const copy = translations[locale] || translations.es;

    function updateDeliveryMode() {
      const quoteMode = deliverySelect.value === "quote_later";
      quoteContact.hidden = !quoteMode;
      quoteName.required = quoteMode;
      quoteEmail.required = quoteMode;
      button.textContent = quoteMode ? copy.quoteButton : copy.buyButton;
      status.textContent = "";
    }

    deliverySelect.addEventListener("change", updateDeliveryMode);
    updateDeliveryMode();

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
        name: quoteName.value.trim(),
        email: quoteEmail.value.trim(),
        phone: form.elements.buyer_phone.value.trim(),
        location: form.elements.buyer_location.value.trim(),
        address: form.elements.buyer_address.value.trim(),
        consent: form.elements.privacy_consent.checked,
      };

      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      const quoteMode = deliveryOption === "quote_later";
      status.textContent = quoteMode ? copy.quoteSending : copy.opening;

      try {
        const response = await fetch("/.netlify/functions/create-mercadopago-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sku, delivery_option: deliveryOption, lang: locale, buyer }),
        });
        const result = await response.json().catch(() => ({}));

        if (quoteMode && response.ok && result.quote_requested) {
          status.textContent = copy.quoteSuccess;
          form.dataset.quoteSent = "true";
          button.removeAttribute("aria-busy");
          return;
        }

        if (!response.ok || !result.checkout_url) {
          if (response.status === 409) {
            form.dataset.soldOut = "true";
            inventoryStatus.textContent = copy.soldOut;
            deliverySelect.disabled = true;
          }
          throw new Error(quoteMode ? copy.quoteError : copy.startError);
        }

        const checkoutUrl = new URL(result.checkout_url);
        if (checkoutUrl.protocol !== "https:" || !checkoutHosts.has(checkoutUrl.hostname)) {
          throw new Error(copy.invalidUrl);
        }

        window.location.assign(checkoutUrl.href);
      } catch (error) {
        status.textContent = error.message || (quoteMode ? copy.quoteError : copy.startError);
        if (form.dataset.soldOut !== "true") button.disabled = false;
        button.removeAttribute("aria-busy");
      }
    });
  });
})();
