(() => {
  function initializePersistentNavigation() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    let ticking = false;

    const updateNavigationState = () => {
      ticking = false;
      navbar.classList.remove("navbar--condensed", "navbar--expanded");
      navbar.classList.toggle("navbar--scrolled", window.scrollY > 24);
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateNavigationState);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    updateNavigationState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePersistentNavigation, { once: true });
  } else {
    initializePersistentNavigation();
  }
})();
