---
layout: default-es
title: "Contacto"
permalink: /ES/contacto.html

---

  <!-- Título principal, usando la clase 'titulo' -->
  <div class="titulo">Contacto</div>


  <!-- Texto descriptivo, usando la clase 'parrafo' -->
  <div class="subtitulo">
    Consultas, colaboraciones, preguntas. 
      </div>

<br>
<p class="subtitulo2" style="margin-left: 3rem;">Completa el formulario a continuación:</p>
<form class="contact-form" 
      action="https://formsubmit.co/e.garnicasanchez@gmail.com" 
      method="POST">
  
  <!-- Campos del formulario -->


  <label for="name">Nombre:</label>
  <input type="text" id="name" name="name" required placeholder="Tu nombre">

  <label for="email">Correo Electrónico:</label>
  <input type="email" id="email" name="email" required placeholder="Tu correo electrónico">

  <label for="message">Mensaje:</label>
  <textarea id="message" name="message" rows="5" required placeholder="Tu mensaje"></textarea>

  <!-- Botón de envío -->
  <button type="submit">Enviar</button>

  <!-- Campos ocultos opcionales para configurar el formulario -->
  <!-- _next: URL absoluta de tu página de agradecimiento -->
  <input type="hidden" name="_next" value="https://eggs-artesvisuales.github.io/ES/gracias.html">
  <!-- _captcha: Desactiva la verificación -->
  <input type="hidden" name="_captcha" value="false">
</form>
<br><br><br>
