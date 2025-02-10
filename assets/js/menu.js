document.addEventListener("DOMContentLoaded", function() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    // Función para alternar el menú
    const toggleMenu = () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));

      navToggle.classList.toggle("active"); // Activar/desactivar icono
      navMenu.classList.toggle("active");   // Mostrar/ocultar menú
      document.body.classList.toggle("no-scroll"); // Evitar scroll
    };

    // Evento para abrir/cerrar el menú al hacer clic en el botón
    navToggle.addEventListener("click", toggleMenu);

    // Cerrar menú al hacer clic en un enlace
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      });
    });

    // Cerrar menú con la tecla "Esc"
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      }
    });
  } else {
    console.warn("⚠️ Elementos del menú no encontrados. Verifica que .nav-toggle y .nav-menu existen en el DOM.");
  }
});

