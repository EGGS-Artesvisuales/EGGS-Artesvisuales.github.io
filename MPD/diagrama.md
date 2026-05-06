---
layout: default-mpd
title: "Küdaw ñi azentun – Estructura ka pu nütram egu ñi küdaw az-küdaw"
description: "Azentuniza feychi diagrama general ñi feychi küdaw ñi Esteban Garnica: vínculos rangiñ series, küdaw rüpü, conceptos ka acciones dentro ñi ñi práctica az-küdaw fachi antü mew."
keywords: "diagrama ñi küdaw, mapa conceptual az-küdaw, estructura az-küdaw, Esteban Garnica, EGGS-Studio, küdaw rüpü creativos, az-küdaw fachi antü mew Chile"
permalink: /MPD/diagrama.html
mermaid: true
---

<h1 class="titulo">Küdaw ñi azentun</h1>
<h2 class="subtitulo">Un mapa azentun ñi ideas, conceptos ka prácticas az-küdaws</h2>

<p class="parrafo" style="margin-top: 6%;">
  Este diagrama reúne pu principales líneas chi estructuran iñche ñi práctica az-küdaw. Cada categoría opera reke kiñe eje conceptual chi se ramifica mew series, küdaw ka küdaw rüpü específicos. Fachi esquema permite azentunizar cómo se relacionan pu distintas áreas ñi trabajo, evidenciando cruces, afinidades ka desarrollos chi componen iñche ñi investigación azentun.
</p>

<p class="parrafo">
  Más chi kiñe mapa fijo, fachi diagrama funciona reke kiñe sistema abierto. Se actualiza ka expande a medida chi pu küdaw evolucionan, incorporando we pu preguntas, pu chemkün ka modos ñi hacer. Su propósito es ofrecer kiñe mirada integral al conjunto ñi iñche ñi dewman, atendiendo tanto a lo técnico reke a lo conceptual.
</p>

<hr class="separador" />

<!-- 1) Wallmapu ñi azentun -->
<h2 class="subtitulo">Wallmapu ñi azentun</h2>

<div class="mermaid">
graph LR
  A((Wallmapu ñi azentun)) --> A1((Kalül mew))
  A --> A2((Lo Püllü mew))

  A1 --> A1a((Fentepun))
  A1a --> A1a1([Kutxan])
  A1a1 --> A1a1a([Kutxan Pinturas])
  A1a1a --> A1a1a1([Soportes tradicionales])
  A1a1a --> A1a1a2([Soportes Blandos])

  %% HIJOS: Soportes tradicionales
  A1a1a1 --> ST_OP([Ñi mülechi küdaw])
  A1a1a1 --> ST_OA([Kakeche ñi küdaw])

  %% HIJOS: Soportes blandos
  A1a1a2 --> SB_MEM([Membranas])
  A1a1a2 --> SB_MOD([Módulos])
  A1a1a2 --> SB_PU([Txoy única])

  A1a1 --> A1a1b([Fentepun ñi pintura az-küdaw])
  A1a1b --> A1a1b1([Püle Ruka mew])
  A1a1b --> A1a1b2([Püle Fütra che mew])
  A1a1b --> A1a1b3([Püle Mapu lof mew / Natural])

  %% HIJOS: Püle ruka mew
  A1a1b1 --> ED_OBJ([Objetos])
  A1a1b1 --> ED_HAB([Habitaciones])

  A1a --> A1a2([Pengekenon])
  A1a2 --> A1a2a([Wi-Fi Pinturas])

  %% HIJOS: Wi-Fi Pinturas
  A1a2a --> PW_RET([Adentu])
  A1a2a --> PW_PAI([Mapu az])
  A1a2a --> PW_BOD([Chemkün az])

  A1 --> A1b((Teknologia))
  A1b --> A1b1([Fachi IA])
  A1b --> A1b2([Lo Espacial])
  A1b --> A1b3([Telecomunicaciones])

  A2 --> A2a((Fachi Capitalismo))
  A2a --> A2a1([Fachi Colgado])
  A2a --> A2a2([Mr. Burns])
  A2a --> A2a3([Fachi Empaquetador])

  A2 --> A2b((Lo Popular))
  A2b --> A2b1([Esculturas])
  A2b1 --> A2b1a([Papelucho])

  A2 --> A2c((Lo Ancestral))
  A2c --> A2c1([Wente mapu musoe])
  A2c --> A2c2([Mapuche Urbano, Fachi Tala ñi feychi Memoria])

  %% Enlaces (existentes)
  click A "wallmapu-exterior.html" "Amun: Wallmapu ñi azentun"
  click A1 "tangible.html" "Amun: Kalül mew"
  click A2 "intangible.html" "Amun: Lo Püllü mew"
  click A1a "saturacion.html" "Amun: Fentepun"
  click A1a1 "feychi-peste.html" "Amun: Kutxan"
  click A1a1a "/MPD/peste-pinturas-infectadas.html" "Amun: kutxan pintura az-küdaw az-küdaw"
  click A1a1b "fentepun-pintura az-küdaw.html" "Amun: Fentepun ñi pintura az-küdaw"
  click A1a1b1 "/MPD/espacio-domestico.html" "Amun: Püle Ruka mew"
  click A1a1b2 "/MPD/espacio-publico.html" "Amun: Püle Fütra che mew"
  click A1a1b3 "/MPD/espacio-rural.html" "Amun: Püle Mapu lof mew / Natural"
  click A1a2 "lo-invisible.html" "Amun: Pengekenon"
  click A2c1 "musoe-a-cielo-abierto.html" "Amun: Wente mapu musoe"

  %% Enlaces a pu txoy internas (anchors) ya existentes

  %% Kutxan Pinturas: Soportes tradicionales + hijos
  click A1a1a1 "/MPD/peste-pinturas-infectadas.html#soportes-tradicionales" "Amun: Soportes tradicionales"
  click ST_OP "/MPD/peste-pinturas-infectadas.html#producciones" "Amun: Ñi mülechi küdaw"
  click ST_OA "/MPD/peste-pinturas-infectadas.html#intervenciones" "Amun: Kakeche ñi küdaw"

  %% Kutxan Pinturas: Soportes blandos + hijos
  click A1a1a2 "/MPD/peste-pinturas-infectadas.html#soportes-blandos" "Amun: Soportes blandos"
  click SB_MEM "/MPD/peste-pinturas-infectadas.html#membranas" "Amun: Membranas"
  click SB_MOD "/MPD/peste-pinturas-infectadas.html#modulos" "Amun: Módulos"
  click SB_PU "/MPD/peste-pinturas-infectadas.html#unidades" "Amun: Txoy única"

  %% Püle ruka mew: Objetos / Habitaciones
  click ED_OBJ "/MPD/espacio-domestico.html#objetos" "Amun: Objetos"
  click ED_HAB "/MPD/espacio-domestico.html#habitaciones" "Amun: Habitaciones"

  %% Wi-Fi Pinturas: txoy + pu txoy
  click A1a2a "/MPD/pinturas-wifi.html" "Amun: Wi-Fi Pinturas"
  click PW_RET "/MPD/pinturas-wifi.html#retratos" "Amun: Adentu"
  click PW_PAI "/MPD/pinturas-wifi.html#paisajes" "Amun: Mapu az"
  click PW_BOD "/MPD/pinturas-wifi.html#bodegones" "Amun: Chemkün az"

  %% Enlaces (no existentes aún -> mew construcción)
  click A1b "mew-construccion.html" "Dewmangen mew"
  click A1b1 "mew-construccion.html" "Dewmangen mew"
  click A1b2 "mew-construccion.html" "Dewmangen mew"
  click A1b3 "mew-construccion.html" "Dewmangen mew"
  click A2a "mew-construccion.html" "Dewmangen mew"
  click A2a1 "mew-construccion.html" "Dewmangen mew"
  click A2a2 "mew-construccion.html" "Dewmangen mew"
  click A2a3 "mew-construccion.html" "Dewmangen mew"
  click A2b "mew-construccion.html" "Dewmangen mew"
  click A2b1 "mew-construccion.html" "Dewmangen mew"
  click A2b1a "mew-construccion.html" "Dewmangen mew"
  click A2c "mew-construccion.html" "Dewmangen mew"
  click A2c2 "mew-construccion.html" "Dewmangen mew"
</div>

<hr class="separador" />

<!-- 2) Mapu mew Küdaw -->
<h2 class="subtitulo">Mapu mew Küdaw</h2>

<div class="mermaid">
graph LR
  B((Acción mew\nel Wallmapu)) --> B1((Ellka küdaw))
  B1 --> B1a([Remiendas\nUrbanas])
  B1 --> B1b([Fachi Anti-Publicidad])
  B1 --> B1c([Graffiti\n& Tags])

  %% HIJOS: Fachi Anti-Publicidad (we pu)
  B1b --> B1b1([PP series])
  B1b --> B1b2([Carteles])
  B1b --> B1b3([Piratería waria wirin])

  B --> B2((Lof mew))
  B2 --> B2a([Muralismo])

  B --> B3((Kimeltun\ny Talleres))
  B3 --> B3a([Mineduc])
  B3 --> B3b([Corporaciones])
  B3 --> B3c([Independientes])

  B --> B4((Kellun))
  B4 --> B4a([Küme dewün])
  B4 --> B4b([Decoraciones\n& Encargo])
  B4 --> B4c([Asesorías\nTécnicas])

  %% Enlaces (existentes)
  click B "accion.html" "Amun: Mapu mew Küdaw"
  click B1 "subrepticio.html" "Amun: Ellka küdaw"
  click B1a "subrep-remiendas-waria mew.html" "Amun: Remiendas Urbanas"
  click B1b "subrep-antipublicidad.html" "Amun: Fachi Anti-Publicidad"
  click B2 "lof mew.html" "Amun: Lof mew"
  click B3 "kimeltun.html" "Amun: Kimeltun ka Talleres"
  click B4 "servicios.html" "Amun: Kellun"

  %% Enlaces (no existentes aún -> mew construcción)
  click B1c "mew-construccion.html" "Dewmangen mew"
  click B2a "mew-construccion.html" "Dewmangen mew"
  click B3a "mew-construccion.html" "Dewmangen mew"
  click B3b "mew-construccion.html" "Dewmangen mew"
  click B3c "mew-construccion.html" "Dewmangen mew"
  click B4a "mew-construccion.html" "Dewmangen mew"
  click B4b "mew-construccion.html" "Dewmangen mew"
  click B4c "mew-construccion.html" "Dewmangen mew"

  %% Enlaces (we pu hijos -> mew construcción)
  click B1b1 "mew-construccion.html" "Dewmangen mew"
  click B1b2 "mew-construccion.html" "Dewmangen mew"
  click B1b3 "mew-construccion.html" "Dewmangen mew"
</div>

<hr class="separador" />

<!-- 3) Exploración del Püle rakizuam -->
<h2 class="subtitulo">Exploración ñi Püle rakizuam</h2>

<div class="mermaid">
graph LR
  C((Exploración ñi Püle rakizuam)) --> C1((Az-küdaw ka Psicología))
  C --> C2((Az-küdaw ka Espiritualidad))

  %% Enlaces (existentes)
  click C "interior.html" "Amun: Exploración ñi Püle rakizuam"

  %% Enlaces (no existentes aún -> mew construcción)
  click C1 "mew-construccion.html" "Dewmangen mew"
  click C2 "mew-construccion.html" "Dewmangen mew"
</div>


