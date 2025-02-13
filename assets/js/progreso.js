document.addEventListener("DOMContentLoaded", function() {
  // Meta de financiamiento en USD
  const metaUSD = 23000;
  const usdToClp = 800; // Tasa de conversión (modifícala según corresponda)

  // Elementos del DOM
  const progressBar = document.getElementById("progreso-barra");
  const recaudadoEl = document.getElementById("recaudado");
  const porcentajeGlobalEl = document.getElementById("porcentaje-global");
  const porcentajeUnitarioEl = document.getElementById("porcentaje-unitario");

  // Endpoint de la función get-recaudado
  const endpoint = "https://eggs-studio.cl/.netlify/functions/get-recaudado";

  // Función para actualizar la barra de progreso e información
  function actualizarProgreso() {
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data || typeof data.recaudado !== "number") {
          throw new Error("Respuesta inválida de la API");
        }

        const recaudadoUSD = data.recaudado || 0;
        const porcentaje = Math.min((recaudadoUSD / metaUSD) * 100, 100);

        // Actualiza la barra de progreso
        progressBar.style.width = porcentaje + "%";
        progressBar.textContent = Math.floor(porcentaje) + "%";

        // Conversión a CLP
        const recaudadoCLP = recaudadoUSD * usdToClp;

        // Actualiza la información adicional
        recaudadoEl.textContent = `Recaudado: $${recaudadoUSD.toLocaleString()} USD (${recaudadoCLP.toLocaleString()} CLP)`;
        porcentajeGlobalEl.textContent = `Porcentaje global: ${Math.floor(porcentaje)}%`;
        porcentajeUnitarioEl.textContent = `Progreso unitario: ${(recaudadoUSD / metaUSD).toFixed(2)}`;
      })
      .catch(error => {
        console.error("Error al obtener datos:", error);
        recaudadoEl.textContent = "Error al obtener los datos de financiamiento.";
        progressBar.style.width = "0%"; // Resetea la barra si hay error
        progressBar.textContent = "Error";
      });
  }

  // Llamada inicial al cargar la página
  actualizarProgreso();

  // Actualización cada 30 segundos para mantener la información al día
  setInterval(actualizarProgreso, 30000);
});

