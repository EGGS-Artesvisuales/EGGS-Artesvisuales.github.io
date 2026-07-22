---
layout: default-es
lang: es
title: "Mapa conceptual de obra – Estructura y relaciones de la práctica artística"
description: "Mapa conceptual de la obra de Esteban Garnica: relaciones entre ejes, categorías, series publicadas, desarrollos en curso y líneas de investigación."
keywords: "mapa conceptual de obra, estructura artística, Esteban Garnica, EGGS-Studio, procesos creativos, arte contemporáneo Chile"
permalink: /ES/diagrama.html
mermaid: true
---

<link rel="stylesheet" href="/assets/css/work-map.css">

<h1 class="titulo">Mapa conceptual de obra</h1>
<h2 class="subtitulo">Ideas, relaciones, series y líneas de investigación</h2>

<p class="parrafo" style="margin-top: 6%;">
  Este mapa reúne las principales líneas que estructuran mi práctica artística. Cada categoría funciona como una herramienta de lectura que conecta ejes conceptuales, series, proyectos, procesos materiales y acciones situadas.
</p>

<p class="parrafo">
  No se trata de una clasificación cerrada. La estructura se actualiza a medida que la obra evoluciona y distingue entre páginas publicadas, desarrollos en curso y líneas de investigación todavía abiertas.
</p>

<section class="work-map-intro" aria-label="Cómo leer el mapa conceptual">
  <p class="work-map-intro__statement">
    La clasificación no busca fijar definitivamente estas prácticas, sino registrar sus desplazamientos entre investigación, intervención, oficio, territorio y circulación institucional.
  </p>
  <p class="work-map-intro__statement">
    Los nodos sin enlace no son errores ni páginas faltantes: señalan categorías que continúan desarrollándose o preguntas que aún no han tomado una forma editorial definitiva.
  </p>

  <div class="work-map-legend" aria-label="Estados del mapa">
    <div class="work-map-legend__item">
      <span class="work-map-legend__mark" aria-hidden="true"></span>
      <span class="work-map-legend__copy"><strong>Publicado</strong><span>Obra, serie, categoría o archivo disponible para explorar.</span></span>
    </div>
    <div class="work-map-legend__item work-map-legend__item--developing">
      <span class="work-map-legend__mark" aria-hidden="true"></span>
      <span class="work-map-legend__copy"><strong>En desarrollo</strong><span>Desarrollo reconocido dentro de la práctica, todavía sin página propia.</span></span>
    </div>
    <div class="work-map-legend__item work-map-legend__item--research">
      <span class="work-map-legend__mark" aria-hidden="true"></span>
      <span class="work-map-legend__copy"><strong>Línea de investigación</strong><span>Pregunta o campo abierto que orienta trabajo futuro.</span></span>
    </div>
  </div>
</section>

<hr class="separador" />

<h2 class="subtitulo">Representación del mundo</h2>

<div class="mermaid">
graph LR
  A((Representación del mundo)) --> A1((Lo tangible))
  A --> A2((Lo intangible))

  A1 --> A1a((La saturación))
  A1a --> A1a1([La peste])
  A1a1 --> A1a1a([Pinturas infectadas])
  A1a1a --> A1a1a1([Soportes tradicionales])
  A1a1a --> A1a1a2([Soportes blandos])

  A1a1a1 --> ST_OP([Obras propias])
  A1a1a1 --> ST_OA([Obras ajenas])

  A1a1a2 --> SB_MEM([Membranas])
  A1a1a2 --> SB_MOD([Módulos])
  A1a1a2 --> SB_PU([Página única])

  A1a1 --> A1a1b([Desplazamiento de la pintura])
  A1a1b --> A1a1b1([Espacio doméstico])
  A1a1b --> A1a1b2([Espacio público])
  A1a1b --> A1a1b3([Espacio rural / natural])

  A1a1b1 --> ED_OBJ([Objetos])
  A1a1b1 --> ED_HAB([Habitaciones])

  A1a --> A1a2([Lo invisible])
  A1a2 --> A1a2a([Pinturas Wi-Fi])
  A1a2a --> PW_RET([Retratos])
  A1a2a --> PW_PAI([Paisajes])
  A1a2a --> PW_BOD([Bodegones])

  A1 --> A1b((La tecnología))
  A1b --> A1b1([La IA])
  A1b --> A1b2([Lo espacial])
  A1b --> A1b3([Telecomunicaciones])

  A2 --> A2a((El capitalismo))
  A2a --> A2a1([El Colgado])
  A2a --> A2a2([Mr. Burns])
  A2a --> A2a3([El Empaquetador])

  A2 --> A2b((Lo popular))
  A2b --> A2b1([Esculturas])
  A2b1 --> A2b1a([Papelucho])

  A2 --> A2c((Lo ancestral))
  A2c --> A2c1([Musoe a Cielo Abierto])
  A2c --> A2c2([Mapuche Urbano: La Tala de la Memoria])

  classDef published fill:#1c1f24,stroke:#dedede,color:#f7f7f7,stroke-width:1.35px;
  classDef developing fill:#17191d,stroke:#b9975b,color:#f2eadb,stroke-width:1.35px,stroke-dasharray:6 4;
  classDef research fill:#111318,stroke:#6f89a6,color:#dbe4ee,stroke-width:1.2px,stroke-dasharray:2 5;

  class A,A1,A2,A1a,A1a1,A1a1a,A1a1a1,A1a1a2,ST_OP,ST_OA,SB_MEM,SB_MOD,SB_PU,A1a1b,A1a1b1,A1a1b2,A1a1b3,ED_OBJ,ED_HAB,A1a2,A1a2a,PW_RET,PW_PAI,PW_BOD,A2a,A2a1,A2a2,A2a3,A2b,A2b1a,A2c,A2c1,A2c2 published;
  class A2b1 developing;
  class A1b,A1b1,A1b2,A1b3 research;

  click A "/ES/mundo-exterior.html" "Ir a Representación del mundo"
  click A1 "/ES/tangible.html" "Ir a Lo tangible"
  click A2 "/ES/intangible.html" "Ir a Lo intangible"
  click A1a "/ES/saturacion.html" "Ir a La saturación"
  click A1a1 "/ES/la-peste.html" "Ir a La peste"
  click A1a1a "/ES/peste-pinturas-infectadas.html" "Ir a Pinturas infectadas"
  click A1a1a1 "/ES/peste-pinturas-infectadas.html#soportes-tradicionales" "Ir a Soportes tradicionales"
  click ST_OP "/ES/peste-pinturas-infectadas.html#producciones" "Ir a Obras propias"
  click ST_OA "/ES/peste-pinturas-infectadas.html#intervenciones" "Ir a Obras ajenas"
  click A1a1a2 "/ES/peste-pinturas-infectadas.html#soportes-blandos" "Ir a Soportes blandos"
  click SB_MEM "/ES/peste-pinturas-infectadas.html#membranas" "Ir a Membranas"
  click SB_MOD "/ES/peste-pinturas-infectadas.html#modulos" "Ir a Módulos"
  click SB_PU "/ES/peste-pinturas-infectadas.html#unidades" "Ir a Página única"
  click A1a1b "/ES/desplazamiento-pintura.html" "Ir a Desplazamiento de la pintura"
  click A1a1b1 "/ES/espacio-domestico.html" "Ir a Espacio doméstico"
  click A1a1b2 "/ES/espacio-publico.html" "Ir a Espacio público"
  click A1a1b3 "/ES/espacio-rural.html" "Ir a Espacio rural / natural"
  click ED_OBJ "/ES/espacio-domestico.html#objetos" "Ir a Objetos"
  click ED_HAB "/ES/espacio-domestico.html#habitaciones" "Ir a Habitaciones"
  click A1a2 "/ES/lo-invisible.html" "Ir a Lo invisible"
  click A1a2a "/ES/pinturas-wifi.html" "Ir a Pinturas Wi-Fi"
  click PW_RET "/ES/pinturas-wifi.html#retratos" "Ir a Retratos"
  click PW_PAI "/ES/pinturas-wifi.html#paisajes" "Ir a Paisajes"
  click PW_BOD "/ES/pinturas-wifi.html#bodegones" "Ir a Bodegones"
  click A2a "/ES/imagenes-capitalismo.html" "Ir a Imágenes del capitalismo"
  click A2a1 "/ES/el-colgado.html" "Ir a El Colgado"
  click A2a2 "/ES/mr-burns-en-chile.html" "Ir a Mr. Burns en Chile"
  click A2a3 "/ES/el-empaquetador.html" "Ir a El Empaquetador"
  click A2b "/ES/imagenes-popular.html" "Ir a Imágenes de lo popular"
  click A2b1a "/ES/papelucho.html" "Ir a Papelucho"
  click A2c "/ES/imagenes-ancestros.html" "Ir a Imágenes de lo ancestral"
  click A2c1 "/ES/musoe-a-cielo-abierto.html" "Ir a Musoe a Cielo Abierto"
  click A2c2 "/ES/mapuche-urbano.html" "Ir a Mapuche Urbano"
</div>

<hr class="separador" />

<h2 class="subtitulo">Acción en el mundo</h2>

<div class="mermaid">
graph LR
  B((Acción en el mundo)) --> B1((Lo subrepticio))
  B1 --> B1a([Remiendas urbanas])
  B1 --> B1b([Antipublicidad])
  B1 --> B1c([Graffiti y tags])

  B1b --> B1b1([PP Series])
  B1b --> B1b2([Serie de los Carteles])
  B1b --> B1b3([Piratería publicitaria])

  B --> B2((Lo comunitario))
  B2 --> B2a([Muralismo])

  B --> B3((Docencia y talleres))
  B3 --> B3a([Mineduc])
  B3 --> B3b([Corporaciones])
  B3 --> B3c([Independientes])

  B --> B4((Servicios))
  B4 --> B4a([Restauración])
  B4 --> B4b([Encargos])
  B4 --> B4c([Asesorías técnicas])

  classDef published fill:#1c1f24,stroke:#dedede,color:#f7f7f7,stroke-width:1.35px;
  classDef developing fill:#17191d,stroke:#b9975b,color:#f2eadb,stroke-width:1.35px,stroke-dasharray:6 4;

  class B,B1,B1a,B1b,B1c,B2,B3,B4,B4a,B4b published;
  class B1b1,B1b2,B1b3,B2a,B3a,B3b,B3c,B4c developing;

  click B "/ES/accion.html" "Ir a Acción en el mundo"
  click B1 "/ES/subrepticio.html" "Ir a Lo subrepticio"
  click B1a "/ES/subrep-remiendas-urbanas.html" "Ir a Remiendas urbanas"
  click B1b "/ES/serie-antipublicidad.html" "Ir a Antipublicidad"
  click B1c "/ES/subrep-graffiti.html" "Ir a Graffiti y tags"
  click B2 "/ES/comunitario.html" "Ir a Lo comunitario"
  click B3 "/ES/docencia.html" "Ir a Docencia y talleres"
  click B4 "/ES/servicios.html" "Ir a Servicios"
  click B4a "/ES/servicios.html#restauracion" "Ir a Restauración"
  click B4b "/ES/servicios.html#encargos" "Ir a Encargos"
</div>

<hr class="separador" />

<h2 class="subtitulo">Mundo interior</h2>

<div class="mermaid">
graph LR
  C((Mundo interior)) --> C1((Arte y psicología))
  C --> C2((Arte y espiritualidad))

  classDef published fill:#1c1f24,stroke:#dedede,color:#f7f7f7,stroke-width:1.35px;
  classDef research fill:#111318,stroke:#6f89a6,color:#dbe4ee,stroke-width:1.2px,stroke-dasharray:2 5;

  class C published;
  class C1,C2 research;

  click C "/ES/interior.html" "Ir a Mundo interior"
</div>
