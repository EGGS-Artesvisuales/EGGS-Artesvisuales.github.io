document.addEventListener("DOMContentLoaded", async function() {
  console.log("📢 Script progreso.js cargado correctamente");

  // Meta de financiamiento
  const metaUSD = 23000;
  const usdToClp = 800; // Tasa de conversión USD → CLP

  // Elementos del DOM
  const progressBar = document.getElementById("progreso-barra");
  const recaudadoEl = document.getElementById("recaudado");
  const porcentajeGlobalEl = document.getElementById("porcentaje-global");
  const porcentajeUnitarioEl = document.getElementById("porcentaje-unitario");

  // Endpoint de la función Netlify
  const endpoint = "https://eggs-studio.cl/.netlify/functions/get-recaudado";

  // Detectar el idioma; se espera que la etiqueta <html> tenga el atributo lang (por ejemplo, "en" o "es")
  const lang = document.documentElement.lang || "es";

  // Función para actualizar la barra de progreso e información
  async function actualizarProgreso() {
    try {
      console.log("🔄 Solicitando datos de recaudación...");
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`❌ HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("✅ Datos obtenidos:", data);
      if (!data || typeof data.recaudado !== "number") {
        throw new Error("⚠️ Respuesta inválida de la API");
      }
      
      const recaudadoUSD = data.recaudado || 0;
      const porcentaje = Math.min((recaudadoUSD / metaUSD) * 100, 100);
      const recaudadoCLP = recaudadoUSD * usdToClp;
      
      // Actualizar barra de progreso
      if (progressBar) {
        progressBar.style.width = `${porcentaje}%`;
        progressBar.textContent = `${Math.floor(porcentaje)}%`;
      }
      
      // Actualizar textos según el idioma
      if (recaudadoEl) {
        recaudadoEl.textContent = lang === "en"
          ? `Raised: $${recaudadoUSD.toLocaleString()} USD (${recaudadoCLP.toLocaleString()} CLP)`
          : `Recaudado: $${recaudadoUSD.toLocaleString()} USD (${recaudadoCLP.toLocaleString()} CLP)`;
      }
      if (porcentajeGlobalEl) {
        porcentajeGlobalEl.textContent = lang === "en"
          ? `Global Percentage: ${Math.floor(porcentaje)}%`
          : `Porcentaje global: ${Math.floor(porcentaje)}%`;
      }
      if (porcentajeUnitarioEl) {
        porcentajeUnitarioEl.textContent = lang === "en"
          ? `Unit Progress: ${(recaudadoUSD / metaUSD).toFixed(2)}`
          : `Progreso unitario: ${(recaudadoUSD / metaUSD).toFixed(2)}`;
      }
      
    } catch (error) {
      console.error("❌ Error al obtener datos:", error);
      if (progressBar) {
        progressBar.style.width = "0%";
        progressBar.textContent = "Error";
      }
      if (recaudadoEl) {
        recaudadoEl.textContent = lang === "en"
          ? "Error fetching funding data."
          : "Error al obtener los datos de financiamiento.";
      }
    }
  }

  // Llamada inicial para obtener los datos al cargar la página
  await actualizarProgreso();

  // Actualización automática cada 30 segundos
  setInterval(actualizarProgreso, 30000);
});
