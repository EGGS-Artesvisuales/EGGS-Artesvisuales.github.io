---
layout: default-mpd
title: "Küdaw ñi azentun – Estructura y relaciones del küdaw az-küdaw"
description: "Azentuniza el diagrama general de la obra de Esteban Garnica: vínculos entre series, küdaw rüpü, conceptos y acciones dentro de su práctica az-küdaw contemporánea."
keywords: "diagrama de obra, mapa conceptual arte, estructura az-küdaw, Esteban Garnica, EGGS-Studio, küdaw rüpü creativos, arte contemporáneo Chile"
permalink: /MPD/diagrama.html
mermaid: true
---

<h1 class="titulo">Küdaw ñi azentun</h1>
<h2 class="subtitulo">Un mapa azentun de ideas, conceptos y prácticas az-küdaws</h2>

<p class="parrafo" style="margin-top: 6%;">
  Este diagrama reúne las principales líneas que estructuran mi práctica az-küdaw. Cada categoría opera como un eje conceptual que se ramifica en series, küdaw y küdaw rüpü específicos. El esquema permite azentunizar cómo se relacionan las distintas áreas de trabajo, evidenciando cruces, afinidades y desarrollos que componen mi investigación azentun.
</p>

<p class="parrafo">
  Más que un mapa fijo, este diagrama funciona como un sistema abierto. Se actualiza y expande a medida que las obras evolucionan, incorporando nuevas preguntas, materiales y modos de hacer. Su propósito es ofrecer una mirada integral al conjunto de mi producción, atendiendo tanto a lo técnico como a lo conceptual.
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
  A1a1a2 --> SB_PU([Página única])

  A1a1 --> A1a1b([Desplazamiento de la Pintura])
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
  A1b --> A1b1([La IA])
  A1b --> A1b2([Lo Espacial])
  A1b --> A1b3([Telecomunicaciones])

  A2 --> A2a((El Capitalismo))
  A2a --> A2a1([El Colgado])
  A2a --> A2a2([Mr. Burns])
  A2a --> A2a3([El Empaquetador])

  A2 --> A2b((Lo Popular))
  A2b --> A2b1([Esculturas])
  A2b1 --> A2b1a([Papelucho])

  A2 --> A2c((Lo Ancestral))
  A2c --> A2c1([Museo a Cielo Abierto])
  A2c --> A2c2([Mapuche Urbano, La Tala de la Memoria])

  %% Enlaces (existentes)
  click A "wallmapu-exterior.html" "Amun: Wallmapu ñi azentun"
  click A1 "tangible.html" "Amun: Kalül mew"
  click A2 "intangible.html" "Amun: Lo Püllü mew"
  click A1a "saturacion.html" "Amun: Fentepun"
  click A1a1 "la-peste.html" "Amun: Kutxan"
  click A1a1a "/MPD/peste-pinturas-infectadas.html" "Amun: kutxan pinturas"
  click A1a1b "desplazamiento-pintura.html" "Amun: Desplazamiento de la Pintura"
  click A1a1b1 "/MPD/espacio-domestico.html" "Amun: Püle Ruka mew"
  click A1a1b2 "/MPD/espacio-publico.html" "Amun: Püle Fütra che mew"
  click A1a1b3 "/MPD/espacio-rural.html" "Amun: Püle Mapu lof mew / Natural"
  click A1a2 "lo-invisible.html" "Amun: Pengekenon"
  click A2c1 "musoe-a-cielo-abierto.html" "Amun: Museo a Cielo Abierto"

  %% Enlaces a secciones internas (anchors) ya existentes

  %% Kutxan Pinturas: Soportes tradicionales + hijos
  click A1a1a1 "/MPD/peste-pinturas-infectadas.html#soportes-tradicionales" "Amun: Soportes tradicionales"
  click ST_OP "/MPD/peste-pinturas-infectadas.html#producciones" "Amun: Ñi mülechi küdaw"
  click ST_OA "/MPD/peste-pinturas-infectadas.html#intervenciones" "Amun: Kakeche ñi küdaw"

  %% Kutxan Pinturas: Soportes blandos + hijos
  click A1a1a2 "/MPD/peste-pinturas-infectadas.html#soportes-blandos" "Amun: Soportes blandos"
  click SB_MEM "/MPD/peste-pinturas-infectadas.html#membranas" "Amun: Membranas"
  click SB_MOD "/MPD/peste-pinturas-infectadas.html#modulos" "Amun: Módulos"
  click SB_PU "/MPD/peste-pinturas-infectadas.html#unidades" "Amun: Página única"

  %% Püle ruka mew: Objetos / Habitaciones
  click ED_OBJ "/MPD/espacio-domestico.html#objetos" "Amun: Objetos"
  click ED_HAB "/MPD/espacio-domestico.html#habitaciones" "Amun: Habitaciones"

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
  B((Acción en\nel Wallmapu)) --> B1((Ellka küdaw))
  B1 --> B1a([Remiendas\nUrbanas])
  B1 --> B1b([La Anti-Publicidad])
  B1 --> B1c([Graffiti\n& Tags])

  %% HIJOS: La Anti-Publicidad (nuevos)
  B1b --> B1b1([PP series])
  B1b --> B1b2([Carteles])
  B1b --> B1b3([Piratería publicitaria])

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
  click B1a "subrep-remiendas-urbanas.html" "Amun: Remiendas Urbanas"
  click B1b "subrep-antipublicidad.html" "Amun: La Anti-Publicidad"
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


