document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const backgroundElements = document.querySelectorAll("main, footer");
  const focusableElements = 'a, button, input, textarea, select';
  let firstFocusableElement, lastFocusableElement;

  if (!navToggle || !navMenu) {
    console.warn("⚠️ Elementos del menú no encontrados.");
    return;
  }

  const disableBackground = () => {
    backgroundElements.forEach(el => {
      el.setAttribute("inert", "true");
      el.setAttribute("aria-hidden", "true");
    });
  };

  const enableBackground = () => {
    backgroundElements.forEach(el => {
      el.removeAttribute("inert");
      el.removeAttribute("aria-hidden");
    });
  };

  const toggleScrollLock = (lock) => {
    document.body.classList.toggle("no-scroll", lock);
  };

  const setFocusableElements = () => {
    const focusable = navMenu.querySelectorAll(focusableElements);
    firstFocusableElement = focusable[0];
    lastFocusableElement = focusable[focusable.length - 1];
  };

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

  const closeMenu = () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    toggleScrollLock(false);
    enableBackground();
    document.removeEventListener("keydown", trapFocus);
    document.removeEventListener("click", closeOnClickOutside);
  };

  const toggleMenu = () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navToggle.classList.toggle("active");
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

  const closeOnClickOutside = (event) => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      closeMenu();
    }
  };

  // Manejo de menús desplegables en móviles (nivel 1 y submenús)
  const initDropdownToggle = (selector) => {
    document.querySelectorAll(selector).forEach(link => {
      link.addEventListener('click', (e) => {
        const parent = link.parentElement;
        if (window.innerWidth <= 901) {
          e.preventDefault();
          parent.classList.toggle('active');
        }
      });
    });
  };

  initDropdownToggle('.dropdown > a');
  initDropdownToggle('.dropdown-sub > a');

  // Cerrar dropdowns activos si se hace clic fuera (solo móviles)
  document.addEventListener('click', (event) => {
    if (window.innerWidth > 901) return;

    document.querySelectorAll('.dropdown.active, .dropdown-sub.active').forEach(dropdown => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
      }
    });
  });

  // Toggle desde botón hamburguesa
  navToggle.addEventListener("click", toggleMenu);
  navToggle.addEventListener("keydown", (event) => {
    if (["Enter", " "].includes(event.key)) {
      event.preventDefault();
      toggleMenu();
    }
  });

  // Cierre automático al hacer clic en links (solo si no tienen submenú)
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
      const parent = link.parentElement;
      const hasSubmenu = parent.classList.contains("dropdown") || parent.classList.contains("dropdown-sub");
      if (!hasSubmenu) closeMenu();
    });
  });

  // Navegación con flechas dentro del menú
  navMenu.addEventListener("keydown", (event) => {
    const links = Array.from(navMenu.querySelectorAll("a")).filter(link => getComputedStyle(link).display !== "none");
    const currentIndex = links.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    if (["ArrowDown", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      links[(currentIndex + 1) % links.length].focus();
    } else if (["ArrowUp", "ArrowLeft"].includes(event.key)) {
      event.preventDefault();
      links[(currentIndex - 1 + links.length) % links.length].focus();
    }
  });

  // Escape cierra el menú
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });
});
