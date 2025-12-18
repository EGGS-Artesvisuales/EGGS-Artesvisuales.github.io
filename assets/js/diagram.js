(function () {

  function bindMermaidInteractivity() {
    document.querySelectorAll('.node a').forEach(link => {
      // Evita duplicar listeners
      if (link.dataset.bound === "true") return;

      link.dataset.bound = "true";
      link.addEventListener('click', () => {
        console.log(`Navegando a: ${link.title}`);
      });
    });
  }

  function renderMermaid() {
    if (!window.mermaid) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: 'default'
    });

    mermaid.run({
      querySelector: '.mermaid'
    }).then(() => {
      // Mermaid ya terminó → ahora sí existe el SVG
      bindMermaidInteractivity();
    });
  }

  // Render cuando el navegador esté libre (NO bloquea carga)
  if ('requestIdleCallback' in window) {
    requestIdleCallback(renderMermaid, { timeout: 1200 });
  } else {
    setTimeout(renderMermaid, 200);
  }

})();
