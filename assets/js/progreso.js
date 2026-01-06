document.addEventListener("DOMContentLoaded", async function () {
  // Meta (fuente de verdad)
  const metaCLP = 20300000;

  // Tasa USD→CLP (estimación)
  const usdToClp = 800;

  // DOM
  const progressBar = document.getElementById("progreso-barra");
  const recaudadoEl = document.getElementById("recaudado");
  const porcentajeGlobalEl = document.getElementById("porcentaje-global");
  const porcentajeUnitarioEl = document.getElementById("porcentaje-unitario");
  const ultimaEl = document.getElementById("ultima-actualizacion");

  // Function Netlify
  const endpoint = "https://eggs-studio.cl/.netlify/functions/get-recaudado";

  const lang = document.documentElement.lang || "es";
  const locale = lang === "en" ? "en-US" : "es-CL";

  // Estado: último valor válido
  let lastGood = null;

  function formatMoney(n, currency) {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(n);
  }

  function clampNumber(n, min, max) {
    if (!Number.isFinite(n)) return min;
    return Math.min(Math.max(n, min), max);
  }

  function setProgressUI(pct) {
    const porcentaje = clampNumber(pct, 0, 100);
    const pctInt = Math.round(porcentaje);

    if (!progressBar) return;

    progressBar.style.width = `${porcentaje}%`;
    progressBar.textContent = `${pctInt}%`;
    progressBar.setAttribute("aria-valuenow", `${pctInt}`);
    progressBar.setAttribute(
      "aria-valuetext",
      lang === "en" ? `${pctInt} percent` : `${pctInt} por ciento`
    );
  }

  function setUI({ recaudadoUSD }) {
    // Sanitizar input
    const usd = Number(recaudadoUSD);
    const safeUSD = Number.isFinite(usd) ? Math.max(usd, 0) : 0;

    const recaudadoCLP = safeUSD * usdToClp;
    const porcentaje = (recaudadoCLP / metaCLP) * 100;

    setProgressUI(porcentaje);

    if (recaudadoEl) {
      recaudadoEl.textContent =
        lang === "en"
          ? `Raised: ${formatMoney(safeUSD, "USD")} (${formatMoney(recaudadoCLP, "CLP")})`
          : `Recaudado: ${formatMoney(safeUSD, "USD")} (${formatMoney(recaudadoCLP, "CLP")})`;
    }

    if (porcentajeGlobalEl) {
      porcentajeGlobalEl.textContent =
        lang === "en"
          ? `Global Percentage: ${Math.round(clampNumber(porcentaje, 0, 100))}%`
          : `Porcentaje global: ${Math.round(clampNumber(porcentaje, 0, 100))}%`;
    }

    if (porcentajeUnitarioEl) {
      const unit = recaudadoCLP / metaCLP;
      porcentajeUnitarioEl.textContent =
        lang === "en" ? `Unit Progress: ${unit.toFixed(4)}` : `Progreso unitario: ${unit.toFixed(4)}`;
    }

    if (ultimaEl) {
      const now = new Date();
      ultimaEl.textContent =
        lang === "en"
          ? `Last update: ${now.toLocaleString(locale)}`
          : `Última actualización: ${now.toLocaleString(locale)}`;
    }
  }

  function setTemporaryWarning() {
    // No borra el último valor, solo agrega aviso (si existe contenedor)
    if (ultimaEl) {
      const now = new Date();
      ultimaEl.textContent =
        lang === "en"
          ? `Last update failed: ${now.toLocaleString(locale)}`
          : `Actualización fallida: ${now.toLocaleString(locale)}`;
    }
  }

  async function actualizarProgreso() {
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const rec = Number(data?.recaudado);

      if (!Number.isFinite(rec)) throw new Error("Respuesta inválida: recaudado no numérico");

      lastGood = { recaudadoUSD: rec };
      setUI(lastGood);
    } catch (err) {
      // Si ya hubo un valor válido, lo mantenemos en UI.
      if (!lastGood) {
        // Estado inicial sin datos
        setProgressUI(0);
        if (recaudadoEl) {
          recaudadoEl.textContent =
            lang === "en"
              ? "Funding data temporarily unavailable."
              : "Datos de financiamiento no disponibles temporalmente.";
        }
      } else {
        // Mantener lo último y solo avisar
        setTemporaryWarning();
      }
    }
  }

  await actualizarProgreso();

  // Menos carga: 120s (2 min). Ajusta si lo necesitas.
  setInterval(actualizarProgreso, 120000);
});
