document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    // Función para alternar el menú
    const toggleMenu = () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));

      navMenu.classList.toggle("active"); // Alternar visibilidad
      document.body.classList.toggle("no-scroll"); // Evitar scroll en móviles
    };

    // Evento para abrir/cerrar el menú al hacer clic en el botón hamburguesa
    navToggle.addEventListener("click", toggleMenu);

    // Cerrar el menú al hacer clic en un enlace
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      });
    });

    // Cerrar el menú con la tecla "Esc"
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      }
    });
  } else {
    console.warn("⚠️ Elementos del menú no encontrados.");
  }
});
