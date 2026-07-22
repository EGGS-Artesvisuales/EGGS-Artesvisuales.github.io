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
  stylesheet.href = "/assets/css/work-map.css?v=20260722-2";
  document.head.append(stylesheet);

  const researchIds = new Set(["A1b", "A1b1", "A1b2", "A1b3", "C1", "C2"]);

  const localizedCopy = {
    "/EN/work-diagram.html": {
      title: "Conceptual work map",
      subtitle: "Ideas, relationships, series and research lines",
      statement1: "This classification does not seek to fix the practice permanently. It records movements between research, intervention, craft, territory and institutional circulation.",
      statement2: "Nodes without links are not errors or missing pages. They indicate developments in progress or questions that have not yet taken a definitive editorial form.",
      published: "Published",
      publishedText: "Artwork, series, category or archive available to explore.",
      developing: "In development",
      developingText: "A recognized development within the practice that does not yet have its own page.",
      research: "Research line",
      researchText: "An open question or field guiding future work."
    },
    "/MPD/diagrama.html": {
      title: "Küdaw ñi mapa conceptual",
      subtitle: "Rakizuam, trafün, series ka investigación rüpü",
      statement1: "Fachi clasificación küdaw ñi az müten kütralelafuy. Kimelkey investigación, intervención, oficio, mapu ka institución mew amulechi ñi weichan ka desplazamiento.",
      statement2: "Enlace nielu no mülechi nodo error gelay. Fey tüfachi petu txemkülechi desarrollo kam petu página küme dewmanoal rakizuam rüpü kimelkey.",
      published: "Pegelgechi",
      publishedText: "Küdaw, serie, categoría kam archivo kintual mülelu.",
      developing: "Petu txemküley",
      developingText: "Práctica mew kimelgechi desarrollo, welu petu ñi página nielay.",
      research: "Investigación rüpü",
      researchText: "Nülalechi ramtun kam püle, we küdaw amulnieal."
    },
    "/CHN/diagrama.html": {
      title: "作品概念地图",
      subtitle: "观念、关系、系列与研究线索",
      statement1: "这套分类并不试图永久固定创作实践，而是记录研究、介入、技艺、地域与制度传播之间的移动关系。",
      statement2: "没有链接的节点并非错误或缺失页面，而是表示仍在发展中的方向，或尚未形成最终编辑形态的问题。",
      published: "已发布",
      publishedText: "可继续浏览的作品、系列、类别或档案。",
      developing: "发展中",
      developingText: "已被纳入创作结构，但尚未拥有独立页面的发展方向。",
      research: "研究线索",
      researchText: "引导未来工作的开放问题或领域。"
    }
  };

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

  function createLegend(copy) {
    const section = document.createElement("section");
    section.className = "work-map-intro";
    section.setAttribute("aria-label", copy.title);
    section.innerHTML = `
      <p class="work-map-intro__statement">${copy.statement1}</p>
      <p class="work-map-intro__statement">${copy.statement2}</p>
      <div class="work-map-legend" aria-label="${copy.title}">
        <div class="work-map-legend__item">
          <span class="work-map-legend__mark" aria-hidden="true"></span>
          <span class="work-map-legend__copy"><strong>${copy.published}</strong><span>${copy.publishedText}</span></span>
        </div>
        <div class="work-map-legend__item work-map-legend__item--developing">
          <span class="work-map-legend__mark" aria-hidden="true"></span>
          <span class="work-map-legend__copy"><strong>${copy.developing}</strong><span>${copy.developingText}</span></span>
        </div>
        <div class="work-map-legend__item work-map-legend__item--research">
          <span class="work-map-legend__mark" aria-hidden="true"></span>
          <span class="work-map-legend__copy"><strong>${copy.research}</strong><span>${copy.researchText}</span></span>
        </div>
      </div>`;
    return section;
  }

  function localizeMapIntroduction() {
    const copy = localizedCopy[window.location.pathname];
    if (!copy) return;

    const heading = document.querySelector("main h1, main .titulo");
    const subtitle = heading?.nextElementSibling;
    if (heading) heading.textContent = copy.title;
    if (subtitle && subtitle.matches("h2, .subtitulo")) subtitle.textContent = copy.subtitle;
    document.title = `${copy.title} – EGGS-Studio`;

    if (document.querySelector(".work-map-intro")) return;
    const firstSeparator = document.querySelector("main .separador");
    if (firstSeparator) firstSeparator.before(createLegend(copy));
  }

  function prepareWorkMaps() {
    localizeMapIntroduction();
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
