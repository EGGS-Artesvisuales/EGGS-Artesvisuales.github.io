---
layout: default-es
title: Lo Tangible
permalink: /ES/tangible.html
mermaid: true
---
<div class="titulo">Lo tangible</div>
<div class="subtitulo">Representación del mundo material</div>

<div class="parrafo">
  <p>
    Este conjunto de obras se enfoca en reflejar, retratar y representar aspectos físicos y materiales de mi entorno, con el fin de plasmar mi época, el tiempo presente. El tema se selecciona estratégicamente para destacar elementos emblemáticos de la contemporaneidad, elegidos por su significado y su capacidad para representar una realidad única y actual.
  </p>

  <p>
    Los criterios para identificar estos elementos son:
  </p>

  <ul class="parrafo"> <!-- ahora sí es un UL real -->
      <li>Presencia constante o abundante en los paisajes.</li>
      <li>Frecuencia de uso o aparición en la experiencia diaria.</li>
      <li>Carácter novedoso, no presente en épocas anteriores, pero que además cumple con las condiciones anteriores.</li>
      <li>Capacidad para simbolizar cambios sociales, culturales o tecnológicos.</li>
  </ul>
  <br>

  <p class="parrafo">
    La serie busca capturar rasgos característicos de la realidad contemporánea, manteniéndose en constante evolución y abierta a la expansión a través de una investigación continua. Hasta el momento, la serie cuenta con dos ejes temáticos que abordan tópicos representativos de los rasgos tangibles de lo contemporáneo:
  </p>

  <p class="parrafo">
    La saturación y la tecnología: dos líneas de trabajo que surgen de la identificación de rasgos importantes de nuestro presente y que abren nuevas posibilidades, desarrolladas inicialmente en la pintura y extendidas a otras manifestaciones a través de la ampliación de este lenguaje primordial del arte.
  </p>
  <br><br>


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
