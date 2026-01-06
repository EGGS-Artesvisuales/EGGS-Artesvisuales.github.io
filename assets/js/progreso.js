document.addEventListener("DOMContentLoaded", async function () {
  // Meta (fuente de verdad)
  const metaCLP = 20300000;

  // Tasa USD→CLP (idealmente muévela a config/JSON si la cambiarás)
  const usdToClp = 800;

  // DOM
  const progressBar = document.getElementById("progreso-barra");
  const recaudadoEl = document.getElementById("recaudado");
  const porcentajeGlobalEl = document.getElementById("porcentaje-global");
  const porcentajeUnitarioEl = document.getElementById("porcentaje-unitario");

  // (Opcional) crea este <p id="ultima-actualizacion"></p> si quieres mostrar timestamp
  const ultimaEl = document.getElementById("ultima-actualizacion");

  // Function Netlify
  const endpoint = "https://eggs-studio.cl/.netlify/functions/get-recaudado";

  const lang = document.documentElement.lang || "es";

  // Estado: último valor válido
  let lastGood = null;

  function formatMoney(n, currency, locale) {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(n);
  }

  function setUI({ recaudadoUSD }) {
    const recaudadoCLP = recaudadoUSD * usdToClp;
    const porcentaje = Math.min((recaudadoCLP / metaCLP) * 100, 100);

    if (progressBar) {
      progressBar.style.width = `${porcentaje}%`;
      progressBar.textContent = `${Math.floor(porcentaje)}%`;
      progressBar.setAttribute("aria-valuenow", `${Math.floor(porcentaje)}`);
    }

    const locale = lang === "en" ? "en-US" : "es-CL";

    if (recaudadoEl) {
      recaudadoEl.textContent =
        lang === "en"
          ? `Raised: ${formatMoney(recaudadoUSD, "USD", locale)} (${formatMoney(recaudadoCLP, "CLP", locale)})`
          : `Recaudado: ${formatMoney(recaudadoUSD, "USD", locale)} (${formatMoney(recaudadoCLP, "CLP", locale)})`;
    }

    if (porcentajeGlobalEl) {
      porcentajeGlobalEl.textContent =
        lang === "en" ? `Global Percentage: ${Math.floor(porcentaje)}%` : `Porcentaje global: ${Math.floor(porcentaje)}%`;
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

  async function actualizarProgreso() {
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      if (!data || typeof data.recaudado !== "number") throw new Error("Respuesta inválida");

      lastGood = { recaudadoUSD: data.recaudado };
      setUI(lastGood);
    } catch (err) {
      // Si ya hubo un valor válido, lo mantenemos y solo avisamos.
      if (!lastGood) {
        if (progressBar) {
          progressBar.style.width = "0%";
          progressBar.textContent = "—";
        }
      }
      if (recaudadoEl) {
        recaudadoEl.textContent =
          lang === "en"
            ? "Funding data temporarily unavailable."
            : "Datos de financiamiento no disponibles temporalmente.";
      }
    }
  }

  await actualizarProgreso();

  // Sugerencia: 60–300s suele ser suficiente (menos carga). Ajusta si lo necesitas.
  setInterval(actualizarProgreso, 120000);
});
