document.addEventListener("DOMContentLoaded", async () => {
  if (typeof window.mermaid === "undefined") return;

  /*
   * Mermaid 10 puede interpretar barras, paréntesis y otros caracteres
   * dentro de etiquetas no citadas como parte de la sintaxis del nodo.
   * Normalizamos las etiquetas tipo stadium: ([Texto]) -> (["Texto"]).
   */
  document.querySelectorAll(".mermaid").forEach((diagram) => {
    const source = diagram.textContent || "";

    const normalized = source.replace(
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

    diagram.textContent = normalized;
  });

  window.mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    securityLevel: "loose",
    flowchart: { htmlLabels: false }
  });

  await window.mermaid.run({ querySelector: ".mermaid" });
});
