---
layout: default
title: Diagrama de Obra
permalink: /diagrama.html
mermaid: true
breadcrumbs: >
  <a href="/index.html">Inicio</a> >
  <span>Diagrama de Obra</span>
---

<div class="content">
    <h1>Diagrama de Obra</h1>
    <p>Un mapa visual de las ideas, conceptos y obras artísticas que estructuran nuestro enfoque, dividido en tres secciones para mayor claridad.</p>

    <h2>Representación del Mundo</h2>
    <div class="mermaid">
       %%{init: {'flowchart': {'nodeSpacing': 50, 'rankSpacing': 70}} }%%
graph TB
    A[Representación del Mundo]
    A --> A1[Lo Tangible]
    A --> A2[Lo Intangible]
    
    %% Rama Lo Tangible
    A1 --> A1a[La Saturación]
    A1 --> A1b[La Tecnología]
    
    %% Subrama Saturación
    A1a --> A1a1[La Peste]
    A1a --> A1a2[Lo Invisible]
    
    %% Peste detalle
    A1a1 --> A1a1a[Pinturas]
    A1a1 --> A1a1b[Desplazamiento de la Pintura]
    
    %% Pinturas detalle
    A1a1a --> A1a1a1[Pinturas Infectadas<br>2008/2010]
    A1a1a --> A1a1a2[Soportes Blandos<br>2008/2020]
    
    %% Desplazamiento detalle
    A1a1b --> A1a1b1[Intervenciones/<br>Instalaciones]
    A1a1b --> A1a1b2[Multimedia/Video]
    
    %% Lo Invisible detalle
    A1a2 --> A1a2a[Pinturas Wi-Fi<br>2020 - 2030]
    
    %% Tecnología detalle
    A1b --> A1b1[La IA]
    A1b --> A1b2[Lo Espacial]
    A1b --> A1b3[Telecomunicaciones]
    
    %% Rama Lo Intangible
    A2 --> A2a[El Capitalismo]
    A2 --> A2b[Lo Popular]
    A2 --> A2c[Lo Ancestral]
    
    %% Capitalismo detalle
    A2a --> A2a1[El Colgado<br>2012-2020]
    A2a --> A2a2[Mr. Burns<br>2012-2019]
    A2a --> A2a3[El Empaquetador/<br>Contaminador/Contador]
    
    %% Popular detalle
    A2b --> A2b1[Esculturas]
    A2b1 --> A2b1a[Papelucho, 2022]
    
    %% Ancestral detalle
    A2c --> A2c1[Museo a Cielo Abierto<br>2018-2021]
    A2c --> A2c2[Mapuche Urbano<br>La Tala de la Memoria, 2018]
    
    %% Estilo
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px
    </div>

    <h2>Acción en el Mundo</h2>
    <div class="mermaid">
        %%{init: {'flowchart': {'nodeSpacing': 45, 'rankSpacing': 60}} }%%
graph TB
    B[Acción en el Mundo]
    B --> B1[Lo Subrepticio]
    B --> B2[Lo Comunitario]
    B --> B3[Docencia y Talleres]
    B --> B4[Servicios]
    
    %% Subrepticio
    B1 --> B1a[Remiendas Urbanas]
    B1 --> B1b[La Anti-Publicidad]
    B1 --> B1c[Graffiti & Tags]
    
    %% Comunitario
    B2 --> B2a[Muralismo]
    
    %% Docencia
    B3 --> B3a[Mineduc]
    B3 --> B3b[Corporaciones]
    B3 --> B3c[Independientes]
    
    %% Servicios
    B4 --> B4a[Restauración]
    B4 --> B4b[Decoraciones & Encargo]
    B4 --> B4c[Asesorías Técnicas]
    
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px
    </div>

    <h2>Exploración del Mundo Interior</h2>
    <div class="mermaid">
        %%{init: {'flowchart': {'nodeSpacing': 40, 'rankSpacing': 50}} }%%
graph TB
    C[Exploración del Mundo Interior]
    C --> C1[Arte y Psicología]
    C --> C2[Arte y Espiritualidad]
    
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const diagrams = document.querySelectorAll(".mermaid");
            diagrams.forEach(diagram => {
                mermaid.init(undefined, diagram);
            });
        });
    </script>
</div>
