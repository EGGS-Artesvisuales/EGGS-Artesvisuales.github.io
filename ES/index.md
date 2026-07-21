---
layout: default-es
lang: es
title: "EGGS-Studio – Inicio"
description: "EGGS-Studio: obra, prints, fotografía, muralismo y proyectos visuales de Esteban Garnica. Ediciones limitadas, encargos y servicios artísticos desde Santiago de Chile."
permalink: /ES/index.html
keywords: "EGGS-Studio, Esteban Garnica, arte contemporáneo Chile, prints de arte, fotografía, muralismo, obras disponibles, encargos, Santiago de Chile"
mermaid: true
carousel: true

---
<h1 class="titulo">EGGS-STUDIO</h1>

<h2 class="subtitulo">
  Obra, prints y proyectos visuales de Esteban Garnica.
</h2>

<p class="parrafo" style="margin-top: 5%;">
  EGGS-Studio reúne pintura, fotografía, muralismo e intervenciones sobre ciudad, publicidad, territorio y vida cotidiana. Aquí puedes explorar el cuerpo de obra, comprar ediciones disponibles y solicitar proyectos o encargos artísticos.
</p>

<div class="button-container">
  <a href="/ES/tienda.html#impresiones-y-fotografia" class="fancy-button">
    <div class="button-content">
      <img src="/assets/img/pinf-blds-upg-retr-003b.jpg" alt="Prints y fotografía disponibles" loading="lazy">
      <p class="title">Comprar obra</p>
      <p class="subtitle">Prints y fotografía de edición limitada, firmados, numerados y certificados.</p>
    </div>
  </a>

  <a href="/ES/contacto.html" class="fancy-button">
    <div class="button-content">
      <img src="/assets/img/index---gif--accion-en-el-mundo.webp" alt="Encargos, murales y proyectos" loading="lazy">
      <p class="title">Encargar proyecto</p>
      <p class="subtitle">Murales, cuadros, restauración, talleres, montajes y proyectos culturales.</p>
    </div>
  </a>

  <a href="/ES/mundo-exterior.html" class="fancy-button">
    <div class="button-content">
      <img src="/assets/img/ES-inicio - representacion del mundo.webp" alt="Explorar universo de obra" loading="lazy">
      <p class="title">Explorar obra</p>
      <p class="subtitle">Pintura, fotografía, intervención urbana, comunidad y mundo interior.</p>
    </div>
  </a>
</div>

<figure class="imagen-con-caption">
  <img src="/assets/img/pinf-blds-upg-retr-003b.jpg" alt="Pinturas Infectadas, soportes blandos, página única, retratos" loading="lazy">
  <figcaption>La Saturación / La Peste / Pinturas Infectadas, soportes blandos, página única, retratos, st003. 2020.</figcaption>
</figure>

<hr class="separador separador--aire" />

<h2 class="subtitulo">Mapa de obra</h2>

<p class="parrafo">
  El sitio se ordena como un mapa curatorial simple: representación del mundo, acción en el mundo y mundo interior. El diagrama mantiene la profundidad conceptual sin reemplazar la navegación principal.
</p>

<div class="mermaid">
flowchart LR
  principal(("EGGS-Studio"))
  tienda(["Obras disponibles"])
  servicios(["Encargos y servicios"])
  mapa(["Mapa de obra"])

  principal --> tienda
  principal --> servicios
  principal --> mapa

  mapa --> representacion(["Representación del mundo"])
  mapa --> accion(["Acción en el mundo"])
  mapa --> interior(["Mundo interior"])

  click tienda "/ES/tienda.html#impresiones-y-fotografia" "Ir a obras disponibles"
  click servicios "/ES/servicios.html" "Ir a servicios"
  click representacion "/ES/mundo-exterior.html" "Ir a Representación del mundo"
  click accion "/ES/accion.html" "Ir a Acción en el mundo"
  click interior "/ES/interior.html" "Ir a Mundo interior"
</div>

<p class="parrafo" style="margin-top: 7%;">
  Si llegas por primera vez, empieza por la tienda o por las series principales. Si quieres entender la estructura completa de la obra, recorre el mapa conceptual y sus ejes.
</p>

<a href="/ES/exhibiciones.html" class="enlace">Ver exhibiciones y trayectoria</a>
