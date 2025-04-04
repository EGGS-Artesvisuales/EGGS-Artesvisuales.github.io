document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const backgroundElements = document.querySelectorAll("#page-wrapper");
  const focusableElements = 'a, button, input, textarea, select';
  let firstFocusableElement, lastFocusableElement;

  if (!navToggle || !navMenu) {
    console.warn("⚠️ Elementos del menú no encontrados.");
    return;
  }

  // 🔹 Deshabilitar interactividad en el fondo
  const disableBackground = () => {
    backgroundElements.forEach(el => {
      el.setAttribute("inert", "true"); 
      el.setAttribute("aria-hidden", "true");
    });
  };

  // 🔹 Reactivar interactividad en el fondo
  const enableBackground = () => {
    backgroundElements.forEach(el => {
      el.removeAttribute("inert");
      el.removeAttribute("aria-hidden");
    });
  };

  // 🔹 Bloquear/desbloquear el scroll de la página
  const toggleScrollLock = (lock) => {
    document.body.classList.toggle("no-scroll", lock);
  };

  // 🔹 Capturar elementos enfocables dentro del menú para navegación accesible
  const setFocusableElements = () => {
    const focusable = navMenu.querySelectorAll(focusableElements);
    firstFocusableElement = focusable[0];
    lastFocusableElement = focusable[focusable.length - 1];
  };

  // 🔹 Manejar el "focus trap" dentro del menú
  const trapFocus = (event) => {
    if (!navMenu.classList.contains("active")) return;

    if (event.key === "Tab") {
      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }
  };

  // 🔹 Cerrar el menú
  const closeMenu = () => {
    navMenu.classList.remove("active");
     navToggle.classList.remove("active"); // 🟢 Cierra el ícono visual también
    navToggle.setAttribute("aria-expanded", "false");
    toggleScrollLock(false);
    enableBackground();
    document.removeEventListener("keydown", trapFocus);
    document.removeEventListener("click", closeOnClickOutside);
    navToggle.focus();
  };

  // 🔹 Abrir/cerrar menú
  const toggleMenu = () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
      navToggle.classList.toggle("active"); // ✅ ESTA LÍNEA FALTABA
    navMenu.classList.toggle("active");
    toggleScrollLock(!isExpanded);

    if (!isExpanded) {
      disableBackground();
      setFocusableElements();
      document.addEventListener("keydown", trapFocus);
      document.addEventListener("click", closeOnClickOutside);
      firstFocusableElement?.focus();
    } else {
      enableBackground();
      closeMenu();
    }
  };

  // 🔹 Cerrar el menú al hacer clic fuera de él
  const closeOnClickOutside = (event) => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      closeMenu();
    }
  };

  // 🔹 Activar submenús en móviles
  const dropdownParents = document.querySelectorAll('.dropdown > a');

  dropdownParents.forEach(link => {
    link.addEventListener('click', (e) => {
      const parent = link.parentElement;
      if (window.innerWidth <= 901) {
        e.preventDefault();
        parent.classList.toggle('active');
      }
    });
  });

  // 🔹 Cerrar submenús al hacer clic fuera (solo en móviles)
  document.addEventListener('click', (event) => {
    if (window.innerWidth > 901) return;

    document.querySelectorAll('.dropdown.active').forEach(dropdown => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
      }
    });
  });

  // 🔹 Eventos
  navToggle.addEventListener("click", toggleMenu);
  navToggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
    }
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // 🔹 Navegación con flechas dentro del menú
  navMenu.addEventListener("keydown", (event) => {
    const links = Array.from(navMenu.querySelectorAll("a")).filter(link => getComputedStyle(link).display !== "none");
    const currentIndex = links.indexOf(document.activeElement);

    if (currentIndex === -1) return;

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

  // 🔹 Cerrar el menú con Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });
});
