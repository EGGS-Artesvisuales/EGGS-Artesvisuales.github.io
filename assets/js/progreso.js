document.addEventListener("DOMContentLoaded", function () {
    let recaudado = 20500000;  // Ajusta según la cantidad recaudada actual
    let metaGlobal = 23000000; // Meta total del proyecto
    let porcentaje = Math.min((recaudado / metaGlobal) * 100, 100); // Calcula el porcentaje

    let barra = document.getElementById("progreso-barra");
    let textoRecaudado = document.getElementById("recaudado");
    let textoPorcentaje = document.getElementById("porcentaje");

    let incremento = 0;
    let animacion = setInterval(() => {
        if (incremento >= porcentaje) {
            clearInterval(animacion);
        } else {
            incremento++;
            barra.style.width = incremento + "%";
            barra.textContent = incremento + "%";
        }
    }, 20); // Velocidad de animación

    // Actualiza el texto con formato de moneda
    textoRecaudado.textContent = `$ ${recaudado.toLocaleString()} CLP recaudado`;
    textoPorcentaje.textContent = `${Math.round(porcentaje)}% recaudado`;
});
