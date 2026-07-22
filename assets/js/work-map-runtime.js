(() => {
  const mapPaths = new Set([
    "/ES/diagrama.html",
    "/EN/work-diagram.html",
    "/MPD/diagrama.html",
    "/CHN/diagrama.html"
  ]);

  if (!mapPaths.has(window.location.pathname)) return;

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "/assets/css/work-map.css?v=20260722-1";
  document.head.append(stylesheet);

  const researchIds = new Set(["A1b", "A1b1", "A1b2", "A1b3", "C1", "C2"]);

  function transformDiagramSource(source) {
    const developing = new Set();
    const research = new Set();

    let transformed = source.replace(
      /^\s*click\s+([A-Za-z_][A-Za-z0-9_-]*)\s+["'][^"']*(?:en-construccion|under-construction)[^"']*["'][^\r\n]*$/gim,
      (_line, nodeId) => {
        if (researchIds.has(nodeId)) research.add(nodeId);
        else developing.add(nodeId);
        return "";
      }
    );

    if (window.location.pathname === "/MPD/diagrama.html") {
      transformed = transformed.replace(/Museo a Cielo Abierto/g, "Musoe a Cielo Abierto");
    }

    if (window.location.pathname === "/CHN/diagrama.html") {
      transformed = transformed.replace(/开放天空博物馆/g, "Musoe 露天艺术计划");
    }

    if (developing.size || research.size) {
      if (!/\bclassDef\s+developing\b/.test(transformed)) {
        transformed += "\n  classDef developing fill:#17191d,stroke:#b9975b,color:#f2eadb,stroke-width:1.35px,stroke-dasharray:6 4;";
      }
      if (!/\bclassDef\s+research\b/.test(transformed)) {
        transformed += "\n  classDef research fill:#111318,stroke:#6f89a6,color:#dbe4ee,stroke-width:1.2px,stroke-dasharray:2 5;";
      }
      if (developing.size) transformed += `\n  class ${[...developing].join(",")} developing;`;
      if (research.size) transformed += `\n  class ${[...research].join(",")} research;`;
    }

    return transformed;
  }

  function prepareWorkMaps() {
    document.querySelectorAll(".mermaid").forEach((diagram) => {
      diagram.textContent = transformDiagramSource(diagram.textContent || "");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", prepareWorkMaps, { once: true });
  } else {
    prepareWorkMaps();
  }
})();
