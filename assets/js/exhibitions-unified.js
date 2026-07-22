(() => {
  const supportedPaths = new Set([
    "/ES/exhibiciones.html",
    "/EN/exhibitions.html",
    "/MPD/exhibiciones.html",
    "/CHN/exhibiciones.html"
  ]);

  function languageCopy() {
    const path = window.location.pathname;

    if (path.startsWith("/EN/")) {
      return {
        eyebrow: "Complete record",
        title: "Exhibition timeline",
        intro: "All exhibitions, residencies, workshops and festivals are gathered here in a single chronological line.",
        fallbackCategory: "Exhibition milestone"
      };
    }

    if (path.startsWith("/MPD/")) {
      return {
        eyebrow: "Kom txawün wirin",
        title: "Pengelün ñi txipantu rüpü",
        intro: "Kom pengelün, residencia, workshop ka festival kiñe müten txipantu rüpü mew txawüley.",
        fallbackCategory: "Pengelün ñi hito"
      };
    }

    if (path.startsWith("/CHN/")) {
      return {
        eyebrow: "完整记录",
        title: "展览时间线",
        intro: "所有展览、驻地、工作坊和节庆活动都汇集在一条连续的时间线上。",
        fallbackCategory: "展览节点"
      };
    }

    return {
      eyebrow: "Archivo completo",
      title: "Línea de tiempo expositiva",
      intro: "Todas las exhibiciones, residencias, workshops y festivales se reúnen aquí en una sola línea cronológica.",
      fallbackCategory: "Hito expositivo"
    };
  }

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function categoryFor(container, fallback) {
    let sibling = container.previousElementSibling;

    while (sibling) {
      if (/^H[23]$/.test(sibling.tagName)) {
        const label = cleanText(sibling.textContent);
        if (label) return label;
      }
      sibling = sibling.previousElementSibling;
    }

    const section = container.closest("section");
    const heading = section?.querySelector(":scope > h2, :scope > h3");
    return cleanText(heading?.textContent) || fallback;
  }

  function yearSortValue(label) {
    const values = String(label || "").match(/\d{4}/g) || [];
    return values.length ? Math.max(...values.map(Number)) : -Infinity;
  }

  function buildEvent(entry, year, category, index) {
    const titleNode = entry.querySelector(".fun-button");
    const textNode = entry.querySelector(".text-container p");
    const imageNode = entry.querySelector(".text-container img");

    const title = cleanText(titleNode?.textContent);
    const description = cleanText(textNode?.textContent);
    const imageSrc = imageNode?.getAttribute("src") || "";
    const isGenericLogo = /EGGSLOGOindex1\.png$/i.test(imageSrc);

    return {
      year,
      category,
      title,
      description,
      imageSrc: isGenericLogo ? "" : imageSrc,
      imageAlt: cleanText(imageNode?.getAttribute("alt")),
      sortValue: yearSortValue(year),
      index
    };
  }

  function collectEvents(copy) {
    const containers = [...document.querySelectorAll(".timeline-container")];
    const events = [];
    let index = 0;

    containers.forEach((container) => {
      const category = categoryFor(container, copy.fallbackCategory);

      container.querySelectorAll(".year").forEach((yearGroup) => {
        const year = cleanText(yearGroup.dataset.year);

        yearGroup.querySelectorAll(":scope > .entry").forEach((entry) => {
          const event = buildEvent(entry, year, category, index++);
          if (event.title || event.description) events.push(event);
        });
      });
    });

    return events.sort((a, b) => {
      if (b.sortValue !== a.sortValue) return b.sortValue - a.sortValue;
      return a.index - b.index;
    });
  }

  function createEventElement(event) {
    const item = document.createElement("li");
    item.className = "exhibitions-event";

    const year = document.createElement("div");
    year.className = "exhibitions-event__year";
    year.textContent = event.year;

    const axis = document.createElement("div");
    axis.className = "exhibitions-event__axis";
    axis.setAttribute("aria-hidden", "true");

    const marker = document.createElement("span");
    marker.className = "exhibitions-event__marker";
    axis.append(marker);

    const card = document.createElement("article");
    card.className = "exhibitions-event__card";

    const category = document.createElement("p");
    category.className = "exhibitions-event__category";
    category.textContent = event.category;
    card.append(category);

    if (event.title) {
      const title = document.createElement("h3");
      title.textContent = event.title;
      card.append(title);
    }

    if (event.description) {
      const description = document.createElement("p");
      description.textContent = event.description;
      card.append(description);
    }

    if (event.imageSrc) {
      const media = document.createElement("figure");
      media.className = "exhibitions-event__media";

      const image = document.createElement("img");
      image.src = event.imageSrc;
      image.alt = event.imageAlt || event.title;
      image.loading = "lazy";
      media.append(image);
      card.append(media);
    }

    item.append(year, axis, card);
    return item;
  }

  function buildUnifiedTimeline(events, copy) {
    const section = document.createElement("section");
    section.className = "exhibitions-unified";
    section.setAttribute("aria-labelledby", "exhibitions-unified-title");

    const header = document.createElement("header");
    header.className = "exhibitions-unified__header";

    const headingGroup = document.createElement("div");

    const eyebrow = document.createElement("p");
    eyebrow.className = "exhibitions-unified__eyebrow";
    eyebrow.textContent = copy.eyebrow;

    const title = document.createElement("h2");
    title.id = "exhibitions-unified-title";
    title.textContent = copy.title;

    headingGroup.append(eyebrow, title);

    const intro = document.createElement("p");
    intro.className = "exhibitions-unified__intro";
    intro.textContent = copy.intro;

    header.append(headingGroup, intro);

    const list = document.createElement("ol");
    list.className = "exhibitions-line";
    events.forEach((event) => list.append(createEventElement(event)));

    section.append(header, list);
    return section;
  }

  function initialize() {
    if (!supportedPaths.has(window.location.pathname)) return;

    const firstTimeline = document.querySelector(".timeline-container");
    if (!firstTimeline) return;

    const copy = languageCopy();
    const events = collectEvents(copy);
    if (!events.length) return;

    const originalSections = new Set(
      [...document.querySelectorAll(".timeline-container")]
        .map((container) => container.closest("section"))
        .filter(Boolean)
    );

    const firstSection = firstTimeline.closest("section");
    const unifiedTimeline = buildUnifiedTimeline(events, copy);
    firstSection?.before(unifiedTimeline);

    originalSections.forEach((section) => section.remove());
    document.body.classList.add("exhibitions-enhanced");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
