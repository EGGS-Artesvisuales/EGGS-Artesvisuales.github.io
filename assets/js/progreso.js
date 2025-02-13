<script>
document.addEventListener("DOMContentLoaded", function() {
  // Meta de financiamiento en USD
  const metaUSD = 23000;
  // Tasa de conversión: 1 USD = 800 CLP (modifica según la tasa actual)
  const usdToClp = 800;
  
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
      .then(response => response.json())
      .then(data => {
        const recaudadoUSD = data.recaudado;
        // Calcula el porcentaje de meta alcanzado, limitado al 100%
        const porcentaje = Math.min((recaudadoUSD / metaUSD) * 100, 100);
        
        // Actualiza la barra de progreso
        progressBar.style.width = porcentaje + "%";
        progressBar.textContent = Math.floor(porcentaje) + "%";
        
        // Conversión a CLP
        const recaudadoCLP = recaudadoUSD * usdToClp;
        const metaCLP = metaUSD * usdToClp;
        
        // Actualiza la información adicional
        recaudadoEl.textContent = `Recaudado: $${recaudadoUSD.toLocaleString()} USD (${recaudadoCLP.toLocaleString()} CLP)`;
        porcentajeGlobalEl.textContent = `Porcentaje global: ${Math.floor(porcentaje)}%`;
        // Proporción recaudada (valor unitario)
        porcentajeUnitarioEl.textContent = `Progreso unitario: ${(recaudadoUSD / metaUSD).toFixed(2)}`;
      })
      .catch(error => console.error("Error al obtener datos:", error));
  }

  // Llamada inicial al cargar la página
  actualizarProgreso();

  // Actualización cada 30 segundos para mantener la información al día
  setInterval(actualizarProgreso, 30000);
});
</script>
