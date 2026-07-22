(() => {
  function keepNavigationVisible() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    navbar.classList.remove("navbar--condensed", "navbar--expanded");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", keepNavigationVisible, { once: true });
  } else {
    keepNavigationVisible();
  }
})();
