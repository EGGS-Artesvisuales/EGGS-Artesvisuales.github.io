---
layout: default-mpd
lang: arn
title: "Esteban Garnica / EGGS-Studio – Küdaw ka proyecto"
description: "Esteban Garnica ñi universo creativo: pintura, fotografía, intervención, trafkintuam küdaw ka territorio mew proyecto."
permalink: /MPD/index.html
keywords: "Esteban Garnica, EGGS-Studio, pintura, fotografía, intervención, muralismo, küdaw, territorio"
image: /assets/img/pes-pint-produccion-Serie01-004.jpg
---

<link rel="stylesheet" href="/assets/css/home-editorial.css">

{% assign producto_paisaje = site.productos_mpd | where: "sku", "EGGS-W0008-L01-P5070-F70100" | first %}
{% assign producto_bandera = site.productos_mpd | where: "sku", "EGGS-W0017-L01-P5070-F70100" | first %}
{% assign producto_colgado = site.productos_mpd | where: "sku", "EGGS-W0056-L01-P110160-F120170" | first %}

<div class="home-editorial">
  <section class="home-hero" aria-labelledby="home-title">
    <div class="home-hero__copy">
      <p class="home-kicker">Esteban Garnica / EGGS-Studio</p>
      <h1 id="home-title" class="home-hero__title">Esteban Garnica ñi universo creativo.</h1>
      <p class="home-hero__lead">Pintura, fotografía, intervención ka territorio mew proyecto.</p>
      <div class="home-actions"><a href="/MPD/tienda.html#impresiones-y-fotografia" class="home-button home-button--primary">Küdaw ngillan</a><a href="/MPD/obra.html" class="home-button home-button--secondary">Küdaw adkintun</a></div>
      <a href="/MPD/servicios.html" class="home-text-link">Encargo, mural ka cultura proyecto</a>
    </div>
    <figure class="home-hero__media"><img src="/assets/img/pes-pint-produccion-Serie01-004.jpg" alt="Esteban Garnica ñi küdaw" fetchpriority="high"><figcaption>Pintura, archivo, territorio ka fachi antü ñi visual cultura.</figcaption></figure>
  </section>

  <section class="home-section" aria-labelledby="kudaw-muley">
    <header class="home-section__header"><div><p class="home-section__eyebrow">Trafkintuam colección</p><h2 id="kudaw-muley">Mülechi küdaw</h2></div><p class="home-section__intro">Küla rüf producto tienda mew. Ficha kom kimelkey técnica, medida, edición, certificado ka ngillan ñi felen.</p></header>
    <div class="home-products">
      <article class="home-product"><a class="home-product__link" href="{{ producto_paisaje.url }}"><div class="home-product__image"><img src="{{ producto_paisaje.image }}" alt="{{ producto_paisaje.title }}" loading="lazy"></div><div class="home-product__body"><p class="home-product__type">{{ producto_paisaje.product_type }}</p><h3>{{ producto_paisaje.title }}</h3><dl class="home-product__facts"><dt>Tripantu</dt><dd>{{ producto_paisaje.year }}</dd><dt>Técnica</dt><dd class="home-product__technique">{{ producto_paisaje.presentation }}</dd><dt>Edición</dt><dd>{{ producto_paisaje.edition }}</dd></dl><div class="home-product__footer"><span class="home-product__price">{{ producto_paisaje.price_display }}</span><span class="home-product__state">{{ producto_paisaje.state }}</span></div></div></a></article>
      <article class="home-product"><a class="home-product__link" href="{{ producto_bandera.url }}"><div class="home-product__image"><img src="{{ producto_bandera.image }}" alt="{{ producto_bandera.title }}" loading="lazy"></div><div class="home-product__body"><p class="home-product__type">{{ producto_bandera.product_type }}</p><h3>{{ producto_bandera.title }}</h3><dl class="home-product__facts"><dt>Tripantu</dt><dd>{{ producto_bandera.year }}</dd><dt>Técnica</dt><dd class="home-product__technique">{{ producto_bandera.presentation }}</dd><dt>Edición</dt><dd>{{ producto_bandera.edition }}</dd></dl><div class="home-product__footer"><span class="home-product__price">{{ producto_bandera.price_display }}</span><span class="home-product__state">{{ producto_bandera.state }}</span></div></div></a></article>
      <article class="home-product"><a class="home-product__link" href="{{ producto_colgado.url }}"><div class="home-product__image"><img src="{{ producto_colgado.image }}" alt="{{ producto_colgado.title }}" loading="lazy"></div><div class="home-product__body"><p class="home-product__type">{{ producto_colgado.product_type }}</p><h3>{{ producto_colgado.title }}</h3><dl class="home-product__facts"><dt>Tripantu</dt><dd>{{ producto_colgado.year }}</dd><dt>Técnica</dt><dd class="home-product__technique">{{ producto_colgado.presentation }}</dd><dt>Edición</dt><dd>{{ producto_colgado.edition }}</dd></dl><div class="home-product__footer"><span class="home-product__price">{{ producto_colgado.price_display }}</span><span class="home-product__state">{{ producto_colgado.state }}</span></div></div></a></article>
    </div>
    <div class="home-section__footer"><a href="/MPD/tienda.html#impresiones-y-fotografia" class="home-text-link">Kom mülechi küdaw adkintun</a></div>
  </section>

  <section class="home-section" aria-labelledby="series">
    <header class="home-section__header"><div><p class="home-section__eyebrow">Visual ramtun</p><h2 id="series">Dullin series</h2></div><p class="home-section__intro">Pintura ñi amulnien, paisaje adkintun ka visual cultura mew crítica intervención.</p></header>
    <div class="home-series-grid">
      <a href="/MPD/serie-pinturas-infectadas.html" class="home-series-card home-series-card--main"><img src="/assets/img/pes-pint-produccion-Serie01-000b.jpg" alt="Pinturas Infectadas" loading="lazy"><div class="home-series-card__copy"><h3>Pinturas Infectadas</h3><p>Pintura organismo, kutxan superficie ka alün antü ñi wiñol az.</p></div></a>
      <a href="/MPD/serie-paisajes-carretera.html" class="home-series-card"><img src="/assets/img/tienda/EGGS-W0008-L01-P5070-F70100.webp" alt="Paisajes de Carretera" loading="lazy"><div class="home-series-card__copy"><h3>Paisajes de Carretera</h3><p>Rüpü, lefün ka territorio ñi visual memoria.</p></div></a>
      <a href="/MPD/serie-antipublicidad.html" class="home-series-card"><img src="/assets/img/boton-antipub.webp" alt="Antipublicidad" loading="lazy"><div class="home-series-card__copy"><h3>Antipublicidad</h3><p>Comercial zugu ñi apropiación, kakülün ka intervención.</p></div></a>
    </div>
    <div class="home-section__footer"><a href="/MPD/obra.html" class="home-text-link">Kom series adkintun</a></div>
  </section>

  <section class="home-section" aria-labelledby="kula-rupu"><header class="home-section__header"><div><p class="home-section__eyebrow">Curatorial mapa</p><h2 id="kula-rupu">Küla küdaw rüpü</h2></div><p class="home-section__intro">Mapu adkintun, mapu mew küdaw ka ponwi püle ñi dungun kintun.</p></header><div class="home-axes">
    <a href="/MPD/mundo-exterior.html" class="home-axis"><div class="home-axis__image"><img src="/assets/img/ES-inicio - representacion del mundo.webp" alt="Wallmapu ñi azentun" loading="lazy"></div><div class="home-axis__copy"><h3>Wallmapu ñi azentun</h3><p>Paisaje, chemkün, visual cultura ka fachi antü ñi zugu.</p></div></a>
    <a href="/MPD/accion.html" class="home-axis"><div class="home-axis__image"><img src="/assets/img/index---gif--accion-en-el-mundo.webp" alt="Mapu mew küdaw" loading="lazy"></div><div class="home-axis__copy"><h3>Mapu mew küdaw</h3><p>Waria intervención, lof, kelluwün ka kom püle.</p></div></a>
    <a href="/MPD/interior.html" class="home-axis"><div class="home-axis__image"><img src="/assets/img/ES-inicio---mundo-interior.webp" alt="Püle rakizuam" loading="lazy"></div><div class="home-axis__copy"><h3>Püle rakizuam</h3><p>Kalül, memoria, rito, imaginación ka ponwi rüpü.</p></div></a>
  </div></section>

  <section class="home-section" aria-labelledby="proyecto"><div class="home-project-band"><header class="home-project-band__header"><div><p class="home-section__eyebrow">Az-küdaw ka territorio</p><h2 id="proyecto">Proyecto ka kelluwün</h2></div><p>Kom püle, institución, lof, equipo ka private colección mew visual proyecto.</p></header><div class="home-projects">
    <a href="/MPD/servicios.html#encargos" class="home-project"><span class="home-project__number">01</span><span class="home-project__title">Murales</span><span class="home-project__description">Mapu mew küdaw, identidad ka püle ñi wiñol az.</span></a>
    <a href="/MPD/servicios.html#talleres" class="home-project"><span class="home-project__number">02</span><span class="home-project__title">Talleres</span><span class="home-project__description">Kimeltun, mediación ka creative experiencia.</span></a>
    <a href="/MPD/servicios.html#restauracion" class="home-project"><span class="home-project__number">03</span><span class="home-project__title">Restauración</span><span class="home-project__description">Chemkün ka az ñi kuñiwtun ka wiñol dewman.</span></a>
    <a href="/MPD/comunitario.html" class="home-project"><span class="home-project__number">04</span><span class="home-project__title">Lof proyecto</span><span class="home-project__description">Territorio mew txawün ka kelluwün rüpü.</span></a>
  </div><a href="/MPD/servicios.html" class="home-text-link">Servicio ka kelluwün adkintun</a></div></section>

  <section class="home-section home-about" aria-labelledby="esteban"><figure class="home-about__media"><img src="/assets/img/esteban-garnica2.jpg" alt="Esteban Garnica" loading="lazy"></figure><div class="home-about__copy"><p class="home-section__eyebrow">Artista mew</p><h2 id="esteban">Esteban Garnica</h2><p>Chile ñi visual artista, Santiago mew 1985 txipantu mew llellipun ka Universidad de Chile mew kimün nielu. Ñi küdaw pintura, fotografía, waria intervención, muralismo ka lof proceso mew amuley, territorio, memoria, visual cultura ka fachi antü ñi mogen ramtulelu.</p><div class="home-about__links"><a href="/MPD/garnica.html" class="home-text-link">Artista ñi nütram</a><a href="/MPD/exhibiciones.html" class="home-text-link">Trayectoria ka exhibiciones</a></div></div></section>

  <section class="home-closing" aria-labelledby="afpun"><h2 id="afpun">¿Küdaw kintuleymi kam proyecto dewmalmi?</h2><div class="home-actions"><a href="/MPD/tienda.html#impresiones-y-fotografia" class="home-button home-button--primary">Mülechi küdaw adkintun</a><a href="/MPD/contacto.html" class="home-button home-button--secondary">Nütramkan</a></div></section>
</div>
