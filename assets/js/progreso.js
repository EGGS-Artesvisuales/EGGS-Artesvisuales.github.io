document.addEventListener("DOMContentLoaded", function () {
    let recaudado = 1;  // Ajusta según la cantidad recaudada actual
    let metaUnitaria = 2900000;  // Meta para una unidad del proyecto
    let metaGlobal = 29000000;  // Meta total del proyecto

    // Calcula los porcentajes, asegurando que no excedan el 100%
    let porcentajeGlobal = Math.min((recaudado / metaGlobal) * 100, 100);
    let porcentajeUnitario = Math.min((recaudado / metaUnitaria) * 100, 100);

    // Elementos del DOM
    let barra = document.getElementById("progreso-barra");
    let textoRecaudado = document.getElementById("recaudado");
    let textoPorcentajeGlobal = document.getElementById("porcentaje-global");
    let textoPorcentajeUnitario = document.getElementById("porcentaje-unitario");

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
    textoRecaudado.textContent = `$ ${recaudado.toLocaleString()} CLP recaudado`;
    textoPorcentajeGlobal.textContent = `Progreso global: ${Math.round(porcentajeGlobal)}%`;
    textoPorcentajeUnitario.textContent = `Progreso unitario: ${Math.round(porcentajeUnitario)}%`;
});
