document.addEventListener("DOMContentLoaded", function () {
    // Tasa de cambio aproximada de USD a CLP (actualízala dinámicamente si lo deseas)
    const tasaCambio = 970; // 1 USD ≈ 970 CLP (ajusta según corresponda)

    // Montos en USD
    let recaudadoUSD = 0; // Valor inicial de lo recaudado
    let metaUnitariaUSD = 2300; // Meta para una unidad en USD
    let metaGlobalUSD = 23000; // Meta total en USD

    // Convertir a CLP
    let recaudado = recaudadoUSD * tasaCambio;
    let metaUnitaria = metaUnitariaUSD * tasaCambio;
    let metaGlobal = metaGlobalUSD * tasaCambio;

    // Calcula los porcentajes, limitando a un máximo de 100%
    let porcentajeGlobal = Math.min((recaudado / metaGlobal) * 100, 100);
    let porcentajeUnitario = Math.min((recaudado / metaUnitaria) * 100, 100);

    // Referencias a los elementos del DOM
    let barra = document.getElementById("progreso-barra");
    let textoRecaudado = document.getElementById("recaudado");
    let textoPorcentajeGlobal = document.getElementById("porcentaje-global");
    let textoPorcentajeUnitario = document.getElementById("porcentaje-unitario");

    // Animación de la barra basada en el porcentaje global
    let incremento = 0;
    let velocidad = 10; // Ajusta la velocidad de animación en milisegundos

    let animacion = setInterval(() => {
        if (incremento >= porcentajeGlobal) {
            clearInterval(animacion);
        } else {
            incremento += 1;
            barra.style.width = incremento + "%";
            barra.textContent = incremento + "%";
        }
    }, velocidad);

    // Actualiza los textos informativos
    textoRecaudado.textContent = `$ ${recaudado.toLocaleString('es-CL')} CLP recaudado`;
    textoPorcentajeGlobal.textContent = `Progreso global: ${Math.round(porcentajeGlobal)}%`;
    textoPorcentajeUnitario.textContent = `Progreso unitario: ${Math.round(porcentajeUnitario)}%`;
});
