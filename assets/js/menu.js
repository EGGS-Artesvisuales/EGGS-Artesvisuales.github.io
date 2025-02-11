document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  // Selecciona los elementos de fondo que se deben inactivar cuando el menú esté abierto.
  const backgroundElements = document.querySelectorAll("header, main, footer");

  if (!navToggle || !navMenu) {
    console.warn("⚠️ Elementos del menú no encontrados.");
    return;
  }

  // Función para desactivar la interactividad del fondo
  const disableBackground = () => {
    backgroundElements.forEach(el => {
      el.setAttribute("inert", ""); // Hace que el elemento y sus hijos no reciban foco
      el.setAttribute("aria-hidden", "true");
    });
  };

  // Función para reactivar el fondo
  const enableBackground = () => {
    backgroundElements.forEach(el => {
      el.removeAttribute("inert");
      el.removeAttribute("aria-hidden");
    });
  };

  // Función para cerrar el menú
  const closeMenu = () => {
    navMenu.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
    enableBackground();
    navToggle.focus(); // Devuelve el foco al botón de menú
  };

  // Función para alternar (abrir/cerrar) el menú
  const toggleMenu = () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");

    if (!isExpanded) {
      disableBackground();
      // Al abrir el menú, colocar el foco en el primer enlace
      const firstLink = navMenu.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    } else {
      enableBackground();
    }
  };

  // Abrir/cerrar el menú al hacer clic en el botón
  navToggle.addEventListener("click", toggleMenu);

  // Permitir abrir/cerrar el menú con teclado (Enter o Espacio) en el botón
  navToggle.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
    }
  });

  // Cerrar el menú al hacer clic en cualquiera de sus enlaces
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Navegación interna del menú con flechas (Arriba/Abajo y Izquierda/Derecha)
  navMenu.addEventListener("keydown", event => {
    const links = Array.from(navMenu.querySelectorAll("a"));
    const currentIndex = links.indexOf(document.activeElement);

    if (["ArrowDown", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % links.length;
      links[nextIndex].focus();
    } else if (["ArrowUp", "ArrowLeft"].includes(event.key)) {
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
