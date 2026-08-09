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

  const explicitDiagrams = {
    "/es/espacio-domestico.html": `flowchart LR
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
      click A "/es/mundo-exterior.html" "Ir a Representación del mundo"
      click A1 "/es/tangible.html" "Ir a Lo tangible"
      click A2 "/es/intangible.html" "Ir a Lo intangible"
      click A1a "/es/saturacion.html" "Ir a La Saturación"
      click A1a1 "/es/la-peste.html" "Ir a La Peste"
      click A1a2 "/es/lo-invisible.html" "Ir a Lo Invisible"
      click A1a1b "/es/desplazamiento-pintura.html" "Ir a Desplazamiento de la pintura"
      click A1a1c "/es/peste-pinturas-infectadas.html" "Ir a Pinturas Infectadas"
      click D1 "/es/espacio-domestico.html" "Ir a Espacios domésticos"
      click D2 "/es/espacio-publico.html" "Ir a Espacio público"
      click D3 "/es/espacio-rural.html" "Ir a Espacio rural y natural"
      click D1a "/es/espacio-domestico.html#objetos" "Ver objetos"
      click D1b "/es/espacio-domestico.html#habitaciones" "Ver habitaciones"
      click A1b "/es/en-construccion.html" "Ir a La Tecnología"`,

    "/en/domestic-space.html": `flowchart LR
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
      click A "/en/world-representation.html" "Go to Representation of the world"
      click A1 "/en/tangible.html" "Go to The tangible"
      click A2 "/en/intangible.html" "Go to The intangible"
      click A1a "/en/saturation.html" "Go to Saturation"
      click A1a1 "/en/the-plague.html" "Go to The Plague"
      click A1a2 "/en/the-invisible.html" "Go to The Invisible"
      click A1a1b "/en/displacement-of-painting.html" "Go to Displacement of Painting"
      click A1a1c "/en/infected-paintings.html" "Go to Infected Paintings"
      click D1 "/en/domestic-space.html" "Go to Domestic Spaces"
      click D2 "/en/public-space.html" "Go to Public Space"
      click D3 "/en/rural-space.html" "Go to Rural and Natural Space"
      click D1a "/en/domestic-space.html#objects" "See objects"
      click D1b "/en/domestic-space.html#rooms" "See rooms"`,

    "/mpd/espacio-domestico.html": `flowchart LR
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
      click A "/mpd/mundo-exterior.html" "Amun: Wallmapu ñi azentun"
      click A1 "/mpd/tangible.html" "Amun: Kalül mew"
      click A2 "/mpd/intangible.html" "Amun: Püllü mew"
      click A1a "/mpd/saturacion.html" "Amun: Fentepun"
      click A1a1 "/mpd/la-peste.html" "Amun: Kutxan"
      click A1a2 "/mpd/lo-invisible.html" "Amun: Pengekenon"
      click A1a1b "/mpd/desplazamiento-pintura.html" "Amun: Desplazamiento de la Pintura"
      click A1a1c "/mpd/peste-pinturas-infectadas.html" "Amun: Kutxan Pinturas"
      click D1 "/mpd/espacio-domestico.html" "Amun: Püles ruka mew"
      click D2 "/mpd/espacio-publico.html" "Amun: Püle fütra che mew"
      click D3 "/mpd/espacio-rural.html" "Amun: Püle mapu lof mew"
      click D1a "/mpd/espacio-domestico.html#objetos" "Adkintun: objetos"
      click D1b "/mpd/espacio-domestico.html#habitaciones" "Adkintun: habitaciones"
      click A1b "/mpd/en-construccion.html" "Amun: Teknologia"`,

    "/chn/espacio-domestico.html": `flowchart LR
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
      click A "/chn/mundo-exterior.html" "前往世界的再现"
      click A1 "/chn/tangible.html" "前往有形"
      click A2 "/chn/intangible.html" "前往无形"
      click A1a "/chn/saturacion.html" "前往饱和"
      click A1a1 "/chn/la-peste.html" "前往瘟疫"
      click A1a2 "/chn/lo-invisible.html" "前往不可见"
      click A1a1b "/chn/desplazamiento-pintura.html" "前往绘画的位移"
      click A1a1c "/chn/peste-pinturas-infectadas.html" "前往感染的绘画"
      click D1 "/chn/espacio-domestico.html" "前往家庭空间"
      click D2 "/chn/espacio-publico.html" "前往公共空间"
      click D3 "/chn/espacio-rural.html" "前往乡村与自然空间"
      click D1a "/chn/espacio-domestico.html#objetos" "查看物体"
      click D1b "/chn/espacio-domestico.html#habitaciones" "查看房间"
      click A1b "/chn/en-construccion.html" "前往技术"`
  };

  const explicitPaths = new Set(Object.keys(explicitDiagrams));
  const nodeIdPattern = "[A-Za-z_][A-Za-z0-9_-]*";

  function normalizePath(pathname) {
    let path = decodeURIComponent(pathname || "/");
    path = path.replace(/\/{2,}/g, "/");
    if (path.length > 1) path = path.replace(/\/$/, "");
    return path;
  }

  function cleanLabel(rawLabel) {
    let label = String(rawLabel || "").trim();

    if (
      (label.startsWith('"') && label.endsWith('"')) ||
      (label.startsWith("'") && label.endsWith("'"))
    ) {
      label = label.slice(1, -1);
    }

    return label
      .replace(/#quot;|&quot;/g, '"')
      .replace(/<br\s*\/?\s*>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeText(value) {
    return cleanLabel(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim()
      .toLowerCase();
  }

  function collectNodeLabels(source) {
    const labels = new Map();
    const patterns = [
      new RegExp(`\\b(${nodeIdPattern})\\s*\\(\\(([^\\r\\n]*?)\\)\\)`, "g"),
      new RegExp(`\\b(${nodeIdPattern})\\s*\\(\\[([^\\r\\n]*?)\\]\\)`, "g"),
      new RegExp(`\\b(${nodeIdPattern})\\s*\\[([^\\r\\n]*?)\\]`, "g"),
      new RegExp(`\\b(${nodeIdPattern})\\s*\\((?![\\(\\[])([^\\r\\n]*?)\\)`, "g")
    ];

    patterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(source)) !== null) {
        if (!labels.has(match[1])) labels.set(match[1], cleanLabel(match[2]));
      }
    });

    return labels;
  }

  function collectParents(source) {
    const parents = new Map();
    const edgePattern = /(?:-->|==>|-\.->|---)/;

    source.split(/\r?\n/).forEach((line) => {
      const uncommented = line.replace(/%%.*$/, "");
      if (!edgePattern.test(uncommented)) return;

      const segments = uncommented.split(edgePattern);
      for (let index = 0; index < segments.length - 1; index += 1) {
        const parentSegment = segments[index]
          .replace(/^\s*\|[^|]*\|\s*/, "")
          .trim();
        const childSegment = segments[index + 1]
          .replace(/^\s*\|[^|]*\|\s*/, "")
          .trim();

        const parentMatch = parentSegment.match(new RegExp(`^(${nodeIdPattern})`));
        const childMatch = childSegment.match(new RegExp(`^(${nodeIdPattern})`));
        if (!parentMatch || !childMatch) continue;

        const parentId = parentMatch[1];
        const childId = childMatch[1];
        if (!parents.has(childId)) parents.set(childId, new Set());
        parents.get(childId).add(parentId);
      }
    });

    return parents;
  }

  function collectCurrentNodes(source, labels) {
    const currentPath = normalizePath(window.location.pathname);
    const currentNodes = new Set();
    const clickPattern = new RegExp(
      `^\\s*click\\s+(${nodeIdPattern})\\s+(?:href\\s+)?["']([^"']+)["']`,
      "gm"
    );

    let clickMatch;
    while ((clickMatch = clickPattern.exec(source)) !== null) {
      const target = clickMatch[2];
      if (!target || target.startsWith("#")) continue;

      try {
        const targetUrl = new URL(target, window.location.href);
        if (targetUrl.origin !== window.location.origin || targetUrl.hash) continue;
        if (normalizePath(targetUrl.pathname) === currentPath) {
          currentNodes.add(clickMatch[1]);
        }
      } catch (_error) {
        /* Un objetivo no URL puede ser una función Mermaid; se ignora. */
      }
    }

    if (currentNodes.size > 0) return currentNodes;

    const heading = document.querySelector("main h1, h1.titulo, h1");
    const normalizedHeading = normalizeText(heading?.textContent || "");
    if (!normalizedHeading) return currentNodes;

    labels.forEach((label, nodeId) => {
      const normalizedLabel = normalizeText(label);
      if (!normalizedLabel) return;

      const exactMatch = normalizedLabel === normalizedHeading;
      const containedMatch =
        normalizedLabel.length >= 5 &&
        (normalizedHeading.includes(normalizedLabel) || normalizedLabel.includes(normalizedHeading));

      if (exactMatch || containedMatch) currentNodes.add(nodeId);
    });

    return currentNodes;
  }

  function convertNodeToCircle(source, nodeId, label) {
    const escapedId = nodeId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const nodeShapePattern = new RegExp(
      `\\b${escapedId}(?![A-Za-z0-9_-])\\s*(?:\\(\\([^\\r\\n]*?\\)\\)|\\(\\[[^\\r\\n]*?\\]\\)|\\[[^\\r\\n]*?\\]|\\((?![\\(\\[])[^\\r\\n]*?\\))`,
      "g"
    );
    const safeLabel = cleanLabel(label || nodeId).replace(/"/g, "#quot;");
    const circleDeclaration = `${nodeId}(("${safeLabel}"))`;
    let replaced = false;

    const updatedSource = source.replace(nodeShapePattern, () => {
      replaced = true;
      return circleDeclaration;
    });

    return replaced ? updatedSource : `${updatedSource}\n  ${circleDeclaration}`;
  }

  function highlightActiveBranch(source) {
    const labels = collectNodeLabels(source);
    const currentNodes = collectCurrentNodes(source, labels);
    if (currentNodes.size === 0) return source;

    const parents = collectParents(source);
    const activeNodes = new Set(currentNodes);

    currentNodes.forEach((nodeId) => {
      parents.get(nodeId)?.forEach((parentId) => activeNodes.add(parentId));
    });

    let highlightedSource = source;
    activeNodes.forEach((nodeId) => {
      highlightedSource = convertNodeToCircle(
        highlightedSource,
        nodeId,
        labels.get(nodeId) || nodeId
      );
    });

    return highlightedSource;
  }

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
    if (!explicitPaths.has(window.location.pathname)) return;

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

      const explicitSource = explicitDiagrams[window.location.pathname];
      const source = explicitSource || diagram.textContent || "";
      const normalizedSource = normalizeGenericSource(source);
      diagram.textContent = highlightActiveBranch(normalizedSource);
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
