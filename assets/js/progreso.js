
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
