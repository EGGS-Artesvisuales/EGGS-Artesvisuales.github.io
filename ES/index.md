---
layout: default-es
title: Inicio
description: "Bienvenido a EGGS-Studio, explorando el arte."
permalink: /ES/index.html
mermaid: true
---

<h1 class="titulo">EGGS-STUDIO</h1>

<h2 class="subtitulo">
  Universo creativo de Esteban Gárnica.
</h2>

<p class="parrafo" style="margin-top: 7%;">
  Este es el espacio donde convergen las distintas dimensiones de mi trabajo como artista visual. 
  Aquí se articulan proyectos íntimos y obras de gran escala, organizados en tres ejes que estructuran mi práctica: la representación del mundo exterior, la acción en el territorio y la exploración del universo interior. Cada eje despliega una forma particular de relacionarme con el arte y de construir sentido a través de lo visual.
</p>

<br><br>


<div class="mermaid">
graph TD
  principal[Actividad Artística]
  representacion[Representación del Mundo]
  accion[Acción en el Mundo]
  interior[Exploración del Mundo Interior]

  principal --> representacion
  principal --> accion
  principal --> interior

  representacion --> tangible[Lo Tangible]
  representacion --> intangible[Lo Intangible]

  accion --> subrepticio[Lo Subrepticio]
  accion --> comunitario[Lo Comunitario]
  accion --> docencia[Docencia y Talleres]
  accion --> servicios[Servicios]

  click principal "/ES/index.html" "Ir al Inicio"
  click representacion "/ES/mundo-exterior.html" "Ver Representación del Mundo"
  click tangible "/ES/tangible.html" "Explorar Lo Tangible"
  click intangible "/ES/intangible.html" "Explorar Lo Intangible"

  click accion "/ES/accion.html" "Ver Acción en el Mundo"
  click subrepticio "/ES/subrepticio.html" "Ver Lo Subrepticio"
  click comunitario "/ES/comunitario.html" "Ver Lo Comunitario"
  click docencia "/ES/docencia.html" "Ver Docencia y Talleres"
  click servicios "/ES/servicios.html" "Ver Servicios"

  click interior "/ES/interior.html" "Explorar Mundo Interior"
</div>

<br><br>

<div class="button-container">

  <a href="/ES/mundo-exterior.html" class="fancy-button">
    <div class="button-content">
      <img src="/assets/img/ES-inicio - representacion del mundo.gif" 
           alt="Obras de Representación del Mundo" loading="lazy">
      <p class="title">Representación del Mundo</p>
      <p class="subtitle">Obras que observan, retratan y reflexionan el mundo actual.</p>
    </div>
  </a>

  <a href="/ES/accion.html" class="fancy-button">
    <div class="button-content">
      <img src="/assets/img/index---gif--accion-en-el-mundo.gif" 
           alt="Obras de Acción en el Mundo" loading="lazy">
      <p class="title">Acción en el Mundo</p>
      <p class="subtitle">Prácticas de acción en el mundo, artes comunitarias, talleres, oficios y servicios culturales.</p>
    </div>
  </a>

  <a href="/ES/interior.html" class="fancy-button">
    <div class="button-content">
      <img src="/assets/img/ES-inicio---mundo-interior.gif" 
           alt="Exploración del Mundo Interior" loading="lazy">
      <p class="title">Mundo Interior</p>
      <p class="subtitle">Obra de exploracion personal y procesos dedicados a la introspección y el bienestar.</p>
    </div>
  </a>

</div>

<a href="/ES/exhibiciones.html" class="enlace">Ver más obras</a>

<br><br>
