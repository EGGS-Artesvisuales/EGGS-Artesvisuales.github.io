---
layout: default-es
title: "Diagrama de Obra – Estructura y relaciones del proyecto artístico"
description: "Visualiza el diagrama general de la obra de Esteban Garnica: vínculos entre series, procesos, conceptos y acciones dentro de su práctica artística contemporánea."
keywords: "diagrama de obra, mapa conceptual arte, estructura artística, Esteban Garnica, EGGS-Studio, procesos creativos, arte contemporáneo Chile"
permalink: /ES/diagrama.html
mermaid: true
---

<h1 class="titulo">Diagrama de Obra</h1>
<h2 class="subtitulo">Un mapa visual de ideas, conceptos y prácticas artísticas</h2>

<p class="parrafo" style="margin-top: 6%;">
  Este diagrama reúne las principales líneas que estructuran mi práctica artística. Cada categoría opera como un eje conceptual que se ramifica en series, proyectos y procesos específicos. El esquema permite visualizar cómo se relacionan las distintas áreas de trabajo, evidenciando cruces, afinidades y desarrollos que componen mi investigación visual.
</p>

<p class="parrafo">
  Más que un mapa fijo, este diagrama funciona como un sistema abierto. Se actualiza y expande a medida que las obras evolucionan, incorporando nuevas preguntas, materiales y modos de hacer. Su propósito es ofrecer una mirada integral al conjunto de mi producción, atendiendo tanto a lo técnico como a lo conceptual.
</p>

<hr class="separador" />

<!-- 1) Representación del Mundo -->
<h2 class="subtitulo">Representación del Mundo</h2>

<div class="mermaid">
graph LR
  A((Representación del Mundo)) --> A1((Lo Tangible))
  A --> A2((Lo Intangible))

  A1 --> A1a((La Saturación))
  A1a --> A1a1([La Peste])
  A1a1 --> A1a1a([Pinturas Infectadas])
  A1a1a --> A1a1a1([Soportes tradicionales])
  A1a1a --> A1a1a2([Soportes Blandos])

  %% HIJOS: Soportes tradicionales
  A1a1a1 --> ST_OP([Obras propias])
  A1a1a1 --> ST_OA([Obras ajenas])

  %% HIJOS: Soportes blandos
  A1a1a2 --> SB_MEM([Membranas])
  A1a1a2 --> SB_MOD([Módulos])
  A1a1a2 --> SB_PU([Página única])

  A1a1 --> A1a1b([Desplazamiento de la Pintura])
  A1a1b --> A1a1b1([Espacio Doméstico])
  A1a1b --> A1a1b2([Espacio Público])
  A1a1b --> A1a1b3([Espacio Rural / Natural])

  %% HIJOS: Espacio doméstico
  A1a1b1 --> ED_OBJ([Objetos])
  A1a1b1 --> ED_HAB([Habitaciones])

  A1a --> A1a2([Lo Invisible])
  A1a2 --> A1a2a([Pinturas Wi-Fi])

  %% HIJOS: Pinturas Wi-Fi
  A1a2a --> PW_RET([Retratos])
  A1a2a --> PW_PAI([Paisajes])
  A1a2a --> PW_BOD([Bodegones])

  A1 --> A1b((La Tecnología))
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
  click A "mundo-exterior.html" "Ir a Representación del Mundo"
  click A1 "tangible.html" "Ir a Lo Tangible"
  click A2 "intangible.html" "Ir a Lo Intangible"
  click A1a "saturacion.html" "Ir a La Saturación"
  click A1a1 "la-peste.html" "Ir a La Peste"
  click A1a1a "/ES/peste-pinturas-infectadas.html" "Ir a Pinturas infectadas"
  click A1a1b "desplazamiento-pintura.html" "Ir a Desplazamiento de la Pintura"
  click A1a1b1 "/es/espacio-domestico" "Ir a Espacio Doméstico"
  click A1a1b2 "espacio-publico.html" "Ir a Espacio Público"
  click A1a1b3 "espacio-rural.html" "Ir a Espacio Rural / Natural"
  click A1a2 "lo-invisible.html" "Ir a Lo Invisible"
  click A2c1 "musoe-cielo-abierto.html" "Ir a Museo a Cielo Abierto"

  %% Enlaces a secciones internas (anchors) ya existentes

  %% Pinturas Infectadas: Soportes tradicionales + hijos
  click A1a1a1 "/ES/peste-pinturas-infectadas.html#soportes-tradicionales" "Ir a Soportes tradicionales"
  click ST_OP "/ES/peste-pinturas-infectadas.html#producciones" "Ir a Obras propias"
  click ST_OA "/ES/peste-pinturas-infectadas.html#intervenciones" "Ir a Obras ajenas"

  %% Pinturas Infectadas: Soportes blandos + hijos
  click A1a1a2 "/ES/peste-pinturas-infectadas.html#soportes-blandos" "Ir a Soportes blandos"
  click SB_MEM "/ES/peste-pinturas-infectadas.html#membranas" "Ir a Membranas"
  click SB_MOD "/ES/peste-pinturas-infectadas.html#modulos" "Ir a Módulos"
  click SB_PU "/ES/peste-pinturas-infectadas.html#unidades" "Ir a Página única"

  %% Espacio doméstico: Objetos / Habitaciones
  click ED_OBJ "/es/espacio-domestico#objetos" "Ir a Objetos"
  click ED_HAB "/es/espacio-domestico#habitaciones" "Ir a Habitaciones"

  %% Pinturas Wi-Fi: página + secciones
  click A1a2a "/ES/pinturas-wifi.html" "Ir a Pinturas Wi-Fi"
  click PW_RET "/ES/pinturas-wifi.html#retratos" "Ir a Retratos"
  click PW_PAI "/ES/pinturas-wifi.html#paisajes" "Ir a Paisajes"
  click PW_BOD "/ES/pinturas-wifi.html#bodegones" "Ir a Bodegones"

  %% Enlaces (no existentes aún -> en construcción)
  click A1b "en-construccion.html" "En construcción"
  click A1b1 "en-construccion.html" "En construcción"
  click A1b2 "en-construccion.html" "En construcción"
  click A1b3 "en-construccion.html" "En construcción"
  click A2a "en-construccion.html" "En construcción"
  click A2a1 "en-construccion.html" "En construcción"
  click A2a2 "en-construccion.html" "En construcción"
  click A2a3 "en-construccion.html" "En construcción"
  click A2b "en-construccion.html" "En construcción"
  click A2b1 "en-construccion.html" "En construcción"
  click A2b1a "en-construccion.html" "En construcción"
  click A2c "en-construccion.html" "En construcción"
  click A2c2 "en-construccion.html" "En construcción"
</div>

<hr class="separador" />

<!-- 2) Acción en el Mundo -->
<h2 class="subtitulo">Acción en el Mundo</h2>

<div class="mermaid">
graph LR
  B((Acción en\nel Mundo)) --> B1((Lo Subrepticio))
  B1 --> B1a([Remiendas\nUrbanas])
  B1 --> B1b([La Anti-Publicidad])
  B1 --> B1c([Graffiti\n& Tags])

  B --> B2((Lo Comunitario))
  B2 --> B2a([Muralismo])

  B --> B3((Docencia\ny Talleres))
  B3 --> B3a([Mineduc])
  B3 --> B3b([Corporaciones])
  B3 --> B3c([Independientes])

  B --> B4((Servicios))
  B4 --> B4a([Restauración])
  B4 --> B4b([Decoraciones\n& Encargo])
  B4 --> B4c([Asesorías\nTécnicas])

  %% Enlaces (existentes)
  click B "accion.html" "Ir a Acción en el Mundo"
  click B1 "subrepticio.html" "Ir a Lo Subrepticio"
  click B1a "subrep-remiendas-urbanas.html" "Ir a Remiendas Urbanas"
  click B1b "subrep-antipublicidad.html" "Ir a La Anti-Publicidad"
  click B2 "comunitario.html" "Ir a Lo Comunitario"
  click B3 "docencia.html" "Ir a Docencia y Talleres"
  click B4 "servicios.html" "Ir a Servicios"

  %% Enlaces (no existentes aún -> en construcción)
  click B1c "en-construccion.html" "En construcción"
  click B2a "en-construccion.html" "En construcción"
  click B3a "en-construccion.html" "En construcción"
  click B3b "en-construccion.html" "En construcción"
  click B3c "en-construccion.html" "En construcción"
  click B4a "en-construccion.html" "En construcción"
  click B4b "en-construccion.html" "En construcción"
  click B4c "en-construccion.html" "En construcción"
</div>

<hr class="separador" />

<!-- 3) Exploración del Mundo Interior -->
<h2 class="subtitulo">Exploración del Mundo Interior</h2>

<div class="mermaid">
graph LR
  C((Exploración del Mundo Interior)) --> C1((Arte y Psicología))
  C --> C2((Arte y Espiritualidad))

  %% Enlaces (existentes)
  click C "interior.html" "Ir a Exploración del Mundo Interior"

  %% Enlaces (no existentes aún -> en construcción)
  click C1 "en-construccion.html" "En construcción"
  click C2 "en-construccion.html" "En construcción"
</div>


