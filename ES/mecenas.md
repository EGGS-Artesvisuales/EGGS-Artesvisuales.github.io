---
layout: default-es
title: Mecenas
description: "Explora proyectos en desarrollo y apoya su financiamiento."
permalink: /ES/mecenas.html
---

<div class="titulo">Conviértete en mecenas del Arte actual</div>

<div class="subtitulo">Contribuye al desarrollo de proyectos artísticos y culturales.</div>

<!-- Párrafo 1 -->
<p class="parrafo" style="margin-top: 6%;">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Explora estas ideas en progreso; tu apoyo permite la creación de nuevas obras y experiencias artísticas.
  
</p>

<!-- Párrafo 2 -->
<p class="parrafo">
 Puedes contribuir con el monto que desees y seguir el progreso de cada iniciativa. ¡Juntos podemos hacer realidad estas propuestas!
</p>

<div class="subtitulo" style="margin-top: 4%;">Propuestas;</div>
<br>

<div class="proyecto-container">
  <div class="proyecto" data-meta="10000000" data-recaudado="9000000">
    <h3>Murales Comunitarios 2025</h3>
    <p class="parrafo">Un proyecto de intervención artística en espacios públicos, en colaboración con comunidades locales.</p>
    <img src="/assets/img/murales-comunitarios.jpg" alt="Murales Comunitarios">
    <video controls>
      <source src="/assets/videos/murales-comunitarios.mp4" type="video/mp4">
      Tu navegador no soporta videos.
    </video>
    <div class="barra-progreso">
      <div class="progreso"></div>
    </div>
    <p class="parrafo meta">$<span class="recaudado">4,000,000</span> CLP de $10,000,000 CLP recaudados</p>
    <p class="parrafo fecha">Fecha límite: 31 de diciembre de 2025</p>
   <!-- Botón de donación unificado -->
<form action="https://www.paypal.com/ncp/payment/GX4V3R9TEHJ5G" method="post" target="_blank">
  <input type="submit" value="Apoyar este proyecto" class="paypal-donation-button">
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


