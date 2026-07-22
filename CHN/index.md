---
layout: default-chn
lang: zh-Hans
title: "Esteban Garnica / EGGS-Studio – 艺术作品与项目"
description: "Esteban Garnica 的创意宇宙：绘画、摄影、视觉介入、可购作品与文化项目。"
permalink: /CHN/index.html
es_url: /ES/index.html
en_url: /EN/index.html
mpd_url: /MPD/index.html
keywords: "Esteban Garnica, EGGS-Studio, 智利艺术家, 绘画, 摄影, 城市介入, 可购艺术品, 壁画, 文化项目"
image: /assets/img/pes-pint-produccion-Serie01-004.jpg
---

<link rel="stylesheet" href="/assets/css/home-editorial.css">
<link rel="stylesheet" href="/assets/css/home-project-images.css">
<link rel="stylesheet" href="/assets/css/home-impact-refinement.css">

{% assign producto_paisaje = site.productos_chn | where: "sku", "EGGS-W0008-L01-P5070-F70100" | first %}
{% assign producto_bandera = site.productos_chn | where: "sku", "EGGS-W0017-L01-P5070-F70100" | first %}
{% assign producto_colgado = site.productos_chn | where: "sku", "EGGS-W0056-L01-P110160-F120170" | first %}

<div class="home-editorial">
  <section class="home-hero" aria-labelledby="home-title">
    <div class="home-hero__copy">
      <p class="home-kicker">Esteban Garnica / EGGS-Studio</p>
      <h1 id="home-title" class="home-hero__title">绘画、图像与地域。</h1>
      <p class="home-hero__lead">Esteban Garnica 的艺术实践横跨绘画、摄影、视觉介入与场域项目。</p>
      <div class="home-actions"><a href="/CHN/obra.html" class="home-button home-button--primary">探索作品</a><a href="/CHN/contacto.html" class="home-button home-button--secondary">提出项目</a></div>
      <a href="/CHN/tienda.html#impresiones-y-fotografia" class="home-text-link">查看可购作品</a>
    </div>
    <figure class="home-hero__media"><img src="/assets/img/pes-pint-produccion-Serie01-004.jpg" alt="Esteban Garnica 关于世界再现的作品" fetchpriority="high" decoding="async"><figcaption>在绘画、档案、地域与当代视觉文化之间展开的艺术实践。</figcaption></figure>
  </section>

  <section class="home-section" aria-labelledby="available-artworks">
    <header class="home-section__header"><div><p class="home-section__eyebrow">可购收藏</p><h2 id="available-artworks">可购作品</h2></div><p class="home-section__intro">三件来自商店的真实版本。每个作品页面包含技法、尺寸、版数、证书与购买条件。</p></header>
    <div class="home-products">
      <article class="home-product"><a class="home-product__link" href="{{ producto_paisaje.url }}"><div class="home-product__image"><img src="{{ producto_paisaje.image }}" alt="{{ producto_paisaje.title }}" loading="lazy"></div><div class="home-product__body"><p class="home-product__type">{{ producto_paisaje.product_type }}</p><h3>{{ producto_paisaje.title }}</h3><dl class="home-product__facts"><dt>年份</dt><dd>{{ producto_paisaje.year }}</dd><dt>技法</dt><dd class="home-product__technique">{{ producto_paisaje.presentation }}</dd><dt>版数</dt><dd>{{ producto_paisaje.edition }}</dd></dl><div class="home-product__footer"><span class="home-product__price">{{ producto_paisaje.price_display }}</span><span class="home-product__state">{{ producto_paisaje.state }}</span></div></div></a></article>
      <article class="home-product"><a class="home-product__link" href="{{ producto_bandera.url }}"><div class="home-product__image"><img src="{{ producto_bandera.image }}" alt="{{ producto_bandera.title }}" loading="lazy"></div><div class="home-product__body"><p class="home-product__type">{{ producto_bandera.product_type }}</p><h3>{{ producto_bandera.title }}</h3><dl class="home-product__facts"><dt>年份</dt><dd>{{ producto_bandera.year }}</dd><dt>技法</dt><dd class="home-product__technique">{{ producto_bandera.presentation }}</dd><dt>版数</dt><dd>{{ producto_bandera.edition }}</dd></dl><div class="home-product__footer"><span class="home-product__price">{{ producto_bandera.price_display }}</span><span class="home-product__state">{{ producto_bandera.state }}</span></div></div></a></article>
      <article class="home-product"><a class="home-product__link" href="{{ producto_colgado.url }}"><div class="home-product__image"><img src="{{ producto_colgado.image }}" alt="{{ producto_colgado.title }}" loading="lazy"></div><div class="home-product__body"><p class="home-product__type">{{ producto_colgado.product_type }}</p><h3>{{ producto_colgado.title }}</h3><dl class="home-product__facts"><dt>年份</dt><dd>{{ producto_colgado.year }}</dd><dt>技法</dt><dd class="home-product__technique">{{ producto_colgado.presentation }}</dd><dt>版数</dt><dd>{{ producto_colgado.edition }}</dd></dl><div class="home-product__footer"><span class="home-product__price">{{ producto_colgado.price_display }}</span><span class="home-product__state">{{ producto_colgado.state }}</span></div></div></a></article>
    </div>
    <div class="home-section__footer"><a href="/CHN/tienda.html#impresiones-y-fotografia" class="home-text-link">查看全部可购作品</a></div>
  </section>

  <section class="home-section" aria-labelledby="selected-series"><header class="home-section__header"><div><p class="home-section__eyebrow">视觉研究</p><h2 id="selected-series">精选系列</h2></div><p class="home-section__intro">从扩展绘画、被观察的风景以及对视觉文化的批判性介入进入作品体系。</p></header><div class="home-series-grid">
    <a href="/CHN/serie-pinturas-infectadas.html" class="home-series-card home-series-card--main"><img src="/assets/img/pes-pint-produccion-Serie01-000b.jpg" alt="感染的绘画系列" loading="lazy"><div class="home-series-card__copy"><h3>感染的绘画</h3><p>绘画作为有机体、脆弱表面与持续变化的系统。</p></div></a>
    <a href="/CHN/serie-paisajes-carretera.html" class="home-series-card"><img src="/assets/img/tienda/EGGS-W0008-L01-P5070-F70100.webp" alt="公路风景系列" loading="lazy"><div class="home-series-card__copy"><h3>公路风景</h3><p>移动、速度与地域的视觉记忆。</p></div></a>
    <a href="/CHN/serie-antipublicidad.html" class="home-series-card"><img src="/assets/img/boton-antipub.webp" alt="反广告系列" loading="lazy"><div class="home-series-card__copy"><h3>反广告</h3><p>对商业信息的挪用、偏移与介入。</p></div></a>
  </div><div class="home-section__footer"><a href="/CHN/obra.html" class="home-text-link">查看全部系列</a></div></section>

  <section class="home-section" aria-labelledby="work-axes"><header class="home-section__header"><div><p class="home-section__eyebrow">策展地图</p><h2 id="work-axes">三个作品轴线</h2></div><p class="home-section__intro">艺术实践由三个互补方向构成：观察世界、介入世界，以及探索其内在回响。</p></header><div class="home-axes">
    <a href="/CHN/mundo-exterior.html" class="home-axis"><div class="home-axis__image"><img src="/assets/img/ES-inicio - representacion del mundo.webp" alt="世界的再现" loading="lazy"></div><div class="home-axis__copy"><h3>世界的再现</h3><p>风景、物件、视觉文化与当代现象。</p></div></a>
    <a href="/CHN/accion.html" class="home-axis"><div class="home-axis__image"><img src="/assets/img/index---gif--accion-en-el-mundo.webp" alt="在世界中的行动" loading="lazy"></div><div class="home-axis__copy"><h3>在世界中的行动</h3><p>城市介入、社区、协作与公共空间。</p></div></a>
    <a href="/CHN/interior.html" class="home-axis"><div class="home-axis__image"><img src="/assets/img/ES-inicio---mundo-interior.webp" alt="内在世界" loading="lazy"></div><div class="home-axis__copy"><h3>内在世界</h3><p>身体、记忆、仪式、想象与内省过程。</p></div></a>
  </div></section>

  <section class="home-section" aria-labelledby="projects-collaboration"><div class="home-project-band"><header class="home-project-band__header"><div><p class="home-section__eyebrow">应用艺术与地域</p><h2 id="projects-collaboration">项目与合作</h2></div><p>面向公共空间、机构、社区、团队与私人收藏的视觉项目。</p></header><div class="home-projects home-projects--visual">
    <a href="/CHN/servicios.html#encargos" class="home-project home-project--visual"><span class="home-project__image"><img src="/assets/img/boton-museos-cielo-abierto.webp" alt="协作壁画项目" loading="lazy"></span><span class="home-project__number">01</span><span class="home-project__title">壁画</span><span class="home-project__description">场域特定作品、身份与空间转化。</span></a>
    <a href="/CHN/servicios.html#talleres" class="home-project home-project--visual"><span class="home-project__image"><img src="/assets/img/index---gif--accion-en-el-mundo.webp" alt="艺术工作坊与调解体验" loading="lazy"></span><span class="home-project__number">02</span><span class="home-project__title">工作坊</span><span class="home-project__description">教学、艺术调解与创作体验。</span></a>
    <a href="/CHN/servicios.html#restauracion" class="home-project home-project--visual"><span class="home-project__image"><img src="/assets/img/restauracion-boton.webp" alt="修复与保护过程" loading="lazy"></span><span class="home-project__number">03</span><span class="home-project__title">修复</span><span class="home-project__description">材料与视觉层面的保存和恢复。</span></a>
    <a href="/CHN/comunitario.html" class="home-project home-project--visual"><span class="home-project__image"><img src="/assets/img/boton-muralismo-colectivo.webp" alt="公共空间中的社区艺术项目" loading="lazy"></span><span class="home-project__number">04</span><span class="home-project__title">社区项目</span><span class="home-project__description">与地域相连的协作过程。</span></a>
  </div><a href="/CHN/servicios.html" class="home-text-link">探索服务与合作</a></div></section>

  <section class="home-section home-about" aria-labelledby="about-artist"><figure class="home-about__media"><img src="/assets/img/esteban-garnica2.jpg" alt="智利视觉艺术家 Esteban Garnica" loading="lazy"></figure><div class="home-about__copy"><p class="home-section__eyebrow">关于艺术家</p><h2 id="about-artist">Esteban Garnica</h2><p>智利视觉艺术家，1985 年出生于圣地亚哥，毕业于智利大学。他的实践横跨绘画、摄影、城市介入、壁画与社区过程，持续关注地域、记忆、视觉文化与当代生活。</p><div class="home-about__links"><a href="/CHN/garnica.html" class="home-text-link">关于艺术家</a><a href="/CHN/exhibiciones.html" class="home-text-link">经历与展览</a></div></div></section>

  <section class="home-closing" aria-labelledby="commercial-close"><h2 id="commercial-close">正在寻找一件作品，或希望共同发展一个项目？</h2><div class="home-actions"><a href="/CHN/obra.html" class="home-button home-button--primary">探索作品</a><a href="/CHN/contacto.html" class="home-button home-button--secondary">提出项目</a></div></section>
</div>
