(function () {

  function bindMermaidInteractivity() {
    document.querySelectorAll('.node a').forEach(link => {
      if (link.dataset.bound === "true") return;

      link.dataset.bound = "true";
      link.addEventListener('click', (e) => {
        // Si quieres SOLO log y NO navegar, activa:
        // e.preventDefault();

        console.log(`Navegando a: ${link.getAttribute('href') || link.title || '(sin href)'}`);
      });
    });
  }

  let mermaidInited = false;

  function renderMermaid() {
    if (!window.mermaid) return;

    if (!mermaidInited) {
      const defaultConfig = {
        startOnLoad: false,
        theme: "base",
        flowchart: { htmlLabels: false },
        themeVariables: {
          borderRadius: 10,              // puede suavizar rects, pero NO crea “stadium”
          primaryColor: "#ffffff",
          primaryBorderColor: "#333",
          primaryTextColor: "#111",
          fontFamily: "Inter, system-ui, sans-serif"
        }
      };

      const pageConfig = window.__MERMAID_CONFIG__ || {};
      const mergedConfig = {
        ...defaultConfig,
        ...pageConfig,
        flowchart: {
          ...(defaultConfig.flowchart || {}),
          ...(pageConfig.flowchart || {})
        },
        themeVariables: {
          ...(defaultConfig.themeVariables || {}),
          ...(pageConfig.themeVariables || {})
        }
      };

      mermaid.initialize(mergedConfig);
      mermaidInited = true;
    }

    mermaid.run({ querySelector: '.mermaid' }).then(() => {
      bindMermaidInteractivity();
    });
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(renderMermaid, { timeout: 1200 });
  } else {
    setTimeout(renderMermaid, 200);
  }

})();
