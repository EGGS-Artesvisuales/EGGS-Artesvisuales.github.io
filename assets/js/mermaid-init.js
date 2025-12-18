document.addEventListener("DOMContentLoaded", () => {
  if (typeof mermaid === "undefined") return;

  mermaid.initialize({
    startOnLoad: true,
    theme: "base",
    flowchart: { htmlLabels: false } // evita dobles textos por foreignObject
  });
});
