---
layout: default-en
title: "Contact"
permalink: /EN/contact.html
---

<!-- Main Title, using the 'titulo' class -->
<div class="titulo">Contact</div>

<!-- Descriptive text, using the 'subtitulo' class -->
<div class="subtitulo">
    Inquiries, collaborations, questions.
</div>

<br>
<p class="subtitulo2" style="margin-left: 3rem;">Fill out the form below:</p>
<form class="contact-form" 
      action="https://formsubmit.co/e.garnicasanchez@gmail.com" 
      method="POST">
  
  <!-- Form fields -->

  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required placeholder="Your name">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required placeholder="Your email">

  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="5" required placeholder="Your message"></textarea>

  <!-- Submit button -->
  <button type="submit">Send</button>

  <!-- Optional hidden fields to configure the form -->
  <!-- _next: Absolute URL of your thank you page -->
  <input type="hidden" name="_next" value="https://eggs-artesvisuales.github.io/EN/thankyou.html">
  <!-- _captcha: Disable verification -->
  <input type="hidden" name="_captcha" value="false">
</form>
<br><br><br>

