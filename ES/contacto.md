---
layout: default-es
title: "Contacto – EGGS-Studio"
description: "Contacta a Esteban Garnica / EGGS-Studio para comprar obra, cotizar encargos, restauración, talleres, docencia, montajes o colaboraciones culturales."
keywords: "contacto EGGS-Studio, comprar obra Esteban Garnica, cotizar mural, restauración de arte, talleres de arte, proyectos artísticos Chile"
permalink: /ES/contacto.html
---

<h1 class="titulo">Contacto</h1>

<h2 class="subtitulo">Compra, cotizaciones, encargos y colaboraciones</h2>

<p class="parrafo">
  Usa este formulario para comprar una obra, consultar disponibilidad, cotizar un proyecto, solicitar restauración, proponer un taller o abrir una colaboración cultural. Mientras más claro sea el mensaje, más rápida será la respuesta.
</p>

<div class="button-container">
  <a href="/ES/tienda.html#impresiones-y-fotografia" class="fancy-button"><div class="button-content"><img src="/assets/img/pinf-blds-upg-retr-003b.jpg" alt="Comprar obra" loading="lazy"><p class="title">Comprar obra</p><p class="subtitle">Prints, fotografía y ediciones disponibles.</p></div></a>
  <a href="/ES/servicios.html" class="fancy-button"><div class="button-content"><img src="/assets/img/encargos-boton.webp" alt="Cotizar proyecto" loading="lazy"><p class="title">Cotizar proyecto</p><p class="subtitle">Murales, encargos, restauración y montajes.</p></div></a>
  <a href="/ES/docencia.html" class="fancy-button"><div class="button-content"><img src="/assets/img/index---gif--accion-en-el-mundo.webp" alt="Talleres y docencia" loading="lazy"><p class="title">Talleres y docencia</p><p class="subtitle">Formación, mediación y procesos comunitarios.</p></div></a>
</div>

<div class="service-cta">
  <h2 class="subtitulo2">Qué incluir en tu mensaje</h2>
  <p class="parrafo">
    Para compra: nombre de la obra o SKU. Para cotización: ubicación, medidas, fotos, fecha tentativa, presupuesto aproximado y objetivo del proyecto. Para talleres: público, duración, lugar, cantidad de participantes y materiales disponibles.
  </p>
</div>

<form class="contact-form" name="contact-es" action="/ES/gracias.html" method="POST" data-netlify="true" netlify-honeypot="bot-field" data-contact-lang="es">
  <input type="hidden" name="form-name" value="contact-es">
  <p hidden><label>No completar: <input name="bot-field"></label></p>

  <label for="name">Nombre:</label>
  <input type="text" id="name" name="name" autocomplete="name" required placeholder="Tu nombre">

  <label for="email">Correo electrónico:</label>
  <input type="email" id="email" name="email" autocomplete="email" required placeholder="Tu correo electrónico">

  <label for="topic">Motivo:</label>
  <select id="topic" name="topic" required>
    <option value="">Selecciona una opción</option>
    <option value="Compra de obra">Compra de obra</option>
    <option value="Encargo o mural">Encargo o mural</option>
    <option value="Restauración">Restauración</option>
    <option value="Talleres y docencia">Talleres y docencia</option>
    <option value="Montaje o ambientación">Montaje o ambientación</option>
    <option value="Prensa o colaboración">Prensa o colaboración</option>
  </select>

  <label for="message">Mensaje:</label>
  <textarea id="message" name="message" rows="7" required placeholder="Cuéntame qué necesitas, dónde, cuándo y con qué referencias o medidas cuentas."></textarea>

  <button type="submit">Enviar consulta</button>
</form>

<script src="/assets/js/contact-product.js" defer></script>

<br><br><br>
