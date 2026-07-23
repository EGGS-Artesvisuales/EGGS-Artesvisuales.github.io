---
layout: default-en
title: "Contact – EGGS-Studio"
description: "Contact Esteban Garnica / EGGS-Studio to buy artwork, request commissions, restoration, workshops, teaching, installation projects or cultural collaborations."
keywords: "EGGS-Studio contact, buy artwork Esteban Garnica, mural commission, art restoration, art workshops, Chile"
permalink: /EN/contact.html
---

<h1 class="titulo">Contact</h1>

<h2 class="subtitulo">Artwork purchases, quotes, commissions and collaborations</h2>

<p class="parrafo">
  Use this form to buy an artwork, check availability, request a quote, ask about restoration, propose a workshop or start a cultural collaboration. A precise message makes the response faster.
</p>

<div class="button-container">
  <a href="/EN/store.html#impresiones-y-fotografia" class="fancy-button"><div class="button-content"><img src="/assets/img/pinf-blds-upg-retr-003b.jpg" alt="Buy artwork" loading="lazy"><p class="title">Buy artwork</p><p class="subtitle">Prints, photography and available editions.</p></div></a>
  <a href="/EN/services.html" class="fancy-button"><div class="button-content"><img src="/assets/img/encargos-boton.webp" alt="Request a quote" loading="lazy"><p class="title">Request a quote</p><p class="subtitle">Murals, commissions, restoration and installs.</p></div></a>
  <a href="/EN/teaching.html" class="fancy-button"><div class="button-content"><img src="/assets/img/index---gif--accion-en-el-mundo.webp" alt="Workshops and teaching" loading="lazy"><p class="title">Workshops and teaching</p><p class="subtitle">Education, mediation and community processes.</p></div></a>
</div>

<div class="service-cta">
  <h2 class="subtitulo2">What to include</h2>
  <p class="parrafo">
    For purchases: artwork title or SKU. For quotes: location, approximate measurements, photos, tentative date, budget range and project goal. For workshops: audience, duration, venue, number of participants and available materials.
  </p>
</div>

<form class="contact-form" name="contact-en" action="/EN/thankyou.html" method="POST" data-netlify="true" netlify-honeypot="bot-field" data-contact-lang="en">
  <input type="hidden" name="form-name" value="contact-en">
  <p hidden><label>Leave empty: <input name="bot-field"></label></p>

  <label for="name">Name:</label>
  <input type="text" id="name" name="name" autocomplete="name" required placeholder="Your name">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" autocomplete="email" required placeholder="Your email">

  <label for="topic">Topic:</label>
  <select id="topic" name="topic" required>
    <option value="">Select one option</option>
    <option value="Artwork purchase">Artwork purchase</option>
    <option value="Commission or mural">Commission or mural</option>
    <option value="Restoration">Restoration</option>
    <option value="Workshops and teaching">Workshops and teaching</option>
    <option value="Installation or atmosphere">Installation or atmosphere</option>
    <option value="Press or collaboration">Press or collaboration</option>
  </select>

  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="7" required placeholder="Tell me what you need, where, when, and which references or measurements you already have."></textarea>

  <button type="submit">Send inquiry</button>
</form>

<script src="/assets/js/contact-product.js" defer></script>
<br><br><br>
