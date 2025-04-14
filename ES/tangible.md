---
layout: default-es
title: Lo Tangible
permalink: /ES/tangible.html
mermaid: true
---

<div class="titulo">Lo tangible</div>

<div class="subtitulo">Representación del mundo material</div>

<p class="parrafo">
Esta serie de obras se enfoca en reflejar y representar aspectos físicos y materiales de mi entorno, con el objetivo de retratar nuestra época contemporánea. Los temas seleccionados destacan elementos emblemáticos del presente, elegidos por su significado y capacidad de simbolizar la realidad única de nuestro tiempo.
</p>

<p class="parrafo">
Los criterios para identificar estos elementos son:
</p>

<ul class="parrafo">
    <li>Presencia constante o abundante en los paisajes urbanos y naturales</li>
    <li>Frecuencia en la experiencia cotidiana</li>
    <li>Carácter novedoso, inexistente en épocas anteriores pero que cumple con los criterios anteriores</li>
    <li>Capacidad para simbolizar cambios sociales, culturales o tecnológicos</li>
</ul>

<br>
<p class="parrafo">
La serie busca capturar rasgos distintivos de la realidad contemporánea, manteniéndose en constante evolución y abierta a la expansión mediante una investigación continua. Hasta el momento, la serie explora dos temas fundamentales que representan aspectos tangibles de nuestra época:
</p>

<p class="parrafo">
La Saturación y la Tecnología. Estas líneas de trabajo surgen de la identificación de características esenciales de nuestro presente y se desarrollan inicialmente a través de la pintura, para luego expandirse hacia otras manifestaciones artísticas.
</p>

<br><br>
<!-- Diagrama Mermaid -->
<div class="subtitulo">Diagrama de relaciones</div>
<div class="parrafo">
Este diagrama esquematiza cómo las distintas series de la línea "Lo Tangible" se relacionan con los conceptos clave de la investigación.
</div>

<div class="mermaid">
graph TD
    subgraph "Representación del Mundo"
        Tangible["Lo Tangible"]
        Intangible["Lo Intangible"]
    end

    Tangible --> Saturacion["La Saturación"]
    Tangible --> Tecnologia["La Tecnología"]

    Saturacion --> Peste["La Peste"]
    Saturacion --> Invisible["Lo Invisible"]

    click Tangible "/ES/tangible.html" "Ir a Lo Tangible"
    click Intangible "/ES/intangible.html" "Ir a Lo Intangible"
    click Saturacion "/ES/saturacion.html" "Ir a La Saturación"
    click Tecnologia "/ES/tecnologia.html" "Ir a La Tecnología"
    click Peste "/ES/peste.html" "Ir a La Peste"
    click Invisible "/ES/invisible.html" "Ir a Lo Invisible"
</div>
<br><br>
<!-- botones -->

<div class="button-container">
    <a href="/ES/saturacion.html" class="fancy-button">
        <div class="button-content">
            <img src="/assets/img/animacion-boton-la-saturacion.gif" alt="La Saturación">
            <p class="title">La Saturación</p>
            <p class="subtitle">La contaminación y producción capitalista</p>
        </div>
    </a>
    <a href="/ES/tecnologia.html" class="fancy-button">
        <div class="button-content">
            <img src="/assets/img/animacion-boton-la-tecnologia.gif" alt="La Tecnología">
            <p class="title">La Tecnología</p>
            <p class="subtitle">Influencias en el entorno contemporáneo</p>
        </div>
    </a>
</div>
