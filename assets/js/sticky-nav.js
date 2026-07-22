(() => {
  const desktopQuery = window.matchMedia("(min-width: 902px)");

  function initializeStickyNavigation() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    let ticking = false;
    let lastScrollY = window.scrollY;

    const interactionIsActive = () =>
      navbar.matches(":hover") ||
      navbar.matches(":focus-within") ||
      Boolean(navbar.querySelector(".dropdown.active, .dropdown-sub.active"));

    const updateNavigation = () => {
      ticking = false;

      if (!desktopQuery.matches) {
        navbar.classList.remove("navbar--condensed", "navbar--expanded");
        lastScrollY = window.scrollY;
        return;
      }

      const currentScrollY = Math.max(0, window.scrollY);
      const passedHeader = currentScrollY > 150;
      const movingUp = currentScrollY < lastScrollY - 3;
      const nearTop = currentScrollY < 48;
      const active = interactionIsActive();

      navbar.classList.toggle("navbar--condensed", passedHeader && !nearTop);
      navbar.classList.toggle("navbar--expanded", active || movingUp || nearTop);

      lastScrollY = currentScrollY;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateNavigation);
    };

    navbar.addEventListener("mouseenter", requestUpdate, { passive: true });
    navbar.addEventListener("mouseleave", requestUpdate, { passive: true });
    navbar.addEventListener("focusin", requestUpdate);
    navbar.addEventListener("focusout", requestUpdate);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    desktopQuery.addEventListener?.("change", requestUpdate);

    updateNavigation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeStickyNavigation, { once: true });
  } else {
    initializeStickyNavigation();
  }
})();
