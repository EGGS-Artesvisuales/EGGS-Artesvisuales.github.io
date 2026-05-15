---
layout: default-en
lang: en
title: "Muralism - Facilitation and collective guidance"
description: "Facilitation and collective guidance processes within Esteban Garnica's Muralism series."
permalink: /EN/muralism-facilitation.html
keywords: "muralism, facilitation, collective guidance, participatory design, community muralism, Esteban Garnica, EGGS-Studio"
carousel: true
---

<h1 class="titulo">Muralism</h1>
<h2 class="subtitulo">Facilitation and collective guidance</h2>

<figure class="imagen-con-caption">
  <img src="/assets/img/muralismo/faci/faci-ptmq-proceso-2018.webp" alt="Facilitated mural process with participants painting a wall at CESFAM Villa Los Quillayes" loading="eager">
  <figcaption>Pinta Tu Mural Los Quillayes, CESFAM Villa Los Quillayes, 2018. Web-optimized record from the FACI archive.</figcaption>
</figure>

<p class="parrafo" style="margin-top: 6%;">
  <strong>FACI</strong> gathers community mural processes in which my main role is to facilitate, guide, accompany, structure, or mediate collective production. In these cases, the work is not understood only as a final image: methodology, listening, visual decision-making, and the participation of groups, communities, or institutions are also central.
</p>

<p class="parrafo">
  The series has remained open since 2012. Each main folder corresponds to a specific case of facilitation or guidance, and may contain the previous state of the wall, sketches, process records, educational materials, coordination documents, final documentation, and project memory.
</p>

<div class="archivo-panel">
  <h3>Series Record</h3>
  <dl>
    <div><dt>Type</dt><dd>Open series</dd></div>
    <div><dt>Year</dt><dd>2012 onward</dd></div>
    <div><dt>Technique</dt><dd>Community muralism, group facilitation, graphic mediation, and methodological accompaniment.</dd></div>
    <div><dt>Context</dt><dd>Youth groups, local communities, schools, neighborhood organizations, community programs, and participatory commissions.</dd></div>
  </dl>
</div>

<h2 class="subtitulo2">Milestones</h2>

<p class="parrafo">
  This selection organizes the processes by milestone. Each block keeps a short description, concise credits, and a carousel of web-optimized records from the selected folders.
</p>

{% for hito in site.data.faci_hitos_en %}
  {% include hito-carousel.html hito=hito carousel_label="Carousel" record_label="record" of_label="of" %}
{% endfor %}

<p class="parrafo">
  FACI differs from Festivals because the organizing criterion is not the event frame, but the role of guidance and facilitation. It also differs from Open-air Museums because it is not organized only by fixed locality or by fully closed authorial works, but by shared processes where methodological direction is central.
</p>
