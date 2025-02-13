document.addEventListener("DOMContentLoaded", async function() {
  console.log("Script progreso.js cargado correctamente");

  // Meta de financiamiento en USD
  const metaUSD = 23000;
  const usdToClp = 800; // Tasa de conversión

  // Elementos del DOM
  const progressBar = document.getElementById("progreso-barra");
  const recaudadoEl = document.getElementById("recaudado");
  const porcentajeGlobalEl = document.getElementById("porcentaje-global");
  const porcentajeUnitarioEl = document.getElementById("porcentaje-unitario");

  // Endpoint de la función get-recaudado
  const endpoint = "https://eggs-studio.cl/.netlify/functions/get-recaudado";

  // Función para actualizar la barra de progreso e información
  async function actualizarProgreso() {
    try {
      console.log("Solicitando datos de recaudación...");
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Datos obtenidos:", data);

      if (!data || typeof data.recaudado !== "number") {
        throw new Error("Respuesta inválida de la API");
      }

      const recaudadoUSD = data.recaudado || 0;
      const porcentaje = Math.min((recaudadoUSD / metaUSD) * 100, 100);
      const recaudadoCLP = recaudadoUSD * usdToClp;

      // Verifica si los elementos existen antes de actualizar
      if (progressBar) {
        progressBar.style.width = porcentaje + "%";
        progressBar.textContent = Math.floor(porcentaje) + "%";
      }

      if (recaudadoEl) {
        recaudadoEl.textContent = `Recaudado: $${recaudadoUSD.toLocaleString()} USD (${recaudadoCLP.toLocaleString()} CLP)`;
      }

      if (porcentajeGlobalEl) {
        porcentajeGlobalEl.textContent = `Porcentaje global: ${Math.floor(porcentaje)}%`;
      }

      if (porcentajeUnitarioEl) {
        porcentajeUnitarioEl.textContent = `Progreso unitario: ${(recaudadoUSD / metaUSD).toFixed(2)}`;
      }

    } catch (error) {
      console.error("Error al obtener datos:", error);

      if (progressBar) {
        progressBar.style.width = "0%"; // Resetea la barra si hay error
        progressBar.textContent = "Error";
      }

      if (recaudadoEl) {
        recaudadoEl.textContent = "Error al obtener los datos de financiamiento.";
      }
    }
  }

  // Llamada inicial al cargar la página
  await actualizarProgreso();

  // Actualización cada 30 segundos para mantener la información al día
  setInterval(actualizarProgreso, 30000);
});
