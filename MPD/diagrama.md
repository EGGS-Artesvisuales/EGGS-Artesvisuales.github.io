---
layout: default-mpd
title: "Küdaw ñi azentun - Az ka trafün ñi az-küdaw"
description: "Esteban Garnica ñi küdaw ñi diagrama: trokiñ, rüpü, rakizuam ka mapu mew küdaw ñi trafün fachi antü az-küdaw mew."
keywords: "küdaw diagrama, az-küdaw mapa rakizuam, az-küdaw ñi az, Esteban Garnica, EGGS-Studio, küdaw rüpü, Chile ñi fachi antü az-küdaw"
permalink: /MPD/diagrama.html
mermaid: true
---

<h1 class="titulo">Küdaw ñi azentun</h1>
<h2 class="subtitulo">Rakizuam, zugu ka az-küdaw rüpü ñi mapa</h2>

<p class="parrafo" style="margin-top: 6%;">
  Fachi diagrama txawüley ñi az-küdaw ñi fütra rüpü. Fill trokiñ müley rakizuam ñi folil reke; fey mew tripakey serie, küdaw ka küdaw rüpü. Feychi azentun kimelkey chumül trafüley pu área ñi küdaw, chumül txürkey, chumül püllükey ka chumül amuley ñi kintun.
</p>

<p class="parrafo">
  Mapa müten gelay; fachi diagrama nülalechi sistema reke amuley. Küdaw petu newentulelu mew, we ramtun, we material ka we dewman rüpü konkey. Ñi zugu: kom ñi dewman azentun kintun, técnica ka rakizuam epu püle mew.
</p>

<hr class="separador" />

<!-- 1) Wallmapu ñi azentun -->
<h2 class="subtitulo">Wallmapu ñi azentun</h2>

<div class="mermaid">
graph LR
  A((Wallmapu ñi azentun)) --> A1((Kalül mew))
  A --> A2((Püllü mew))

  A1 --> A1a((Fentepun))
  A1a --> A1a1([Kutxan])
  A1a1 --> A1a1a([Kutxan Pinturas])
  A1a1a --> A1a1a1([Kuyfi soporte])
  A1a1a --> A1a1a2([Ñochi soporte])

  %% HIJOS: Soportes tradicionales
  A1a1a1 --> ST_OP([Ñi mülechi küdaw])
  A1a1a1 --> ST_OA([Kakeche ñi küdaw])

  %% HIJOS: Soportes blandos
  A1a1a2 --> SB_MEM([Membranas])
  A1a1a2 --> SB_MOD([Módulos])
  A1a1a2 --> SB_PU([Página única])

  A1a1 --> A1a1b([Pintura ñi fentepun])
  A1a1b --> A1a1b1([Püle Ruka mew])
  A1a1b --> A1a1b2([Püle Fütra che mew])
  A1a1b --> A1a1b3([Püle Mapu lof mew / Natural])

  %% HIJOS: Püle ruka mew
  A1a1b1 --> ED_OBJ([Chemkün])
  A1a1b1 --> ED_HAB([Ruka püle])

  A1a --> A1a2([Pengekenon])
  A1a2 --> A1a2a([Wi-Fi Pinturas])

  %% HIJOS: Wi-Fi Pinturas
  A1a2a --> PW_RET([Adentu])
  A1a2a --> PW_PAI([Mapu az])
  A1a2a --> PW_BOD([Chemkün az])

  A1 --> A1b((Teknologia))
  A1b --> A1b1([IA])
  A1b --> A1b2([Wenu püle])
  A1b --> A1b3([Alüñma nütram])

  A2 --> A2a((Capitalismo))
  A2a --> A2a1([El Colgado])
  A2a --> A2a2([Mr. Burns])
  A2a --> A2a3([El Empaquetador])

  A2 --> A2b((Pu che ñi az))
  A2b --> A2b1([Esculturas])
  A2b1 --> A2b1a([Papelucho])

  A2 --> A2c((Kuifikeche ñi az))
  A2c --> A2c1([Museo a Cielo Abierto])
  A2c --> A2c2([Mapuche Urbano, La Tala de la Memoria])

  %% Enlaces (existentes)
  click A "wallmapu-exterior.html" "Amun: Wallmapu ñi azentun"
  click A1 "tangible.html" "Amun: Kalül mew"
  click A2 "intangible.html" "Amun: Püllü mew"
  click A1a "saturacion.html" "Amun: Fentepun"
  click A1a1 "la-peste.html" "Amun: Kutxan"
  click A1a1a "/MPD/peste-pinturas-infectadas.html" "Amun: kutxan pinturas"
  click A1a1b "desplazamiento-pintura.html" "Amun: Pintura ñi fentepun"
  click A1a1b1 "/MPD/espacio-domestico.html" "Amun: Püle Ruka mew"
  click A1a1b2 "/MPD/espacio-publico.html" "Amun: Püle Fütra che mew"
  click A1a1b3 "/MPD/espacio-rural.html" "Amun: Püle Mapu lof mew / Natural"
  click A1a2 "lo-invisible.html" "Amun: Pengekenon"
  click A2c1 "musoe-a-cielo-abierto.html" "Amun: Museo a Cielo Abierto"

  %% Enlaces a secciones internas (anchors) ya existentes

  %% Kutxan Pinturas: Soportes tradicionales + hijos
  click A1a1a1 "/MPD/peste-pinturas-infectadas.html#soportes-tradicionales" "Amun: Kuyfi soporte"
  click ST_OP "/MPD/peste-pinturas-infectadas.html#producciones" "Amun: Ñi mülechi küdaw"
  click ST_OA "/MPD/peste-pinturas-infectadas.html#intervenciones" "Amun: Kakeche ñi küdaw"

  %% Kutxan Pinturas: Soportes blandos + hijos
  click A1a1a2 "/MPD/peste-pinturas-infectadas.html#soportes-blandos" "Amun: Ñochi soporte"
  click SB_MEM "/MPD/peste-pinturas-infectadas.html#membranas" "Amun: Membranas"
  click SB_MOD "/MPD/peste-pinturas-infectadas.html#modulos" "Amun: Módulos"
  click SB_PU "/MPD/peste-pinturas-infectadas.html#unidades" "Amun: Página única"

  %% Püle ruka mew: Objetos / Habitaciones
  click ED_OBJ "/MPD/espacio-domestico.html#objetos" "Amun: Chemkün"
  click ED_HAB "/MPD/espacio-domestico.html#habitaciones" "Amun: Ruka püle"

  %% Wi-Fi Pinturas: página + secciones
  click A1a2a "/MPD/pinturas-wifi.html" "Amun: Wi-Fi Pinturas"
  click PW_RET "/MPD/pinturas-wifi.html#retratos" "Amun: Adentu"
  click PW_PAI "/MPD/pinturas-wifi.html#paisajes" "Amun: Mapu az"
  click PW_BOD "/MPD/pinturas-wifi.html#bodegones" "Amun: Chemkün az"

  %% Enlaces (no existentes aún -> en construcción)
  click A1b "en-construccion.html" "Dewmangen mew"
  click A1b1 "en-construccion.html" "Dewmangen mew"
  click A1b2 "en-construccion.html" "Dewmangen mew"
  click A1b3 "en-construccion.html" "Dewmangen mew"
  click A2a "en-construccion.html" "Dewmangen mew"
  click A2a1 "en-construccion.html" "Dewmangen mew"
  click A2a2 "en-construccion.html" "Dewmangen mew"
  click A2a3 "en-construccion.html" "Dewmangen mew"
  click A2b "en-construccion.html" "Dewmangen mew"
  click A2b1 "en-construccion.html" "Dewmangen mew"
  click A2b1a "en-construccion.html" "Dewmangen mew"
  click A2c "en-construccion.html" "Dewmangen mew"
  click A2c2 "en-construccion.html" "Dewmangen mew"
</div>

<hr class="separador" />

<!-- 2) Mapu mew Küdaw -->
<h2 class="subtitulo">Mapu mew Küdaw</h2>

<div class="mermaid">
graph LR
  B((Wallmapu mew\nküdaw)) --> B1((Ellka küdaw))
  B1 --> B1a([Waria\nremiendas])
  B1 --> B1b([Anti-Publicidad])
  B1 --> B1c([Graffiti\n& Tags])

  %% HIJOS: La Anti-Publicidad (nuevos)
  B1b --> B1b1([PP series])
  B1b --> B1b2([Waria wirin])
  B1b --> B1b3([Publicidad ñi ñom])

  B --> B2((Lof mew))
  B2 --> B2a([Muralismo])

  B --> B3((Kimeltun\ny Talleres))
  B3 --> B3a([Mineduc])
  B3 --> B3b([Corporaciones])
  B3 --> B3c([Independientes])

  B --> B4((Kellun))
  B4 --> B4a([Küme dewün])
  B4 --> B4b([Azümün\nka Pedido])
  B4 --> B4c([Técnica\nngülam])

  %% Enlaces (existentes)
  click B "accion.html" "Amun: Mapu mew Küdaw"
  click B1 "subrepticio.html" "Amun: Ellka küdaw"
  click B1a "subrep-remiendas-urbanas.html" "Amun: Waria remiendas"
  click B1b "subrep-antipublicidad.html" "Amun: Anti-Publicidad"
  click B2 "lof mew.html" "Amun: Lof mew"
  click B3 "docencia.html" "Amun: Kimeltun ka Talleres"
  click B4 "servicios.html" "Amun: Kellun"

  %% Enlaces (no existentes aún -> en construcción)
  click B1c "en-construccion.html" "Dewmangen mew"
  click B2a "en-construccion.html" "Dewmangen mew"
  click B3a "en-construccion.html" "Dewmangen mew"
  click B3b "en-construccion.html" "Dewmangen mew"
  click B3c "en-construccion.html" "Dewmangen mew"
  click B4a "en-construccion.html" "Dewmangen mew"
  click B4b "en-construccion.html" "Dewmangen mew"
  click B4c "en-construccion.html" "Dewmangen mew"

  %% Enlaces (nuevos hijos -> en construcción)
  click B1b1 "en-construccion.html" "Dewmangen mew"
  click B1b2 "en-construccion.html" "Dewmangen mew"
  click B1b3 "en-construccion.html" "Dewmangen mew"
</div>

<hr class="separador" />

<!-- 3) Exploración del Püle rakizuam -->
<h2 class="subtitulo">Exploración del Püle rakizuam</h2>

<div class="mermaid">
graph LR
  C((Exploración del Püle rakizuam)) --> C1((Az-küdaw y Psicología))
  C --> C2((Az-küdaw y Espiritualidad))

  %% Enlaces (existentes)
  click C "interior.html" "Amun: Exploración del Püle rakizuam"

  %% Enlaces (no existentes aún -> en construcción)
  click C1 "en-construccion.html" "Dewmangen mew"
  click C2 "en-construccion.html" "Dewmangen mew"
</div>


