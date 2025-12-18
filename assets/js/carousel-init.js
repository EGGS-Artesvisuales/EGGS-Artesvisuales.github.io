$(document).ready(function () {

  // Guard: si Owl no está cargado, no habrá carrusel (y todo se verá “en lista”)
  if (!$.fn || !$.fn.owlCarousel) {
    console.error("OwlCarousel NO está cargado. Revisa orden de scripts: jQuery -> owl.carousel -> carousel-init.js");
    return;
  }

  /* ============================================================
     Refresh robusto (fix “colapso/50% hasta click”)
  ============================================================ */
  function forceOwlRefresh($c) {
    if (!$c || !$c.length) return;
    $c.trigger("invalidate.owl.carousel");
    $c.trigger("refresh.owl.carousel");
  }

  // Refrescar cuando las imágenes del carrusel hayan cargado (robusto)
  function refreshWhenImagesReady($car) {
    const $imgs = $car.find("img");
    if (!$imgs.length) {
      forceOwlRefresh($car);
      return;
    }

    let pending = 0;

    $imgs.each(function () {
      // ya cargada (o cache)
      if (this.complete && this.naturalWidth > 0) return;

      pending++;
      $(this).one("load error", function () {
        pending--;
        if (pending === 0) forceOwlRefresh($car);
      });
    });

    if (pending === 0) forceOwlRefresh($car);
  }

  // Backups globales (por fuentes/layout tardío)
  function globalRefresh() {
    $(".owl-carousel").each(function () {
      forceOwlRefresh($(this));
    });
  }

  /* ============================================================
     Helpers: video
  ============================================================ */
  function pauseAllVideos($carousel, resetTime) {
    $carousel.find("video").each(function () {
      try {
        this.pause();
        if (resetTime) this.currentTime = 0;
      } catch (e) {}
    });
  }

  function playActiveVideo($carousel) {
    const $v = $carousel.find(".owl-item.active video").first();
    if (!$v.length) return;

    const v = $v.get(0);

    // Requisitos autoplay
    v.muted = true;
    v.loop = true;
    v.playsInline = true;

    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(function () {});
  }

  /* ============================================================
     Carrusel de imágenes (SIN peek, SIN colapso)
  ============================================================ */
  const $imgCarousel = $(".carousel-imagen");

  if ($imgCarousel.length) {
    $imgCarousel.owlCarousel({
      items: 1,
      loop: true,
      margin: 3,
      nav: true,
      dots: true,
      autoHeight: true,
      startPosition: 0,

      // clave: sin asomo lateral
      stagePadding: 0,
      center: false,

      navText: ["&#9664;", "&#9654;"],

      // mantener explícito para evitar overrides
      responsive: {
        0:   { stagePadding: 0 },
        768: { stagePadding: 0 }
      },

      onInitialized: function () {
        const $car = $(this.$element);

        // refresh inmediato + cuando imágenes estén listas
        requestAnimationFrame(function () { forceOwlRefresh($car); });
        refreshWhenImagesReady($car);

        // backups
        setTimeout(function () { forceOwlRefresh($car); }, 250);
        setTimeout(function () { forceOwlRefresh($car); }, 900);
      }
    });

    // Recalcular al terminar transiciones/cambios
    $imgCarousel.on("translated.owl.carousel resized.owl.carousel", function () {
      forceOwlRefresh($(this));
    });
  }

  /* ============================================================
     Carrusel de videos (SIN peek, autoplay controlado)
  ============================================================ */
  const $videoCarousel = $(".carousel-video");

  if ($videoCarousel.length) {
    $videoCarousel.owlCarousel({
      items: 1,
      loop: true,
      margin: 3,
      nav: true,
      dots: true,
      autoHeight: true,
      startPosition: 0,

      // clave: sin asomo lateral
      stagePadding: 0,
      center: false,

      navText: ["&#9664;", "&#9654;"],

      responsive: {
        0:   { stagePadding: 0 },
        768: { stagePadding: 0 }
      },

      onInitialized: function () {
        const $car = $(this.$element);

        // video estado inicial
        pauseAllVideos($car, true);
        playActiveVideo($car);

        // refresh layout
        requestAnimationFrame(function () { forceOwlRefresh($car); });
        setTimeout(function () { forceOwlRefresh($car); }, 120);
      }
    });

    // Al cambiar slide: pausar todo y reproducir solo el activo
    $videoCarousel.on("translated.owl.carousel changed.owl.carousel dragged.owl.carousel", function () {
      const $car = $(this);

      // resetea estado visual del overlay
      $car.find(".img-container").removeClass("is-active");

      pauseAllVideos($car, true);
      playActiveVideo($car);

      setTimeout(function () { forceOwlRefresh($car); }, 0);
    });
  }

  // Click: activar controles (y permitir play/pause)
  $(document).on("click", ".carousel-video video", function (e) {
    e.stopPropagation();

    const video = this;
    const $container = $(video).closest(".img-container");

    $container.addClass("is-active"); // apaga overlay

    // Activar controles sólo una vez
    if (!video.hasAttribute("controls")) {
      video.setAttribute("controls", "controls");
      // si quieres que el usuario pueda oír al activar:
      video.muted = false;
    }

    // Toggle play/pause
    if (video.paused) {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
    } else {
      video.pause();
    }
  });

  /* ============================================================
     Carrusel fancy (multi items)
  ============================================================ */
  const $fancyCarousel = $(".carousel-fancy");

  if ($fancyCarousel.length) {
    $fancyCarousel.owlCarousel({
      loop: true,
      margin: 5,
      nav: true,
      dots: true,
      navText: [
        '<span class="owl-nav-prev">&#10094;</span>',
        '<span class="owl-nav-next">&#10095;</span>'
      ],
      responsiveClass: true,
      responsive: {
        0:    { items: 2, dots: true },
        600:  { items: 3, nav: false },
        1000: { items: 4 }
      },
      onInitialized: function () {
        const $car = $(this.$element);
        requestAnimationFrame(function () { forceOwlRefresh($car); });
        setTimeout(function () { forceOwlRefresh($car); }, 120);
      }
    });
  }

  /* ============================================================
     Refresh global al cargar (incluye fuentes/imagenes)
  ============================================================ */
  $(window).on("load", function () {
    globalRefresh();
    setTimeout(globalRefresh, 200);
    setTimeout(globalRefresh, 900);
  });

});
