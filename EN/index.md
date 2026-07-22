---
layout: default-en
lang: en
title: "Esteban Garnica / EGGS-Studio – Artworks and projects"
description: "Esteban Garnica's creative universe: painting, photography, intervention, available artworks and cultural projects developed from Santiago, Chile."
permalink: /EN/index.html
keywords: "Esteban Garnica, EGGS-Studio, Chilean visual artist, painting, photography, urban intervention, available art, muralism, cultural projects"
image: /assets/img/ES-inicio - representacion del mundo.webp
---

<link rel="stylesheet" href="/assets/css/home-editorial.css">

{% assign producto_paisaje = site.productos_en | where: "sku", "EGGS-W0008-L01-P5070-F70100" | first %}
{% assign producto_bandera = site.productos_en | where: "sku", "EGGS-W0017-L01-P5070-F70100" | first %}
{% assign producto_colgado = site.productos_en | where: "sku", "EGGS-W0056-L01-P110160-F120170" | first %}

<div class="home-editorial">
  <section class="home-hero" aria-labelledby="home-title">
    <div class="home-hero__copy">
      <p class="home-kicker">Esteban Garnica / EGGS-Studio</p>
      <h1 id="home-title" class="home-hero__title">Esteban Garnica's creative universe.</h1>
      <p class="home-hero__lead">Painting, photography, intervention and territory-based projects.</p>
      <div class="home-actions" aria-label="Primary actions"><a href="/EN/store.html#impresiones-y-fotografia" class="home-button home-button--primary">Buy artwork</a><a href="/EN/work.html" class="home-button home-button--secondary">Explore the work</a></div>
      <a href="/EN/services.html" class="home-text-link">Commissions, murals and cultural projects</a>
    </div>
    <figure class="home-hero__media"><img src="/assets/img/ES-inicio - representacion del mundo.webp" alt="Artwork by Esteban Garnica related to the representation of the world" fetchpriority="high"><figcaption>A practice crossing painting, archive, territory and contemporary visual culture.</figcaption></figure>
  </section>

  <section class="home-section" aria-labelledby="available-artworks">
    <header class="home-section__header"><div><p class="home-section__eyebrow">Available collection</p><h2 id="available-artworks">Available artworks</h2></div><p class="home-section__intro">Three real editions from the store. Each product page includes technique, dimensions, edition, certificate and purchase conditions.</p></header>
    <div class="home-products">
      <article class="home-product"><a class="home-product__link" href="{{ producto_paisaje.url }}"><div class="home-product__image"><img src="{{ producto_paisaje.image }}" alt="{{ producto_paisaje.title }}" loading="lazy"></div><div class="home-product__body"><p class="home-product__type">{{ producto_paisaje.product_type }}</p><h3>{{ producto_paisaje.title }}</h3><dl class="home-product__facts"><dt>Year</dt><dd>{{ producto_paisaje.year }}</dd><dt>Technique</dt><dd class="home-product__technique">{{ producto_paisaje.presentation }}</dd><dt>Edition</dt><dd>{{ producto_paisaje.edition }}</dd></dl><div class="home-product__footer"><span class="home-product__price">{{ producto_paisaje.price_display }}</span><span class="home-product__state">{{ producto_paisaje.state }}</span></div></div></a></article>
      <article class="home-product"><a class="home-product__link" href="{{ producto_bandera.url }}"><div class="home-product__image"><img src="{{ producto_bandera.image }}" alt="{{ producto_bandera.title }}" loading="lazy"></div><div class="home-product__body"><p class="home-product__type">{{ producto_bandera.product_type }}</p><h3>{{ producto_bandera.title }}</h3><dl class="home-product__facts"><dt>Year</dt><dd>{{ producto_bandera.year }}</dd><dt>Technique</dt><dd class="home-product__technique">{{ producto_bandera.presentation }}</dd><dt>Edition</dt><dd>{{ producto_bandera.edition }}</dd></dl><div class="home-product__footer"><span class="home-product__price">{{ producto_bandera.price_display }}</span><span class="home-product__state">{{ producto_bandera.state }}</span></div></div></a></article>
      <article class="home-product"><a class="home-product__link" href="{{ producto_colgado.url }}"><div class="home-product__image"><img src="{{ producto_colgado.image }}" alt="{{ producto_colgado.title }}" loading="lazy"></div><div class="home-product__body"><p class="home-product__type">{{ producto_colgado.product_type }}</p><h3>{{ producto_colgado.title }}</h3><dl class="home-product__facts"><dt>Year</dt><dd>{{ producto_colgado.year }}</dd><dt>Technique</dt><dd class="home-product__technique">{{ producto_colgado.presentation }}</dd><dt>Edition</dt><dd>{{ producto_colgado.edition }}</dd></dl><div class="home-product__footer"><span class="home-product__price">{{ producto_colgado.price_display }}</span><span class="home-product__state">{{ producto_colgado.state }}</span></div></div></a></article>
    </div>
    <div class="home-section__footer"><a href="/EN/store.html#impresiones-y-fotografia" class="home-text-link">See all available artworks</a></div>
  </section>

  <section class="home-section" aria-labelledby="selected-series"><header class="home-section__header"><div><p class="home-section__eyebrow">Visual research</p><h2 id="selected-series">Selected series</h2></div><p class="home-section__intro">Three ways into the work through expanded painting, observed landscape and critical intervention in visual culture.</p></header><div class="home-series-grid">
    <a href="/EN/infected-paintings-series.html" class="home-series-card home-series-card--main"><img src="/assets/img/pinf-blds-upg-retr-003b.jpg" alt="Infected Paintings series" loading="lazy"><div class="home-series-card__copy"><h3>Infected Paintings</h3><p>Painting as organism, vulnerable surface and transforming system.</p></div></a>
    <a href="/EN/roadside-landscapes-series.html" class="home-series-card"><img src="/assets/img/tienda/EGGS-W0008-L01-P5070-F70100.webp" alt="Roadside Landscapes series" loading="lazy"><div class="home-series-card__copy"><h3>Roadside Landscapes</h3><p>Transit, speed and the visual memory of territory.</p></div></a>
    <a href="/EN/anti-advertising-series.html" class="home-series-card"><img src="/assets/img/boton-antipub.webp" alt="Anti-advertising series" loading="lazy"><div class="home-series-card__copy"><h3>Anti-advertising</h3><p>Appropriation, diversion and intervention of commercial messages.</p></div></a>
  </div><div class="home-section__footer"><a href="/EN/work.html" class="home-text-link">See all series</a></div></section>

  <section class="home-section" aria-labelledby="work-axes"><header class="home-section__header"><div><p class="home-section__eyebrow">Curatorial map</p><h2 id="work-axes">Three axes of work</h2></div><p class="home-section__intro">The practice is organized through three complementary movements: observing the world, acting within it and exploring its inner resonance.</p></header><div class="home-axes">
    <a href="/EN/world-representation.html" class="home-axis"><div class="home-axis__image"><img src="/assets/img/ES-inicio - representacion del mundo.webp" alt="Representation of the world" loading="lazy"></div><div class="home-axis__copy"><h3>Representation of the world</h3><p>Landscape, objects, visual culture and contemporary phenomena.</p></div></a>
    <a href="/EN/action.html" class="home-axis"><div class="home-axis__image"><img src="/assets/img/index---gif--accion-en-el-mundo.webp" alt="Action in the world" loading="lazy"></div><div class="home-axis__copy"><h3>Action in the world</h3><p>Urban intervention, community, collaboration and public space.</p></div></a>
    <a href="/EN/inner-world.html" class="home-axis"><div class="home-axis__image"><img src="/assets/img/ES-inicio---mundo-interior.webp" alt="Inner world" loading="lazy"></div><div class="home-axis__copy"><h3>Inner world</h3><p>Body, memory, ritual, imagination and introspective processes.</p></div></a>
  </div></section>

  <section class="home-section" aria-labelledby="projects-collaboration"><div class="home-project-band"><header class="home-project-band__header"><div><p class="home-section__eyebrow">Applied art and territory</p><h2 id="projects-collaboration">Projects and collaboration</h2></div><p>Visual projects for public spaces, institutions, communities, teams and private collections.</p></header><div class="home-projects">
    <a href="/EN/services.html#commissions" class="home-project"><span class="home-project__number">01</span><span class="home-project__title">Murals</span><span class="home-project__description">Site-specific work, identity and spatial transformation.</span></a>
    <a href="/EN/services.html#workshops" class="home-project"><span class="home-project__number">02</span><span class="home-project__title">Workshops</span><span class="home-project__description">Learning, mediation and creative experiences.</span></a>
    <a href="/EN/services.html#restoration" class="home-project"><span class="home-project__number">03</span><span class="home-project__title">Restoration</span><span class="home-project__description">Material and visual conservation and recovery.</span></a>
    <a href="/EN/community.html" class="home-project"><span class="home-project__number">04</span><span class="home-project__title">Community projects</span><span class="home-project__description">Collaborative processes connected to territory.</span></a>
  </div><a href="/EN/services.html" class="home-text-link">Explore services and collaborations</a></div></section>

  <section class="home-section home-about" aria-labelledby="about-artist"><figure class="home-about__media"><img src="/assets/img/esteban-garnica2.jpg" alt="Esteban Garnica, Chilean visual artist" loading="lazy"></figure><div class="home-about__copy"><p class="home-section__eyebrow">About the artist</p><h2 id="about-artist">Esteban Garnica</h2><p>Chilean visual artist, born in Santiago in 1985 and trained at the University of Chile. His practice moves between painting, photography, urban intervention, muralism and community processes, addressing territory, memory, visual culture and contemporary life.</p><div class="home-about__links"><a href="/EN/garnica.html" class="home-text-link">About the artist</a><a href="/EN/exhibitions.html" class="home-text-link">Career and exhibitions</a></div></div></section>

  <section class="home-closing" aria-labelledby="commercial-close"><h2 id="commercial-close">Looking for an artwork or planning a project?</h2><div class="home-actions"><a href="/EN/store.html#impresiones-y-fotografia" class="home-button home-button--primary">See available artworks</a><a href="/EN/contact.html" class="home-button home-button--secondary">Contact</a></div></section>
</div>
