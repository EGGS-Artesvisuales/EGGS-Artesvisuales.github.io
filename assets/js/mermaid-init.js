(() => {
  if (typeof window.mermaid === "undefined") return;

  window.mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    securityLevel: "loose",
    flowchart: {
      htmlLabels: false,
      useMaxWidth: true,
      curve: "basis"
    }
  });

  const domesticDiagrams = {
    "/ES/espacio-domestico.html": `flowchart LR
      A["Representación del mundo"] --> A1["Lo tangible"]
      A --> A2["Lo intangible"]
      A1 --> A1a["La Saturación"]
      A1 --> A1b["La Tecnología"]
      A1a --> A1a1["La Peste"]
      A1a --> A1a2["Lo Invisible"]
      A1a1 --> A1a1b["Desplazamiento de la pintura"]
      A1a1 --> A1a1c["Pinturas Infectadas"]
      A1a1b --> D1["Espacios domésticos"]
      A1a1b --> D2["Espacio público"]
      A1a1b --> D3["Espacio rural y natural"]
      D1 --> D1a["Objetos"]
      D1 --> D1b["Habitaciones"]
      click A "/ES/mundo-exterior.html" "Ir a Representación del mundo"
      click A1 "/ES/tangible.html" "Ir a Lo tangible"
      click A2 "/ES/intangible.html" "Ir a Lo intangible"
      click A1a "/ES/saturacion.html" "Ir a La Saturación"
      click A1a1 "/ES/la-peste.html" "Ir a La Peste"
      click A1a2 "/ES/lo-invisible.html" "Ir a Lo Invisible"
      click A1a1b "/ES/desplazamiento-pintura.html" "Ir a Desplazamiento de la pintura"
      click A1a1c "/ES/peste-pinturas-infectadas.html" "Ir a Pinturas Infectadas"
      click D1 "/ES/espacio-domestico.html" "Ir a Espacios domésticos"
      click D2 "/ES/espacio-publico.html" "Ir a Espacio público"
      click D3 "/ES/espacio-rural.html" "Ir a Espacio rural y natural"
      click D1a "/ES/espacio-domestico.html#objetos" "Ver objetos"
      click D1b "/ES/espacio-domestico.html#habitaciones" "Ver habitaciones"
      click A1b "/ES/en-construccion.html" "Ir a La Tecnología"`,

    "/EN/domestic-space.html": `flowchart LR
      A["Representation of the world"] --> A1["The tangible"]
      A --> A2["The intangible"]
      A1 --> A1a["Saturation"]
      A1 --> A1b["Technology"]
      A1a --> A1a1["The Plague"]
      A1a --> A1a2["The Invisible"]
      A1a1 --> A1a1b["Displacement of Painting"]
      A1a1 --> A1a1c["Infected Paintings"]
      A1a1b --> D1["Domestic Spaces"]
      A1a1b --> D2["Public Space"]
      A1a1b --> D3["Rural and Natural Space"]
      D1 --> D1a["Objects"]
      D1 --> D1b["Rooms"]
      click A "/EN/world-representation.html" "Go to Representation of the world"
      click A1 "/EN/tangible.html" "Go to The tangible"
      click A2 "/EN/intangible.html" "Go to The intangible"
      click A1a "/EN/saturation.html" "Go to Saturation"
      click A1a1 "/EN/the-plague.html" "Go to The Plague"
      click A1a2 "/EN/the-invisible.html" "Go to The Invisible"
      click A1a1b "/EN/displacement-of-painting.html" "Go to Displacement of Painting"
      click A1a1c "/EN/infected-paintings.html" "Go to Infected Paintings"
      click D1 "/EN/domestic-space.html" "Go to Domestic Spaces"
      click D2 "/EN/public-space.html" "Go to Public Space"
      click D3 "/EN/rural-space.html" "Go to Rural and Natural Space"
      click D1a "/EN/domestic-space.html#objects" "See objects"
      click D1b "/EN/domestic-space.html#rooms" "See rooms"`,

    "/MPD/espacio-domestico.html": `flowchart LR
      A["Wallmapu ñi azentun"] --> A1["Kalül mew"]
      A --> A2["Püllü mew"]
      A1 --> A1a["Fentepun"]
      A1 --> A1b["Teknologia"]
      A1a --> A1a1["Kutxan"]
      A1a --> A1a2["Pengekenon"]
      A1a1 --> A1a1b["Desplazamiento de la Pintura"]
      A1a1 --> A1a1c["Kutxan Pinturas"]
      A1a1b --> D1["Püles ruka mew"]
      A1a1b --> D2["Püle fütra che mew"]
      A1a1b --> D3["Püle mapu lof mew"]
      D1 --> D1a["Objetos"]
      D1 --> D1b["Habitaciones"]
      click A "/MPD/mundo-exterior.html" "Amun: Wallmapu ñi azentun"
      click A1 "/MPD/tangible.html" "Amun: Kalül mew"
      click A2 "/MPD/intangible.html" "Amun: Püllü mew"
      click A1a "/MPD/saturacion.html" "Amun: Fentepun"
      click A1a1 "/MPD/la-peste.html" "Amun: Kutxan"
      click A1a2 "/MPD/lo-invisible.html" "Amun: Pengekenon"
      click A1a1b "/MPD/desplazamiento-pintura.html" "Amun: Desplazamiento de la Pintura"
      click A1a1c "/MPD/peste-pinturas-infectadas.html" "Amun: Kutxan Pinturas"
      click D1 "/MPD/espacio-domestico.html" "Amun: Püles ruka mew"
      click D2 "/MPD/espacio-publico.html" "Amun: Püle fütra che mew"
      click D3 "/MPD/espacio-rural.html" "Amun: Püle mapu lof mew"
      click D1a "/MPD/espacio-domestico.html#objetos" "Adkintun: objetos"
      click D1b "/MPD/espacio-domestico.html#habitaciones" "Adkintun: habitaciones"
      click A1b "/MPD/en-construccion.html" "Amun: Teknologia"`,

    "/CHN/espacio-domestico.html": `flowchart LR
      A["世界的再现"] --> A1["有形"]
      A --> A2["无形"]
      A1 --> A1a["饱和"]
      A1 --> A1b["技术"]
      A1a --> A1a1["瘟疫"]
      A1a --> A1a2["不可见"]
      A1a1 --> A1a1b["绘画的位移"]
      A1a1 --> A1a1c["感染的绘画"]
      A1a1b --> D1["家庭空间"]
      A1a1b --> D2["公共空间"]
      A1a1b --> D3["乡村与自然空间"]
      D1 --> D1a["物体"]
      D1 --> D1b["房间"]
      click A "/CHN/mundo-exterior.html" "前往世界的再现"
      click A1 "/CHN/tangible.html" "前往有形"
      click A2 "/CHN/intangible.html" "前往无形"
      click A1a "/CHN/saturacion.html" "前往饱和"
      click A1a1 "/CHN/la-peste.html" "前往瘟疫"
      click A1a2 "/CHN/lo-invisible.html" "前往不可见"
      click A1a1b "/CHN/desplazamiento-pintura.html" "前往绘画的位移"
      click A1a1c "/CHN/peste-pinturas-infectadas.html" "前往感染的绘画"
      click D1 "/CHN/espacio-domestico.html" "前往家庭空间"
      click D2 "/CHN/espacio-publico.html" "前往公共空间"
      click D3 "/CHN/espacio-rural.html" "前往乡村与自然空间"
      click D1a "/CHN/espacio-domestico.html#objetos" "查看物体"
      click D1b "/CHN/espacio-domestico.html#habitaciones" "查看房间"
      click A1b "/CHN/en-construccion.html" "前往技术"`
  };

  const domesticPaths = new Set(Object.keys(domesticDiagrams));

  function normalizeGenericSource(source) {
    return source.replace(
      /\(\[([^\]\r\n]+)\]\)/g,
      (match, rawLabel) => {
        const label = rawLabel.trim();
        if (
          (label.startsWith('"') && label.endsWith('"')) ||
          (label.startsWith("'") && label.endsWith("'"))
        ) {
          return match;
        }
        return `(["${label.replace(/"/g, "#quot;")}"])`;
      }
    );
  }

  function cleanDomesticContent() {
    if (!domesticPaths.has(window.location.pathname)) return;

    document
      .querySelectorAll('section[aria-label="Estructura de la serie"]')
      .forEach((section) => section.remove());

    document.querySelectorAll("p.parrafo").forEach((paragraph) => {
      paragraph.childNodes.forEach((node) => {
        if (node.nodeType !== Node.TEXT_NODE) return;
        node.textContent = node.textContent.replace(
          "El diagrama inicial sitúa",
          "El siguiente diagrama sitúa"
        );
      });
    });
  }

  async function renderMermaidDiagrams() {
    cleanDomesticContent();

    const diagrams = document.querySelectorAll(".mermaid");
    if (!diagrams.length) return;

    diagrams.forEach((diagram) => {
      diagram.removeAttribute("data-processed");
      const explicitDomesticSource = domesticDiagrams[window.location.pathname];
      diagram.textContent = explicitDomesticSource || normalizeGenericSource(diagram.textContent || "");
    });

    try {
      await window.mermaid.run({ querySelector: ".mermaid" });
    } catch (error) {
      console.error("No fue posible renderizar el diagrama Mermaid:", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderMermaidDiagrams, { once: true });
  } else {
    renderMermaidDiagrams();
  }
})();
