(() => {
  if (typeof window.mermaid === "undefined") return;

  /*
   * Los scripts se cargan con defer. Esta inicialización debe ejecutarse
   * inmediatamente, antes de DOMContentLoaded, para impedir que Mermaid
   * procese los diagramas con su startOnLoad predeterminado.
   */
  window.mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    securityLevel: "loose",
    flowchart: { htmlLabels: false }
  });

  function normalizeMermaidSource(source) {
    /*
     * Mermaid 10 interpreta barras, paréntesis y otros caracteres dentro
     * de etiquetas no citadas como sintaxis. Normalizamos los nodos tipo
     * stadium: ([Texto]) -> (["Texto"]).
     */
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

  async function renderMermaidDiagrams() {
    const diagrams = document.querySelectorAll(".mermaid");
    if (!diagrams.length) return;

    diagrams.forEach((diagram) => {
      const source = diagram.textContent || "";
      diagram.removeAttribute("data-processed");
      diagram.textContent = normalizeMermaidSource(source);
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
