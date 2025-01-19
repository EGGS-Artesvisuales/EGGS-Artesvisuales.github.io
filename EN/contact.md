---
layout: default-en
title: "Contact"
permalink: /EN/contact.html
breadcrumbs: >
  <a href="/EN/index.html">Home</a> >
  <span>Contact</span>
---
<div class="text-container">
  <!-- Título principal -->
  <div class="titulo">Contact</div>

  <!-- Párrafo descriptivo -->
  <p class="parrafo">
    Get in touch for inquiries, collaborations, or any questions. 
    Please fill out the form below:
  </p>
</div>

<form class="contact-form" 
      action="https://formsubmit.co/e.garnicasanchez@gmail.com" 
      method="POST">
  
  <!-- Campos del formulario -->
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required placeholder="Your name">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required placeholder="Your email address">

  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="5" required placeholder="Your message"></textarea>

  <!-- Botón de envío -->
  <button type="submit">Send</button>

  <!-- Campos ocultos que NO cambian -->
  <input type="hidden" name="_next" value="https://eggs-artesvisuales.github.io/EN/thamkyou.html)">
  <input type="hidden" name="_captcha" value="false">
</form>
