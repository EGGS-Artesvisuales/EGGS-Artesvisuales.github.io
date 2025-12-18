document.addEventListener("DOMContentLoaded", () => {
  if (typeof mermaid === "undefined") return;

  mermaid.initialize({
    startOnLoad: true,
    theme: "base",
    themeVariables: {
      primaryColor: "#f5f5f5",
      primaryTextColor: "#111",
      primaryBorderColor: "#111",
      lineColor: "#111",
      fontFamily: "inherit",
      fontSize: "16px"
    }
  });
});
