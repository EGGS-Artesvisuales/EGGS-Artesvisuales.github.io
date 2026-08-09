(function () {
  "use strict";

  const checkoutHosts = new Set([
    "www.mercadopago.cl",
    "sandbox.mercadopago.cl",
  ]);
  const securityConfigUrl = "/.netlify/functions/get-checkout-security-config";
  const turnstileApiUrl = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
  let securityConfigPromise;
  let turnstileApiPromise;

  function getSecurityConfig() {
    if (!securityConfigPromise) {
      securityConfigPromise = fetch(securityConfigUrl, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      }).then(async (response) => {
        const config = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error("Security configuration unavailable");
        return config;
      });
    }
    return securityConfigPromise;
  }

  function loadTurnstileApi() {
    if (window.turnstile) return Promise.resolve(window.turnstile);
    if (turnstileApiPromise) return turnstileApiPromise;

    turnstileApiPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = turnstileApiUrl;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", () => {
        if (window.turnstile) resolve(window.turnstile);
        else reject(new Error("Turnstile API unavailable"));
      }, { once: true });
      script.addEventListener("error", () => reject(new Error("Turnstile API unavailable")), { once: true });
      document.head.appendChild(script);
    });
    return turnstileApiPromise;
  }

  const translations = {
    es: {
      soldOut: "Agotado",
      available: (count) => `${count} ejemplares disponibles`,
      inventoryError: "No pudimos verificar el stock. Intenta recargar la página.",
      opening: "Calculando despacho y abriendo el pago seguro…",
      startError: "No se pudo iniciar el pago. Intenta nuevamente.",
      rateLimited: "Hay demasiados intentos recientes. Espera unos minutos antes de volver a comprar.",
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
      invalidUrl: "Mercado Pago 返回了无效地址。",
      buyButton: "使用 Mercado Pago 立即购买",
    },
  };
  const verificationCopy = {
    es: {
      prompt: "Completa la verificaci\u00f3n de seguridad antes de volver a intentar el pago.",
      ready: "Verificaci\u00f3n completada. Ya puedes intentar el pago nuevamente.",
      expired: "La verificaci\u00f3n expir\u00f3. Compl\u00e9tala nuevamente.",
      unavailable: "La verificaci\u00f3n no est\u00e1 disponible. Espera unos minutos antes de volver a intentar.",
    },
    en: {
      prompt: "Complete the security check before trying the payment again.",
      ready: "Security check completed. You can try the payment again.",
      expired: "The security check expired. Please complete it again.",
      unavailable: "The security check is unavailable. Please wait a few minutes before trying again.",
    },
    mpd: {
      prompt: "K\u00fcme elkaw\u00fcn verificaci\u00f3n dewmanage petu ka ki\u00f1e rupa kulli\u00f1.",
      ready: "Verificaci\u00f3n dewmagey. Ka ki\u00f1e rupa kulli\u00f1afimi.",
      expired: "Verificaci\u00f3n afuy. Ka ki\u00f1e rupa dewmanage.",
      unavailable: "Verificaci\u00f3n fewla k\u00fcdawlay. Pichi mew wi\u00f1otunge.",
    },
    chn: {
      prompt: "\u8bf7\u5b8c\u6210\u5b89\u5168\u9a8c\u8bc1\uff0c\u7136\u540e\u518d\u6b21\u5c1d\u8bd5\u4ed8\u6b3e\u3002",
      ready: "\u9a8c\u8bc1\u5b8c\u6210\u3002\u73b0\u5728\u53ef\u4ee5\u518d\u6b21\u5c1d\u8bd5\u4ed8\u6b3e\u3002",
      expired: "\u9a8c\u8bc1\u5df2\u8fc7\u671f\uff0c\u8bf7\u91cd\u65b0\u5b8c\u6210\u9a8c\u8bc1\u3002",
      unavailable: "\u5b89\u5168\u9a8c\u8bc1\u6682\u65f6\u4e0d\u53ef\u7528\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002",
    },
  };

  document.querySelectorAll("[data-mercadopago-checkout]").forEach((form) => {
    const button = form.querySelector("button[type='submit']");
    const inventoryStatus = form.querySelector("[data-inventory-status]");
    const status = form.querySelector("[data-checkout-status]");
    const deliverySelect = form.elements.delivery_option;
    const captchaInput = form.elements.captcha_token;
    const captchaContainer = form.querySelector("[data-turnstile-container]");
    const captchaWidget = form.querySelector("[data-turnstile-widget]");
    const captchaInstructions = form.querySelector("[data-turnstile-instructions]");
    const sku = form.dataset.sku;
    const locale = form.dataset.checkoutLang || "es";
    const copy = translations[locale] || translations.es;
    const securityCopy = verificationCopy[locale] || verificationCopy.es;
    let turnstileWidgetId = null;

    function resetTurnstile() {
      if (captchaInput) captchaInput.value = "";
      if (turnstileWidgetId !== null && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId);
      }
    }

    async function showTurnstile() {
      const config = await getSecurityConfig();
      if (!config.turnstile_enabled || !config.turnstile_site_key) {
        throw new Error(securityCopy.unavailable);
      }

      const turnstile = await loadTurnstileApi();
      captchaContainer.hidden = false;
      captchaInstructions.textContent = securityCopy.prompt;
      button.disabled = true;
      if (captchaInput) captchaInput.value = "";

      if (turnstileWidgetId === null) {
        turnstileWidgetId = turnstile.render(captchaWidget, {
          sitekey: config.turnstile_site_key,
          theme: "auto",
          callback(token) {
            captchaInput.value = token;
            captchaInstructions.textContent = securityCopy.ready;
            status.textContent = securityCopy.ready;
            button.disabled = false;
          },
          "expired-callback"() {
            captchaInput.value = "";
            captchaInstructions.textContent = securityCopy.expired;
            status.textContent = securityCopy.expired;
            button.disabled = true;
          },
          "error-callback"() {
            captchaInput.value = "";
            captchaInstructions.textContent = securityCopy.unavailable;
            status.textContent = securityCopy.unavailable;
            button.disabled = true;
          },
        });
      } else {
        turnstile.reset(turnstileWidgetId);
      }
      captchaContainer.scrollIntoView({ block: "nearest" });
    }

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
      if (!captchaContainer.hidden && !captchaInput.value) {
        status.textContent = securityCopy.prompt;
        return;
      }

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
      const submittedCaptcha = Boolean(captchaInput && captchaInput.value);

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
            if (result.captcha_required) {
              resetTurnstile();
              await showTurnstile();
              status.textContent = securityCopy.prompt;
              button.removeAttribute("aria-busy");
              return;
            }
            throw new Error(copy.rateLimited);
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
        if (submittedCaptcha) {
          resetTurnstile();
          button.disabled = true;
        } else if (form.dataset.soldOut !== "true") {
          button.disabled = false;
        }
        button.removeAttribute("aria-busy");
      }
    });
  });
})();
