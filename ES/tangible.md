---
layout: default-es
title: Lo Tangible
permalink: /ES/tangible.html
mermaid: true
---


<div class="titulo">Lo tangible</div>

<div class="subtitulo">Representación del mundo material</div>

<p class="parrafo">
Este conjunto de obras se enfocen en reflejar o retratar, representar aspectos físicos y materiales de mi entorno con el fin de retratra mi epoca, el tiempo presente. El tema, lo representado, se selecciona estratégicamente para destacar elementos emblemáticos de la contemporaneidad, elegidos por su significado y su capacidad de representar la realidad. unica y actual.
</p>

<p class="parrafo">
Los criterios para identificar estos elementos :
</p>

<ul class="parrafo"> <!-- ahora sí es un UL real -->
    <li>Presencia constante o abundante en los paisajes.</li>
    <li>Frecuencia de uso o aparicion en la experiencia diaria.</li>
    <li>Carácter novedoso, inexistente en épocas anteriores. pero que tambien cumple con las anteriores condiciones.</li>
    <li>Capacidad de simbolizar cambios sociales, culturales o tecnológicos.</li>
    </ul>
<br>
<p class="parrafo">
La serie busca capturar rasgos característicos de la realidad contemporánea, manteniéndose en constante evolución y abierta a la expansión a través de una investigación continua. hasta este momento la serie cuenta pcn dos remas que tienen que ver con dos topicos que intento representar por ser rasgos tangibles de lo contemporaneo:
</p>

<p class="parrafo">
La Saturacion, y la tecnologia. dos líneas de trabajo que surgen de la identificacion de rasgos importante de nuestro presente y abrenm estas lineas de tranabajo que desarrollo desde la pintura, y luego hacia otras manifestaciones a traves de la ampliacion de este lenguaje madre del arte.</p>
<br><br>
<!-- Diagrama Mermaid -->
<div class="subtitulo">Diagrama de relaciones</div>
<div class="parrafo">
Este diagrama esquematiza cómo las distintas series de la línea “Lo Tangible” se relacionan con los conceptos clave de la investigación.
</div>

<div class="mermaid">
graph TD
    Representacion["Representación del Mundo"]
    Representacion --> Tangible["Lo Tangible"]
    Representacion --> Intangible["Lo Intangible"]

    Tangible --> Saturacion["La Saturación"]
    Tangible --> Tecnologia["La Tecnología"]

    Saturacion --> Peste["La Peste"]
    Saturacion --> Invisible["Lo Invisible"]

    %% Desarrollo del nodo "Lo Tangible"
    subgraph "Lo Tangible"
        Saturacion
        Tecnologia
    end

    click Representacion "/ES/mundo-exterior.html" "Ir a Representación del Mundo"
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
