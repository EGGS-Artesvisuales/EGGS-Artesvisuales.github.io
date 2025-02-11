document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!navToggle || !navMenu) {
    console.warn("⚠️ Elementos del menú no encontrados.");
    return;
  }

  // Función para cerrar el menú
  const closeMenu = () => {
    navMenu.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  };

  // Función para alternar (abrir/cerrar) el menú
  const toggleMenu = () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  };

  navToggle.addEventListener("click", toggleMenu);

  // Cerrar el menú al hacer clic en cualquiera de sus enlaces
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Cerrar el menú al presionar la tecla "Escape"
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });
});
