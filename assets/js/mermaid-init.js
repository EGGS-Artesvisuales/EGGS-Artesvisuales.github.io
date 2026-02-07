document.addEventListener("DOMContentLoaded", async () => {
  if (typeof window.mermaid === "undefined") return;

  window.mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    securityLevel: "loose",
    flowchart: { htmlLabels: false }
  });

  await window.mermaid.run({ querySelector: ".mermaid" });
});
