$(document).ready(function () {

  // Guard: si Owl no está cargado, no habrá carrusel (y todo se verá “en lista”)
  if (!$.fn || !$.fn.owlCarousel) {
    console.error("OwlCarousel NO está cargado. Revisa orden de scripts: jQuery -> owl.carousel -> carousel-init.js");
    return;
  }

  /* ============================
     Refresh robusto (fix “50% hasta click”)
  ============================ */
  function forceOwlRefresh($c) {
    if (!$c || !$c.length) return;
    $c.trigger("invalidate.owl.carousel");
    $c.trigger("refresh.owl.carousel");
  }

  // Si cargan imágenes dentro de cualquier carrusel, refrescar ese carrusel
  $(document).on("load", ".owl-carousel img", function () {
    const $c = $(this).closest(".owl-carousel");
    // doble refresh breve para asegurar layout final
    setTimeout(function () { forceOwlRefresh($c); }, 0);
    setTimeout(function () { forceOwlRefresh($c); }, 120);
  });

  // Cuando Owl inicializa o cambia tamaño, refrescar para evitar estados intermedios
  $(document).on("initialized.owl.carousel resized.owl.carousel", function (e) {
    const $c = $(e.target);
    // solo nuestros carruseles
    if ($c.hasClass("carousel-imagen") || $c.hasClass("carousel-video") || $c.hasClass("carousel-fancy")) {
      requestAnimationFrame(function () { forceOwlRefresh($c); });
      setTimeout(function () { forceOwlRefresh($c); }, 120);
    }
  });

/* ============================================================
   Owl Carousel Init – EGGS-Studio
   Objetivo: 1 ítem visible, sin “peek” lateral (stagePadding = 0)
============================================================ */

(function () {
  // Helper: fuerza refresh para evitar layouts a medias (flash/50%)
  function forceOwlRefresh($car) {
    if (!$car || !$car.length) return;
    // Owl necesita refresh luego de render/paint
    $car.trigger('refresh.owl.carousel');
  }

  /* ============================
     Carrusel de imágenes
  ============================ */
  const $imgCarousel = $('.carousel-imagen');

  if ($imgCarousel.length) {
    $imgCarousel.owlCarousel({
      items: 1,
      loop: true,
      margin: 3,
      nav: true,
      dots: true,
      autoHeight: true,
      startPosition: 0,

      /* clave: sin asomo lateral */
      stagePadding: 0,
      center: false,

      navText: ["&#9664;", "&#9654;"],

      /* mantener explícito en responsive para evitar override */
      responsive: {
        0:   { stagePadding: 0 },
        768: { stagePadding: 0 }
      },

      onInitialized: function () {
        const $car = $(this.$element);
        requestAnimationFrame(function () { forceOwlRefresh($car); });
        setTimeout(function () { forceOwlRefresh($car); }, 120);
      }
    });
  }

  /* ============================
     Carrusel de video
  ============================ */
  const $videoCarousel = $('.carousel-video');

  if ($videoCarousel.length) {
    $videoCarousel.owlCarousel({
      items: 1,
      loop: true,
      margin: 3,
      nav: true,
      dots: true,
      autoHeight: true,
      startPosition: 0,

      /* clave: sin asomo lateral */
      stagePadding: 0,
      center: false,

      navText: ["&#9664;", "&#9654;"],

      responsive: {
        0:   { stagePadding: 0 },
        768: { stagePadding: 0 }
      },

      onInitialized: function () {
        const $car = $(this.$element);
        requestAnimationFrame(function () { forceOwlRefresh($car); });
        setTimeout(function () { forceOwlRefresh($car); }, 120);
      }
    });
  }
})();


  /* ============================
     Helpers: video
  ============================ */
  function pauseAllVideos($carousel, resetTime) {
    $carousel.find('video').each(function () {
      try {
        this.pause();
        if (resetTime) this.currentTime = 0;
      } catch (e) {}
    });
  }

  function playActiveVideo($carousel) {
    const $v = $carousel.find('.owl-item.active video').first();
    if (!$v.length) return;

    const v = $v.get(0);

    // Requisitos autoplay
    v.muted = true;
    v.loop = true;
    v.playsInline = true;

    // Intentar autoplay
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(function () {});
  }

  /* ============================
     Carrusel de videos
  ============================ */
  const $videoCarousel = $('.carousel-video');

  $videoCarousel.owlCarousel({
    items: 1,
    loop: true,
    margin: 3,
    nav: true,
    dots: true,
    autoHeight: true,
    startPosition: 0,
    stagePadding: 30,
    navText: ["&#9664;", "&#9654;"],
    responsive: {
      0: { stagePadding: 15 },
      768: { stagePadding: 30 }
    },
    onInitialized: function () {
      const $car = $(this.$element);
      pauseAllVideos($car, true);
      playActiveVideo($car);

      // refresh inmediato para evitar el “50%”
      requestAnimationFrame(function () { forceOwlRefresh($car); });
      setTimeout(function () { forceOwlRefresh($car); }, 120);
    }
  });

  // Al cambiar slide: pausamos todo y reproducimos solo el activo
  $videoCarousel.on('translated.owl.carousel changed.owl.carousel dragged.owl.carousel', function () {
    const $car = $(this);

    // resetea estado visual del overlay
    $car.find('.img-container').removeClass('is-active');

    pauseAllVideos($car, true);
    playActiveVideo($car);

    // asegurar recalculo post-transición
    setTimeout(function () { forceOwlRefresh($car); }, 0);
  });

  // Click: activar controles (y permitir play/pause)
  $(document).on('click', '.carousel-video .carousel-video-el', function (e) {
    e.stopPropagation();

    const video = this;
    const $container = $(video).closest('.img-container');

    $container.addClass('is-active'); // apaga overlay

    // Activar controles sólo una vez
    if (!video.hasAttribute('controls')) {
      video.setAttribute('controls', 'controls');
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

  /* ============================
     Carrusel fancy
  ============================ */
  const $fancyCarousel = $('.carousel-fancy');

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
      0: { items: 2, dots: true },
      600: { items: 3, nav: false },
      1000: { items: 4 }
    },
    onInitialized: function () {
      const $car = $(this.$element);
      requestAnimationFrame(function () { forceOwlRefresh($car); });
      setTimeout(function () { forceOwlRefresh($car); }, 120);
    }
  });

  /* ============================
     Refresh al cargar (incluye fuentes/imagenes)
  ============================ */
  $(window).on('load', function () {
    // refresh global
    $('.owl-carousel').each(function () {
      forceOwlRefresh($(this));
    });

    // refuerzo por si el navegador aún está estabilizando layout
    setTimeout(function () {
      $('.owl-carousel').each(function () {
        forceOwlRefresh($(this));
      });
    }, 200);
  });

});
