---
layout: default-chn
lang: zh-Hans
title: "作品图谱"
description: "EGGS-Studio 中文页面：作品图谱。"
permalink: /CHN/diagrama.html
es_url: /ES/diagrama.html
en_url: /EN/work-diagram.html
mpd_url: /MPD/diagrama.html
keywords: "EGGS-Studio, Esteban Garnica, 视觉艺术, 壁画, 社区艺术, 智利"
mermaid: true
---


<h1 class="titulo">工作图</h1>
<h2 class="subtitulo">想法、概念和艺术实践的视觉地图</h2>

<p class="parrafo" style="margin-top: 6%;">
  这张图汇集了构成我的艺术实践的主线。每个类别都作为一个概念轴，分为特定的系列、项目和流程。该方案使我们能够直观地看到不同工作领域之间的关系，证明构成我的视觉研究的交叉点、亲和力和发展。
</p>

<p class="parrafo">
  该图不是一个固定的地图，而是一个开放系统。它随着作品的发展而更新和扩展，纳入新的问题、材料和方法。其目的是全面审视我的整个作品，同时考虑到技术和概念。
</p>

<hr class="separador" />

<!-- 1) Representación del Mundo -->
<h2 class="subtitulo">世界的代表</h2>

<div class="mermaid">
graph LR
  A((世界的代表)) --> A1((有形的))
  A --> A2((无形资产))

  A1 --> A1a((饱和))
  A1a --> A1a1([瘟疫])
  A1a1 --> A1a1a([受感染的油漆])
  A1a1a --> A1a1a1([传统支撑])
  A1a1a --> A1a1a2([软支撑])

  %% HIJOS: Soportes tradicionales
  A1a1a1 --> ST_OP([自己的作品])
  A1a1a1 --> ST_OA([别人的作品])

  %% HIJOS: Soportes blandos
  A1a1a2 --> SB_MEM([膜])
  A1a1a2 --> SB_MOD([模块])
  A1a1a2 --> SB_PU([单页])

  A1a1 --> A1a1b([绘画转变])
  A1a1b --> A1a1b1([国内空间])
  A1a1b --> A1a1b2([公共空间])
  A1a1b --> A1a1b3([乡村/自然空间])

  %% HIJOS: Espacio doméstico
  A1a1b1 --> ED_OBJ([对象])
  A1a1b1 --> ED_HAB([客房])

  A1a --> A1a2([看不见])
  A1a2 --> A1a2a([无线网络绘画])

  %% HIJOS: Pinturas Wi-Fi
  A1a2a --> PW_RET([肖像])
  A1a2a --> PW_PAI([风景])
  A1a2a --> PW_BOD([静物画])

  A1 --> A1b((技术))
  A1b --> A1b1([人工智能])
  A1b --> A1b2([空间])
  A1b --> A1b3([电信])

  A2 --> A2a((资本主义))
  A2a --> A2a1([倒吊人])
  A2a --> A2a2([伯恩斯先生])
  A2a --> A2a3([包装工])

  A2 --> A2b((热门))
  A2b --> A2b1([雕塑])
  A2b1 --> A2b1a([帕佩鲁乔])

  A2 --> A2c((祖传))
  A2c --> A2c1([开放天空博物馆])
  A2c --> A2c2([城市马普切人，记忆的倒塌])

  %% Enlaces (现存的)
  click A "mundo-exterior.html" "前往世界代表"
  click A1 "tangible.html" "走向有形"
  click A2 "intangible.html" "走向无形"
  click A1a "saturacion.html" "转到饱和度"
  click A1a1 "la-peste.html" "前往瘟疫"
  click A1a1a "/CHN/peste-pinturas-infectadas.html" "前往受感染的画作"
  click A1a1b "desplazamiento-pintura.html" "转到绘画变换"
  click A1a1b1 "/CHN/espacio-domestico.html" "前往国内空间"
  click A1a1b2 "/CHN/espacio-publico.html" "前往公共空间"
  click A1a1b3 "/CHN/espacio-rural.html" "前往乡村/自然空间"
  click A1a2 "lo-invisible.html" "前往看不见的地方"
  click A2c1 "musoe-a-cielo-abierto.html" "前往开放天空博物馆"

  %% Enlaces a secciones internas (锚点) ya existentes

  %% Pinturas Infectadas: Soportes tradicionales + hijos
  click A1a1a1 "/CHN/peste-pinturas-infectadas.html#soportes-tradicionales" "转到传统支持"
  click ST_OP "/CHN/peste-pinturas-infectadas.html#producciones" "前往自己的作品"
  click ST_OA "/CHN/peste-pinturas-infectadas.html#intervenciones" "去看别人的作品"

  %% Pinturas Infectadas: Soportes blandos + hijos
  click A1a1a2 "/CHN/peste-pinturas-infectadas.html#soportes-blandos" "访问 软支撑"
  click SB_MEM "/CHN/peste-pinturas-infectadas.html#membranas" "前往膜"
  click SB_MOD "/CHN/peste-pinturas-infectadas.html#modulos" "转到模块"
  click SB_PU "/CHN/peste-pinturas-infectadas.html#unidades" "转到单页"

  %% Espacio doméstico: Objetos / Habitaciones
  click ED_OBJ "/CHN/espacio-domestico.html#objetos" "转到对象"
  click ED_HAB "/CHN/espacio-domestico.html#habitaciones" "前往客房"

  %% Pinturas Wi-Fi: página + secciones
  click A1a2a "/CHN/pinturas-wifi.html" "前往 Wi-Fi 绘画"
  click PW_RET "/CHN/pinturas-wifi.html#retratos" "前往肖像"
  click PW_PAI "/CHN/pinturas-wifi.html#paisajes" "前往风景"
  click PW_BOD "/CHN/pinturas-wifi.html#bodegones" "前往博德戈内斯"

  %% Enlaces (no existentes aún -> en construcción)
  click A1b "en-construccion.html" "建设中"
  click A1b1 "en-construccion.html" "建设中"
  click A1b2 "en-construccion.html" "建设中"
  click A1b3 "en-construccion.html" "建设中"
  click A2a "en-construccion.html" "建设中"
  click A2a1 "en-construccion.html" "建设中"
  click A2a2 "en-construccion.html" "建设中"
  click A2a3 "en-construccion.html" "建设中"
  click A2b "en-construccion.html" "建设中"
  click A2b1 "en-construccion.html" "建设中"
  click A2b1a "en-construccion.html" "建设中"
  click A2c "en-construccion.html" "建设中"
  click A2c2 "en-construccion.html" "建设中"
</div>

<hr class="separador" />

<!-- 2) Acción en el Mundo -->
<h2 class="subtitulo">世界行动</h2>

<div class="mermaid">
graph LR
  B((世界行动)) --> B1((鬼鬼祟祟的))
  B1 --> B1a([城市斑块])
  B1 --> B1b([反广告])
  B1 --> B1c([风景\n&标签])

  %% HIJOS: La Anti-Publicidad (新的)
  B1b --> B1b1([PP系列])
  B1b --> B1b2([海报])
  B1b --> B1b3([广告盗版])

  B --> B2((社区))
  B2 --> B2a([壁画主义])

  B --> B3((教学\ny研讨会))
  B3 --> B3a([矿业大学])
  B3 --> B3b([企业])
  B3 --> B3c([独立的])

  B --> B4((服务))
  B4 --> B4a([恢复])
  B4 --> B4b([家具\n&定制])
  B4 --> B4c([技术咨询])

  %% Enlaces (现存的)
  click B "accion.html" "前往世界各地行动"
  click B1 "subrepticio.html" "前往隐秘之地"
  click B1a "subrep-remiendas-urbanas.html" "前往城市补丁"
  click B1b "subrep-antipublicidad.html" "前往反广告"
  click B2 "comunitario.html" "前往社区"
  click B3 "docencia.html" "前往教学和研讨会"
  click B4 "servicios.html" "前往服务"

  %% Enlaces (no existentes aún -> en construcción)
  click B1c "subrep-graffiti.html" "转到涂鸦和标签"
  click B2a "en-construccion.html" "建设中"
  click B3a "en-construccion.html" "建设中"
  click B3b "en-construccion.html" "建设中"
  click B3c "en-construccion.html" "建设中"
  click B4a "en-construccion.html" "建设中"
  click B4b "en-construccion.html" "建设中"
  click B4c "en-construccion.html" "建设中"

  %% Enlaces (nuevos hijos -> en construcción)
  click B1b1 "en-construccion.html" "建设中"
  click B1b2 "en-construccion.html" "建设中"
  click B1b3 "en-construccion.html" "建设中"
</div>

<hr class="separador" />

<!-- 3) Exploración del Mundo Interior -->
<h2 class="subtitulo">内心世界的探索</h2>

<div class="mermaid">
graph LR
  C((内心世界的探索)) --> C1((艺术与心理学))
  C --> C2((艺术与灵性))

  %% Enlaces (现存的)
  click C "interior.html" "走进内心世界的探索"

  %% Enlaces (no existentes aún -> en construcción)
  click C1 "en-construccion.html" "建设中"
  click C2 "en-construccion.html" "建设中"
</div>
