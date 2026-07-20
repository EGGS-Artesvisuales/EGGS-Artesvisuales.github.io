(function () {
  "use strict";

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase();
  }

  document.querySelectorAll("[data-store-catalog]").forEach(function (catalog) {
    var search = catalog.querySelector("[data-store-search]");
    var category = catalog.querySelector("[data-store-category]");
    var mode = catalog.querySelector("[data-store-mode]");
    var sort = catalog.querySelector("[data-store-sort]");
    var reset = catalog.querySelector("[data-store-reset]");
    var status = catalog.querySelector("[data-store-status]");
    var empty = catalog.querySelector("[data-store-empty]");
    var more = catalog.querySelector("[data-store-more]");
    var results = catalog.querySelector("[data-store-results]");
    var shortcuts = Array.prototype.slice.call(catalog.querySelectorAll("[data-store-shortcut]"));
    var cards = Array.prototype.slice.call(catalog.querySelectorAll("[data-store-card]"));
    var pageSize = Number(catalog.dataset.pageSize) || 12;
    var visibleLimit = pageSize;

    cards.forEach(function (card, index) {
      card.dataset.originalOrder = String(index);
      card.dataset.normalizedSearch = normalize(card.dataset.search);
      card.dataset.normalizedTitle = normalize(card.dataset.title);
    });

    function compareCards(a, b) {
      if (sort.value === "price-asc") {
        return Number(a.dataset.price) - Number(b.dataset.price);
      }
      if (sort.value === "price-desc") {
        return Number(b.dataset.price) - Number(a.dataset.price);
      }
      if (sort.value === "year-desc") {
        return Number(b.dataset.year) - Number(a.dataset.year);
      }
      if (sort.value === "title-asc") {
        return a.dataset.normalizedTitle.localeCompare(b.dataset.normalizedTitle);
      }
      return Number(a.dataset.originalOrder) - Number(b.dataset.originalOrder);
    }

    function render() {
      var query = normalize(search.value.trim());
      var matching = cards.filter(function (card) {
        var matchesText = !query || card.dataset.normalizedSearch.indexOf(query) !== -1;
        var matchesCategory = category.value === "all" || card.dataset.category === category.value;
        var matchesMode = mode.value === "all" || card.dataset.mode === mode.value;
        return matchesText && matchesCategory && matchesMode;
      }).sort(compareCards);

      cards.slice().sort(compareCards).forEach(function (card) {
        results.appendChild(card);
        card.hidden = true;
      });

      matching.forEach(function (card, index) {
        card.hidden = index >= visibleLimit;
      });

      var shown = Math.min(visibleLimit, matching.length);
      status.textContent = catalog.dataset.resultsTemplate
        .replace("{shown}", String(shown))
        .replace("{total}", String(matching.length));
      empty.hidden = matching.length !== 0;
      more.hidden = shown >= matching.length;

      shortcuts.forEach(function (button) {
        button.setAttribute("aria-pressed", String(category.value === button.dataset.storeShortcut));
      });
    }

    function resetLimitAndRender() {
      visibleLimit = pageSize;
      render();
    }

    search.addEventListener("input", resetLimitAndRender);
    category.addEventListener("change", resetLimitAndRender);
    mode.addEventListener("change", resetLimitAndRender);
    sort.addEventListener("change", resetLimitAndRender);

    reset.addEventListener("click", function () {
      search.value = "";
      category.value = "all";
      mode.value = "all";
      sort.value = "default";
      resetLimitAndRender();
      search.focus();
    });

    shortcuts.forEach(function (button) {
      button.addEventListener("click", function () {
        category.value = category.value === button.dataset.storeShortcut ? "all" : button.dataset.storeShortcut;
        resetLimitAndRender();
        results.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    more.addEventListener("click", function () {
      visibleLimit += pageSize;
      render();
    });

    render();
  });
})();
