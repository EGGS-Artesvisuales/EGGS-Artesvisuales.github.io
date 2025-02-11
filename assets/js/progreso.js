document.addEventListener("DOMContentLoaded", function () {
    // Montos en CLP
    let recaudado = 69000;       // Monto recaudado actual
    let metaUnitaria = 2300000;    // Meta para una unidad del proyecto
    let metaGlobal = 23000000;     // Meta total del proyecto

    // Calcula los porcentajes, limitados a un máximo de 100%
    let porcentajeGlobal = Math.min((recaudado / metaGlobal) * 100, 100);
    let porcentajeUnitario = Math.min((recaudado / metaUnitaria) * 100, 100);

    // Referencias a los elementos del DOM
    let barra = document.getElementById("progreso-barra");
    let textoRecaudado = document.getElementById("recaudado");
    let textoPorcentajeGlobal = document.getElementById("porcentaje-global");
    let textoPorcentajeUnitario = document.getElementById("porcentaje-unitario");

    // Animación de la barra basada en el porcentaje global
    let incremento = 0;
    let animacion = setInterval(() => {
        if (incremento >= porcentajeGlobal) {
            clearInterval(animacion);
        } else {
            incremento++;
            barra.style.width = incremento + "%";
            barra.textContent = incremento + "%";
        }
    }, 20); // Puedes ajustar la velocidad modificando el valor en milisegundos

    // Actualiza los textos informativos
    textoRecaudado.textContent = `$ ${recaudado.toLocaleString('es-CL')} CLP recaudado`;
    textoPorcentajeGlobal.textContent = `Progreso global: ${Math.round(porcentajeGlobal)}%`;
    textoPorcentajeUnitario.textContent = `Progreso unitario: ${Math.round(porcentajeUnitario)}%`;
});
