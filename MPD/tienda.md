---
layout: default-mpd
lang: arn
title: "Trafkintu – Az-küdaw original y productos de EGGS-Studio"
description: "Ngen küdaw trafkintu, impresiones, objetos az-küdaws y productos exclusivos de EGGS-Studio, creados por el artista azentun Esteban Garnica."
permalink: /MPD/tienda.html
keywords: "tienda de arte, arte original, impresiones az-küdaws, productos de arte, EGGS-Studio, Esteban Garnica, comprar arte"
---

<h1 class="titulo">Trafkintu EGGS-Studio</h1>

<h2 class="subtitulo">Prints, cuadro ka pichi ediciones</h2>

<p class="parrafo" style="margin-top: 6%;">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;En esta sección encontrarás una selección de obras y productos disponibles para compra. Cada pieza forma parte de mi universo az-küdaw y ha sido realizada con dedicación, buscando ofrecer alternativas accesibles para quienes desean convivir con la obra en sus püles cotidianos.
</p>

<p class="parrafo">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Si te interesa alguna pieza en formato distinto (otro tamaño, enmarcado, serie limitada o encargo específico), puedes escribirme directamente y vemos juntos la mejor opción según tus necesidades.
</p>

<div class="productos-container">
  <div class="producto">
    <img src="/assets/img/lo-invisible-pintura-wifi-01-001.jpg" alt="Impresión az-küdaw 1" loading="lazy">
    <p class="title">Impresión Artística 1</p>
    <p class="subtitle">Impresión en papel de alta calidad. Tamaño aproximado: 30 × 40 cm.</p>
    <p class="precio">$25.000 CLP</p>
    <button class="boton-compra" onclick="comprar('Impresión Artística 1')">Trafkintu</button>
  </div>

  <div class="producto">
    <img src="/assets/img/la-peste---pintura01.jpg" alt="Cuadro enmarcado" loading="lazy">
    <p class="title">Cuadro Enmarcado</p>
    <p class="subtitle">Óleo sobre tela con marco de madera. Tamaño aproximado: 50 × 70 cm.</p>
    <p class="precio">$120.000 CLP</p>
    <button class="boton-compra" onclick="comprar('Cuadro Enmarcado')">Trafkintu</button>
  </div>

  <div class="producto">
    <img src="/assets/img/imagenes-del-capitalismo.webp" alt="Colección de postales" loading="lazy">
    <p class="title">Colección de Postales</p>
    <p class="subtitle">Set de 5 postales con distintas obras seleccionadas.</p>
    <p class="precio">$10.000 CLP</p>
    <button class="boton-compra" onclick="comprar('Colección de Postales')">Trafkintu</button>
  </div>
</div>

<a href="/MPD/contacto.html" class="enlace">Doy küdaw ka formato ramtu</a>

<script>
  function comprar(producto) {
    alert('Redirigiendo a la pasarela de pago para: ' + producto);
    // Aquí puedes integrar con WebPay, MercadoPago o PayPal
  }
</script>
