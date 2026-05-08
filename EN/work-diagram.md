---
layout: default-en
title: Work Diagram
permalink: /EN/work-diagram.html
mermaid: true
---

<div class="titulo">Work Diagram</div>
<div class="subtitulo">
  A visual map of ideas, concepts, and artistic works.
</div>
<p class="parrafo">
  The three categories of my artistic practice are presented in the diagrams. Each category acts as a main axis that connects to its respective series of works and projects. These connections highlight the links between my conceptual, technical, and thematic explorations, reflecting the breadth and depth of my artistic work.
</p>
<p class="parrafo">
  This scheme not only organizes my creative process but also illustrates how core ideas and concepts transform into diverse artistic expressions, providing a comprehensive and coherent vision of my visual practice.
</p>

<!-- 1) Representation of the World -->
<div class="subtitulo">Representation of the World</div>
<div class="mermaid">
graph LR
  A((Representation of the World)) --> A1((The Tangible))
  A --> A2((The Intangible))

  A1 --> A1a((Saturation))
  A1a --> A1a1([The Plague])
  A1a1 --> A1a1a([Infected Paintings])
  A1a1a --> A1a1a1([Traditional Supports])
  A1a1a --> A1a1a2([Soft Supports])

  A1a1a1 --> ST_OP([Own Works])
  A1a1a1 --> ST_OA([Other Works])

  A1a1a2 --> SB_MEM([Membranes])
  A1a1a2 --> SB_MOD([Modules])
  A1a1a2 --> SB_PU([Single Page])

  A1a1 --> A1a1b([Displacement of Painting])
  A1a1b --> A1a1b1([Domestic Space])
  A1a1b --> A1a1b2([Public Space])
  A1a1b --> A1a1b3([Rural / Natural Space])

  A1a1b1 --> ED_OBJ([Objects])
  A1a1b1 --> ED_HAB([Rooms])

  A1a --> A1a2([The Invisible])
  A1a2 --> A1a2a([Wi-Fi Paintings])

  A1a2a --> PW_RET([Portraits])
  A1a2a --> PW_PAI([Landscapes])
  A1a2a --> PW_BOD([Still Lifes])

  A1 --> A1b((Technology))
  A1b --> A1b1([AI])
  A1b --> A1b2([The Spatial])
  A1b --> A1b3([Telecommunications])

  A2 --> A2a((Capitalism))
  A2a --> A2a1([The Hanged Man])
  A2a --> A2a2([Mr. Burns])
  A2a --> A2a3([The Packer])

  A2 --> A2b((The Popular))
  A2b --> A2b1([Sculptures])
  A2b1 --> A2b1a([Papelucho])

  A2 --> A2c((The Ancestral))
  A2c --> A2c1([Open-Air Museum])
  A2c --> A2c2([Urban Mapuche, The Logging of Memory])

  %% Existing links
  click A "/EN/world-representation.html" "Go to Representation of the World"
  click A1 "/EN/tangible.html" "Go to The Tangible"
  click A2 "/EN/intangible.html" "Go to The Intangible"
  click A1a "/EN/saturation.html" "Go to Saturation"
  click A1a1b "/EN/displacement-of-painting.html" "Go to Displacement of Painting"
  click A2a "/EN/images-of-capitalism.html" "Go to Images of Capitalism"
  click A2b "/EN/images-of-the-popular.html" "Go to Images of the Popular"
  click A2c "/EN/images-of-the-ancestors.html" "Go to Images of the Ancestors"
  click A2c1 "/EN/open-air-museum.html" "Go to Open-Air Museum"

  %% Not yet existing -> under construction
  click A1a1 "/EN/the-plague.html" "Go to The Plague"
  click A1a1a "/EN/infected-paintings.html" "Go to Infected Paintings"
  click A1a1a1 "/EN/infected-paintings.html#traditional-supports" "Go to Traditional Supports"
  click ST_OP "/EN/infected-paintings.html#productions" "Go to Own Works"
  click ST_OA "/EN/infected-paintings.html#interventions" "Go to Other Works"
  click A1a1a2 "/EN/infected-paintings.html#soft-supports" "Go to Soft Supports"
  click SB_MEM "/EN/infected-paintings.html#membranes" "Go to Membranes"
  click SB_MOD "/EN/infected-paintings.html#modules" "Go to Modules"
  click SB_PU "/EN/infected-paintings.html#units" "Go to Units"
  click A1a1b1 "/EN/domestic-space.html" "Go to Domestic Space"
  click A1a1b2 "/EN/public-space.html" "Go to Public Space"
  click A1a1b3 "/EN/rural-natural-space.html" "Go to Rural / Natural Space"
  click ED_OBJ "/EN/domestic-space.html#objects" "Go to Objects"
  click ED_HAB "/EN/domestic-space.html#rooms" "Go to Rooms"
  click A1a2 "/EN/the-invisible.html" "Go to The Invisible"
  click A1a2a "/EN/wifi-paintings.html" "Go to Wi-Fi Paintings"
  click PW_RET "/EN/wifi-paintings.html#portraits" "Go to Portraits"
  click PW_PAI "/EN/wifi-paintings.html#landscapes" "Go to Landscapes"
  click PW_BOD "/EN/wifi-paintings.html#still-lifes" "Go to Still Lifes"
  click A1b "/EN/under-construction.html" "Under construction"
  click A1b1 "/EN/under-construction.html" "Under construction"
  click A1b2 "/EN/under-construction.html" "Under construction"
  click A1b3 "/EN/under-construction.html" "Under construction"
  click A2a1 "/EN/under-construction.html" "Under construction"
  click A2a2 "/EN/under-construction.html" "Under construction"
  click A2a3 "/EN/under-construction.html" "Under construction"
  click A2b1 "/EN/under-construction.html" "Under construction"
  click A2b1a "/EN/under-construction.html" "Under construction"
  click A2c2 "/EN/urban-mapuche.html" "Go to Urban Mapuche"
</div>

<!-- 2) Action in the World -->
<div class="subtitulo">Action in the World</div>
<div class="mermaid">
graph LR
  B((Action in the World)) --> B1((The Surreptitious))
  B1 --> B1a([Urban Mending])
  B1 --> B1b([Anti-Advertising])
  B1 --> B1c([Graffiti & Tags])

  B1b --> B1b1([PP series])
  B1b --> B1b2([Posters])
  B1b --> B1b3([Advertising Piracy])

  B --> B2((The Community))
  B2 --> B2a([Muralism])

  B --> B3((Teaching and Workshops))
  B3 --> B3a([Mineduc])
  B3 --> B3b([Corporations])
  B3 --> B3c([Independents])

  B --> B4((Services))
  B4 --> B4a([Restoration])
  B4 --> B4b([Decorations & Commissions])
  B4 --> B4c([Technical Consulting])

  %% Existing links
  click B "/EN/action.html" "Go to Action in the World"
  click B1 "/EN/subreptitious.html" "Go to The Surreptitious"
  click B1a "/EN/sub-urban-mending.html" "Go to Urban Mending"
  click B1b "/EN/sub-anti-advertising.html" "Go to Anti-Advertising"
  click B2 "/EN/community.html" "Go to The Community"
  click B3 "/EN/teaching.html" "Go to Teaching and Workshops"
  click B4 "/EN/services.html" "Go to Services"

  %% Not yet existing -> under construction
  click B1c "/EN/sub-graffiti.html" "Go to Graffiti and Tags"
  click B1b1 "/EN/under-construction.html" "Under construction"
  click B1b2 "/EN/under-construction.html" "Under construction"
  click B1b3 "/EN/under-construction.html" "Under construction"
  click B2a "/EN/under-construction.html" "Under construction"
  click B3a "/EN/under-construction.html" "Under construction"
  click B3b "/EN/under-construction.html" "Under construction"
  click B3c "/EN/under-construction.html" "Under construction"
  click B4a "/EN/under-construction.html" "Under construction"
  click B4b "/EN/under-construction.html" "Under construction"
  click B4c "/EN/under-construction.html" "Under construction"
</div>

<!-- 3) Exploration of the Inner World -->
<div class="subtitulo">Exploration of the Inner World</div>
<div class="mermaid">
graph LR
  C((Exploration of the Inner World)) --> C1((Art and Psychology))
  C --> C2((Art and Spirituality))

  %% Existing links
  click C "/EN/inner-world.html" "Go to Exploration of the Inner World"

  %% Not yet existing -> under construction
  click C1 "/EN/under-construction.html" "Under construction"
  click C2 "/EN/under-construction.html" "Under construction"
</div>
