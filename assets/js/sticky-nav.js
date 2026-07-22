(() => {
  function initializePersistentNavigation() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const placeholder = document.createElement("div");
    placeholder.className = "nav-sticky-placeholder";
    placeholder.setAttribute("aria-hidden", "true");
    navbar.parentNode.insertBefore(placeholder, navbar);

    let ticking = false;
    let anchorTop = 0;

    const measure = () => {
      const wasPinned = navbar.classList.contains("navbar--pinned");
      if (wasPinned) navbar.classList.remove("navbar--pinned");

      placeholder.style.height = "0px";
      anchorTop = navbar.getBoundingClientRect().top + window.scrollY;

      if (wasPinned) {
        navbar.classList.add("navbar--pinned");
        placeholder.style.height = `${navbar.offsetHeight}px`;
      }
    };

    const updateNavigationState = () => {
      ticking = false;

      const shouldPin = window.scrollY >= anchorTop;
      navbar.classList.toggle("navbar--pinned", shouldPin);
      navbar.classList.toggle("navbar--scrolled", shouldPin || window.scrollY > 24);
      placeholder.style.height = shouldPin ? `${navbar.offsetHeight}px` : "0px";
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateNavigationState);
    };

    const recalculate = () => {
      measure();
      updateNavigationState();
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", recalculate, { passive: true });
    window.addEventListener("load", recalculate, { once: true });

    measure();
    updateNavigationState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePersistentNavigation, { once: true });
  } else {
    initializePersistentNavigation();
  }
})();
