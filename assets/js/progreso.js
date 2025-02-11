<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Sistema de Donaciones</title>
  <style>
    .barra-progreso-container {
      max-width: 400px;
      margin: 20px auto;
      font-family: Arial, sans-serif;
    }
    .barra-progreso {
      background-color: #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      margin: 10px 0;
      height: 25px;
    }
    .barra-progreso-fill {
      height: 100%;
      background-color: #76c7c0;
      width: 0%;
      text-align: center;
      color: #fff;
      line-height: 25px;
      transition: width 0.5s ease;
    }
    form {
      text-align: center;
      margin-top: 20px;
    }
    input[type="submit"] {
      background-color: #0070ba;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    input[type="submit"]:hover {
      background-color: #005c99;
    }
  </style>
</head>
<body>
  <!-- Contenedor de la barra de progreso -->
  <div class="barra-progreso-container">
    <label for="progreso">Progreso del financiamiento:</label>
    <div class="barra-progreso">
      <div class="barra-progreso-fill" id="progreso-barra">0%</div>
    </div>
    <p id="recaudado">$ 0 CLP recaudado</p>
    <p id="porcentaje-unitario">Progreso unitario: 0%</p>
    <p id="porcentaje-global">Progreso global: 0%</p>
  </div>

  <!-- Botón de donación -->
  <form action="https://www.paypal.com/ncp/payment/GX4V3R9TEHJ5G" method="post" target="_blank">
    <input class="pp-GX4V3R9TEHJ5G" type="submit" value="Impulsar proyecto">
  </form>

  <!-- JavaScript para actualizar la barra de progreso -->
  <script>
    document.addEventListener("DOMContentLoaded", function () {
        // Actualiza los montos según tus datos reales
        let recaudado = 69000;       // Monto recaudado actual (CLP)
        let metaUnitaria = 2300000;    // Meta para una unidad del proyecto (CLP)
        let metaGlobal = 23000000;     // Meta total del proyecto (CLP)

        // Calcula los porcentajes (no excederán el 100%)
        let porcentajeGlobal = Math.min((recaudado / metaGlobal) * 100, 100);
        let porcentajeUnitario = Math.min((recaudado / metaUnitaria) * 100, 100);

        // Elementos del DOM
        let barra = document.getElementById("progreso-barra");
        let textoRecaudado = document.getElementById("recaudado");
        let textoPorcentajeGlobal = document.getElementById("porcentaje-global");
        let textoPorcentajeUnitario = document.getElementById("porcentaje-unitario");

        // Animación de la barra de progreso (para el porcentaje global)
        let incremento = 0;
        let animacion = setInterval(() => {
            if (incremento >= porcentajeGlobal) {
                clearInterval(animacion);
            } else {
                incremento++;
                barra.style.width = incremento + "%";
                barra.textContent = incremento + "%";
            }
        }, 20); // Velocidad de animación

        // Actualiza los textos con formato de moneda y porcentaje
        textoRecaudado.textContent = `$ ${recaudado.toLocaleString('es-CL')} CLP recaudado`;
        textoPorcentajeGlobal.textContent = `Progreso global: ${Math.round(porcentajeGlobal)}%`;
        textoPorcentajeUnitario.textContent = `Progreso unitario: ${Math.round(porcentajeUnitario)}%`;
    });
  </script>
</body>
</html>
