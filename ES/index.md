---
layout: default-es
lang: es
title: "Esteban Garnica / EGGS-Studio – Arte, obra y proyectos"
description: "Universo creativo de Esteban Garnica: pintura, fotografía, intervención, obra disponible y proyectos culturales desarrollados desde Santiago de Chile."
permalink: /ES/index.html
keywords: "Esteban Garnica, EGGS-Studio, artista visual chileno, pintura, fotografía, intervención urbana, obra disponible, muralismo, proyectos culturales"
image: /assets/img/ES-inicio - representacion del mundo.webp
---

<link rel="stylesheet" href="/assets/css/home-editorial.css">

{% assign producto_paisaje = site.productos_es | where: "sku", "EGGS-W0008-L01-P5070-F70100" | first %}
{% assign producto_bandera = site.productos_es | where: "sku", "EGGS-W0017-L01-P5070-F70100" | first %}
{% assign producto_colgado = site.productos_es | where: "sku", "EGGS-W0056-L01-P110160-F120170" | first %}

<div class="home-editorial">
  <section class="home-hero" aria-labelledby="home-title">
    <div class="home-hero__copy">
      <p class="home-kicker">Esteban Garnica / EGGS-Studio</p>
      <h1 id="home-title" class="home-hero__title">Universo creativo de Esteban Garnica.</h1>
      <p class="home-hero__lead">Pintura, fotografía, intervención y proyectos en territorio.</p>
      <div class="home-actions" aria-label="Acciones principales">
        <a href="/ES/tienda.html#impresiones-y-fotografia" class="home-button home-button--primary">Comprar obra</a>
        <a href="/ES/obra.html" class="home-button home-button--secondary">Explorar obra</a>
      </div>
      <a href="/ES/servicios.html" class="home-text-link">Encargos, murales y proyectos culturales</a>
    </div>

    <figure class="home-hero__media">
      <img src="/assets/img/ES-inicio - representacion del mundo.webp" alt="Obra de Esteban Garnica vinculada a la representación del mundo" fetchpriority="high">
      <figcaption>Una práctica que cruza pintura, archivo, territorio y cultura visual contemporánea.</figcaption>
    </figure>
  </section>

  <section class="home-section" aria-labelledby="obras-disponibles">
    <header class="home-section__header">
      <div>
        <p class="home-section__eyebrow">Colección disponible</p>
        <h2 id="obras-disponibles">Obras disponibles</h2>
      </div>
      <p class="home-section__intro">Tres ediciones reales de la tienda. Cada ficha reúne técnica, dimensiones, edición, certificado y condiciones de compra.</p>
    </header>

    <div class="home-products">
      <article class="home-product">
        <a class="home-product__link" href="{{ producto_paisaje.url }}">
          <div class="home-product__image"><img src="{{ producto_paisaje.image }}" alt="{{ producto_paisaje.title }}" loading="lazy"></div>
          <div class="home-product__body">
            <p class="home-product__type">{{ producto_paisaje.product_type }}</p>
            <h3>{{ producto_paisaje.title }}</h3>
            <dl class="home-product__facts">
              <dt>Año</dt><dd>{{ producto_paisaje.year }}</dd>
              <dt>Técnica</dt><dd class="home-product__technique">{{ producto_paisaje.presentation }}</dd>
              <dt>Edición</dt><dd>{{ producto_paisaje.edition }}</dd>
            </dl>
            <div class="home-product__footer">
              <span class="home-product__price">{{ producto_paisaje.price_display }}</span>
              <span class="home-product__state">{{ producto_paisaje.state }}</span>
            </div>
          </div>
        </a>
      </article>

      <article class="home-product">
        <a class="home-product__link" href="{{ producto_bandera.url }}">
          <div class="home-product__image"><img src="{{ producto_bandera.image }}" alt="{{ producto_bandera.title }}" loading="lazy"></div>
          <div class="home-product__body">
            <p class="home-product__type">{{ producto_bandera.product_type }}</p>
            <h3>{{ producto_bandera.title }}</h3>
            <dl class="home-product__facts">
              <dt>Año</dt><dd>{{ producto_bandera.year }}</dd>
              <dt>Técnica</dt><dd class="home-product__technique">{{ producto_bandera.presentation }}</dd>
              <dt>Edición</dt><dd>{{ producto_bandera.edition }}</dd>
            </dl>
            <div class="home-product__footer">
              <span class="home-product__price">{{ producto_bandera.price_display }}</span>
              <span class="home-product__state">{{ producto_bandera.state }}</span>
            </div>
          </div>
        </a>
      </article>

      <article class="home-product">
        <a class="home-product__link" href="{{ producto_colgado.url }}">
          <div class="home-product__image"><img src="{{ producto_colgado.image }}" alt="{{ producto_colgado.title }}" loading="lazy"></div>
          <div class="home-product__body">
            <p class="home-product__type">{{ producto_colgado.product_type }}</p>
            <h3>{{ producto_colgado.title }}</h3>
            <dl class="home-product__facts">
              <dt>Año</dt><dd>{{ producto_colgado.year }}</dd>
              <dt>Técnica</dt><dd class="home-product__technique">{{ producto_colgado.presentation }}</dd>
              <dt>Edición</dt><dd>{{ producto_colgado.edition }}</dd>
            </dl>
            <div class="home-product__footer">
              <span class="home-product__price">{{ producto_colgado.price_display }}</span>
              <span class="home-product__state">{{ producto_colgado.state }}</span>
            </div>
          </div>
        </a>
      </article>
    </div>

    <div class="home-section__footer"><a href="/ES/tienda.html#impresiones-y-fotografia" class="home-text-link">Ver todas las obras disponibles</a></div>
  </section>

  <section class="home-section" aria-labelledby="series-seleccionadas">
    <header class="home-section__header">
      <div>
        <p class="home-section__eyebrow">Investigaciones visuales</p>
        <h2 id="series-seleccionadas">Series seleccionadas</h2>
      </div>
      <p class="home-section__intro">Tres entradas para recorrer la obra desde la pintura expandida, el paisaje observado y la intervención crítica sobre la cultura visual.</p>
    </header>

    <div class="home-series-grid">
      <a href="/ES/serie-pinturas-infectadas.html" class="home-series-card home-series-card--main">
        <img src="/assets/img/pinf-blds-upg-retr-003b.jpg" alt="Serie Pinturas Infectadas" loading="lazy">
        <div class="home-series-card__copy"><h3>Pinturas Infectadas</h3><p>La pintura como organismo, superficie vulnerable y sistema en transformación.</p></div>
      </a>
      <a href="/ES/serie-paisajes-carretera.html" class="home-series-card">
        <img src="/assets/img/tienda/EGGS-W0008-L01-P5070-F70100.webp" alt="Serie Paisajes de Carretera" loading="lazy">
        <div class="home-series-card__copy"><h3>Paisajes de Carretera</h3><p>Tránsito, velocidad y memoria visual del territorio.</p></div>
      </a>
      <a href="/ES/serie-antipublicidad.html" class="home-series-card">
        <img src="/assets/img/boton-antipub.webp" alt="Serie Antipublicidad" loading="lazy">
        <div class="home-series-card__copy"><h3>Antipublicidad</h3><p>Apropiación, desvío e intervención de mensajes comerciales.</p></div>
      </a>
    </div>

    <div class="home-section__footer"><a href="/ES/obra.html" class="home-text-link">Ver todas las series</a></div>
  </section>

  <section class="home-section" aria-labelledby="ejes-obra">
    <header class="home-section__header">
      <div>
        <p class="home-section__eyebrow">Mapa curatorial</p>
        <h2 id="ejes-obra">Tres ejes de obra</h2>
      </div>
      <p class="home-section__intro">La práctica se organiza en tres movimientos complementarios: observar el mundo, actuar en él y explorar su resonancia interior.</p>
    </header>

    <div class="home-axes">
      <a href="/ES/mundo-exterior.html" class="home-axis">
        <div class="home-axis__image"><img src="/assets/img/ES-inicio - representacion del mundo.webp" alt="Representación del mundo" loading="lazy"></div>
        <div class="home-axis__copy"><h3>Representación del mundo</h3><p>Paisaje, objetos, cultura visual y fenómenos contemporáneos.</p></div>
      </a>
      <a href="/ES/accion.html" class="home-axis">
        <div class="home-axis__image"><img src="/assets/img/index---gif--accion-en-el-mundo.webp" alt="Acción en el mundo" loading="lazy"></div>
        <div class="home-axis__copy"><h3>Acción en el mundo</h3><p>Intervención urbana, comunidad, colaboración y espacio público.</p></div>
      </a>
      <a href="/ES/interior.html" class="home-axis">
        <div class="home-axis__image"><img src="/assets/img/ES-inicio---mundo-interior.webp" alt="Mundo interior" loading="lazy"></div>
        <div class="home-axis__copy"><h3>Mundo interior</h3><p>Cuerpo, memoria, rito, imaginación y procesos introspectivos.</p></div>
      </a>
    </div>
  </section>

  <section class="home-section" aria-labelledby="proyectos-colaboracion">
    <div class="home-project-band">
      <header class="home-project-band__header">
        <div>
          <p class="home-section__eyebrow">Arte aplicado y territorio</p>
          <h2 id="proyectos-colaboracion">Proyectos y colaboración</h2>
        </div>
        <p>Proyectos visuales desarrollados para espacios públicos, instituciones, comunidades, equipos y colecciones particulares.</p>
      </header>

      <div class="home-projects">
        <a href="/ES/servicios.html#encargos" class="home-project"><span class="home-project__number">01</span><span class="home-project__title">Murales</span><span class="home-project__description">Obra situada, identidad y transformación de espacios.</span></a>
        <a href="/ES/servicios.html#talleres" class="home-project"><span class="home-project__number">02</span><span class="home-project__title">Talleres</span><span class="home-project__description">Formación, mediación y experiencias creativas.</span></a>
        <a href="/ES/servicios.html#restauracion" class="home-project"><span class="home-project__number">03</span><span class="home-project__title">Restauración</span><span class="home-project__description">Conservación y recuperación material y visual.</span></a>
        <a href="/ES/comunitario.html" class="home-project"><span class="home-project__number">04</span><span class="home-project__title">Proyectos comunitarios</span><span class="home-project__description">Procesos colaborativos vinculados al territorio.</span></a>
      </div>

      <a href="/ES/servicios.html" class="home-text-link">Explorar servicios y colaboraciones</a>
    </div>
  </section>

  <section class="home-section home-about" aria-labelledby="sobre-artista">
    <figure class="home-about__media"><img src="/assets/img/esteban-garnica2.jpg" alt="Esteban Garnica, artista visual chileno" loading="lazy"></figure>
    <div class="home-about__copy">
      <p class="home-section__eyebrow">Sobre el artista</p>
      <h2 id="sobre-artista">Esteban Garnica</h2>
      <p>Artista visual chileno, nacido en Santiago en 1985 y formado en la Universidad de Chile. Su trabajo se desplaza entre pintura, fotografía, intervención urbana, muralismo y procesos comunitarios, abordando territorio, memoria, cultura visual y vida contemporánea.</p>
      <div class="home-about__links">
        <a href="/ES/garnica.html" class="home-text-link">Sobre el artista</a>
        <a href="/ES/exhibiciones.html" class="home-text-link">Trayectoria y exhibiciones</a>
      </div>
    </div>
  </section>

  <section class="home-closing" aria-labelledby="cierre-comercial">
    <h2 id="cierre-comercial">¿Buscas una obra o quieres desarrollar un proyecto?</h2>
    <div class="home-actions">
      <a href="/ES/tienda.html#impresiones-y-fotografia" class="home-button home-button--primary">Ver obras disponibles</a>
      <a href="/ES/contacto.html" class="home-button home-button--secondary">Contactar</a>
    </div>
  </section>
</div>
