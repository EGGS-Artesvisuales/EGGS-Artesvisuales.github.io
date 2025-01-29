---
layout: default-es
title: Mecenas
description: "Explora proyectos en desarrollo y apoya su financiamiento."
permalink: /ES/mecenas.html
---
<div class="titulo">Mecenas de EGGS-Studio</div>

<div class="subtitulo">Contribuye al desarrollo de proyectos artísticos y culturales.</div>

<!-- Párrafo 1 -->
<p class="parrafo" style="margin-top: 6%;">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aquí puedes explorar proyectos en desarrollo que necesitan financiamiento para su realización. Tu apoyo permite la creación de nuevas obras, exposiciones y experiencias artísticas que enriquecen nuestra comunidad.
</p>

<!-- Párrafo 2 -->
<p class="parrafo">
  Cada proyecto tiene una meta de financiamiento. Puedes contribuir con el monto que desees y seguir el progreso de cada iniciativa. Juntos podemos hacer realidad estas propuestas.
</p>

<div class="subtitulo" style="margin-top: 4%;">Proyectos en Financiación</div>
<br>

<div class="proyecto-container">
  <div class="proyecto" data-meta="10000000" data-recaudado="4000000">
    <h3>Murales Comunitarios 2025</h3>
    <p>Un proyecto de intervención artística en espacios públicos, en colaboración con comunidades locales.</p>
    <img src="/assets/img/murales-comunitarios.jpg" alt="Murales Comunitarios">
    <video controls>
      <source src="/assets/videos/murales-comunitarios.mp4" type="video/mp4">
      Tu navegador no soporta videos.
    </video>
    <div class="barra-progreso">
      <div class="progreso"></div>
    </div>
    <p class="meta">$<span class="recaudado">4,000,000</span> CLP de $10,000,000 CLP recaudados</p>
    <p class="fecha">Fecha límite: 31 de diciembre de 2025</p>
    <a href="#" class="fancy-button">Apoyar este proyecto</a>
    <br>
    <form action="https://www.paypal.com/donate" method="post" target="_blank">
      <input type="hidden" name="business" value="TU-CUENTA-PAYPAL">
      <input type="hidden" name="item_name" value="Murales Comunitarios 2025">
      <input type="hidden" name="currency_code" value="CLP">
      <input type="submit" value="Donar con PayPal" class="paypal-button">
    </form>
  </div>
</div>

<div class="proyecto-container">
  <div class="proyecto" data-meta="5000000" data-recaudado="1250000">
    <h3>Exposición "Memoria y Futuro"</h3>
    <p>Una exhibición de arte contemporáneo con realidad aumentada y experiencias interactivas.</p>
    <img src="/assets/img/memoria-futuro.jpg" alt="Exposición Memoria y Futuro">
    <video controls>
      <source src="/assets/videos/memoria-futuro.mp4" type="video/mp4">
      Tu navegador no soporta videos.
    </video>
    <div class="barra-progreso">
      <div class="progreso"></div>
    </div>
    <p class="meta">$<span class="recaudado">1,250,000</span> CLP de $5,000,000 CLP recaudados</p>
    <p class="fecha">Fecha límite: 30 de junio de 2025</p>
    <a href="#" class="fancy-button">Apoyar este proyecto</a>
    <br>
    <form action="https://www.paypal.com/donate" method="post" target="_blank">
      <input type="hidden" name="business" value="TU-CUENTA-PAYPAL">
      <input type="hidden" name="item_name" value="Exposición Memoria y Futuro">
      <input type="hidden" name="currency_code" value="CLP">
      <input type="submit" value="Donar con PayPal" class="paypal-button">
    </form>
  </div>
</div>

<a href="proyectos-completados.html" class="enlace">Ver proyectos completados</a>
<br><br>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".proyecto").forEach(proyecto => {
      let meta = parseInt(proyecto.dataset.meta);
      let recaudado = parseInt(proyecto.dataset.recaudado);
      let porcentaje = (recaudado / meta) * 100;
      proyecto.querySelector(".progreso").style.width = porcentaje + "%";
    });
  });
</script>

