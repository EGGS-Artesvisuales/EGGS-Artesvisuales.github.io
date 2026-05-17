---
layout: default-chn
lang: zh-Hans
title: "商店"
description: "EGGS-Studio 中文页面：商店。"
permalink: /CHN/tienda.html
es_url: /ES/tienda.html
en_url: /EN/under-construction.html
mpd_url: /MPD/tienda.html
keywords: "EGGS-Studio, Esteban Garnica, 视觉艺术, 壁画, 社区艺术, 智利"
---


<h1 class="titulo">EGGS-Studio 商店</h1>

<h2 class="subtitulo">版画、绘画和限量版</h2>

<p class="parrafo" style="margin-top: 6%;">
        在此部分中，您将找到一系列可供购买的作品和产品。每一件作品都是我艺术世界的一部分，都是我精心制作的，旨在为那些希望在日常空间中与作品共存的人提供易于使用的替代品。
</p>

<p class="parrafo">
        如果您对不同格式的作品（其他尺寸、装框、限量系列或特定订单）感兴趣，您可以直接写信给我，我们将根据您的需求一起找到最佳选择。
</p>

<div class="productos-container">
  <div class="producto">
    <img src="/assets/img/lo-invisible-pintura-wifi-01-001.jpg" alt="Impresión artística 1" loading="lazy">
    <p class="title">艺术印刷品1</p>
    <p class="subtitle">采用优质纸张印刷。大约尺寸：30 × 40 厘米。</p>
    <p class="precio">$25,000 智利比索</p>
    <button class="boton-compra" onclick="comprar('Impresión Artística 1')">买</button>
  </div>

  <div class="producto">
    <img src="/assets/img/la-peste---pintura01.jpg" alt="Cuadro enmarcado" loading="lazy">
    <p class="title">带框图片</p>
    <p class="subtitle">布面油画，带木框。大约尺寸：50 × 70 厘米。</p>
    <p class="precio">$120,000 智利比索</p>
    <button class="boton-compra" onclick="comprar('Cuadro Enmarcado')">买</button>
  </div>

  <div class="producto">
    <img src="/assets/img/imagenes-del-capitalismo.webp" alt="Colección de postales" loading="lazy">
    <p class="title">明信片收藏</p>
    <p class="subtitle">一套 5 张明信片，上面有不同的精选作品。</p>
    <p class="precio">$10,000 智利比索</p>
    <button class="boton-compra" onclick="comprar('Colección de Postales')">买</button>
  </div>
</div>

<a href="/CHN/contacto.html" class="enlace">更多作品或格式请咨询</a>

<script>
  function comprar(producto) {
    alert('Redirigiendo a la pasarela de pago para: ' + producto);
    // Aquí puedes integrar con WebPay, MercadoPago o PayPal
  }
</script>
