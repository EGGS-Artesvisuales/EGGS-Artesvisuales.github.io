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
    navToggle.focus(); // Devuelve el foco al botón del menú
  };

  // Función para alternar (abrir/cerrar) el menú
  const toggleMenu = () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");

    // Si se abre el menú, coloca el foco en el primer enlace
    if (!isExpanded) {
      const firstLink = navMenu.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    }
  };

  // Abrir/cerrar el menú con un clic
  navToggle.addEventListener("click", toggleMenu);

  // Permitir abrir/cerrar el menú con teclado en el botón de menú
  navToggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // Previene acciones por defecto (como scroll en "Espacio")
      toggleMenu();
    }
  });

  // Cerrar el menú al hacer clic en cualquiera de sus enlaces
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Permitir la navegación interna del menú con las teclas de flecha
  navMenu.addEventListener("keydown", (event) => {
    const links = Array.from(navMenu.querySelectorAll("a"));
    const currentIndex = links.indexOf(document.activeElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % links.length;
      links[nextIndex].focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + links.length) % links.length;
      links[prevIndex].focus();
    }
  });

  // Cerrar el menú al presionar la tecla "Escape"
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });
});
