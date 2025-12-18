$(document).ready(function () {

  /* ============================================================
     Seguridad: evita doble inicialización de Owl (muy común en Jekyll/layouts)
  ============================================================ */
  function safeInitOwl($el, options) {
    if (!$el.length) return;
    // Si ya está inicializado, no lo reinicies
    if ($el.hasClass('owl-loaded')) return;
    $el.owlCarousel(options);
  }

  /* ============================================================
     Helpers: controlar videos dentro del carrusel
  ============================================================ */
  function pauseAllVideos($carousel, resetTime = true) {
    $carousel.find('video').each(function () {
      try {
        this.pause();
        if (resetTime) this.currentTime = 0;
      } catch (e) {}
    });
  }

  function resetInteractiveState($carousel) {
    $carousel.find('video.is-interactive').each(function () {
      try {
        this.classList.remove('is-interactive');
        this.removeAttribute('controls');
        this.muted = true; // vuelve a muted para permitir autoplay
      } catch (e) {}
    });
  }

  function playActiveVideo($carousel) {
    // Puede haber más de un .active; toma el primero visible
    const $v = $carousel.find('.owl-item.active video').first();
    if (!$v.length) return;

    const v = $v.get(0);

    // Condiciones mínimas para autoplay cross-browser
    v.muted = true;
    v.loop = true;
    v.playsInline = true;

    // Si el usuario ya lo activó (controles/audio), no forzamos autoplay
    if (v.classList.contains('is-interactive')) return;

    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(function () {});
    }
  }

  /* ============================================================
     Opciones comunes Owl
  ============================================================ */
  const owlBase = {
    items: 1,
    loop: true,
    margin: 3,
    nav: true,
    dots: true,
    dotsEach: 1,
    autoHeight: true,
    startPosition: 0,
    stagePadding: 30,
    navText: ["&#9664;", "&#9654;"],
    responsive: {
      0: { stagePadding: 15 },
      768: { stagePadding: 30 }
    }
  };

  /* ============================================================
     Carrusel de imágenes
  ============================================================ */
  safeInitOwl($('.carousel-imagen'), {
    ...owlBase,
    onInitialized: function () {
      const $car = $(this.$element);
      $car.trigger('refresh.owl.carousel');
    }
  });

  /* ============================================================
     Carrusel de video
  ============================================================ */
  safeInitOwl($('.carousel-video'), {
    ...owlBase,
    onInitialized: function () {
      const $car = $(this.$element);
      $car.trigger('refresh.owl.carousel');
      playActiveVideo($car);
    }
  });

  /* ============================================================
     Eventos: al cambiar slide, detener otros y reproducir activo
     - translated: cuando ya terminó la transición (mejor punto para play)
     - changed: cuando cambia el índice (sirve para pausar)
  ============================================================ */
  $('.carousel-video')
    .on('changed.owl.carousel', function () {
      const $car = $(this);
      // Al cambiar, limpiamos interactividad + pausamos todo
      resetInteractiveState($car);
      pauseAllVideos($car, true);
    })
    .on('translated.owl.carousel', function () {
      const $car = $(this);
      // Cuando ya está el slide en lugar, reproducimos el activo
      playActiveVideo($car);
    });

  /* ============================================================
     Click: activar controles en video (solo al usuario)
  ============================================================ */
  $(document).on('click', '.carousel-video-el', function (e) {
    e.stopPropagation();

    const video = this;

    // Primer click: activar controles e interacción real
    if (!video.classList.contains('is-interactive')) {
      video.classList.add('is-interactive');
      video.setAttribute('controls', 'controls');

      // Audio solo cuando el usuario interactúa
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
     Carrusel fancy
  ============================================================ */
  safeInitOwl($('.carousel-fancy'), {
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
    }
  });

  /* ============================================================
     Refresh final al cargar (importante cuando hay videos)
  ============================================================ */
  $(window).on('load', function () {
    const $img = $('.carousel-imagen');
    const $vid = $('.carousel-video');
    const $fancy = $('.carousel-fancy');

    if ($img.length) $img.trigger('refresh.owl.carousel');
    if ($vid.length) {
      $vid.trigger('refresh.owl.carousel');
      playActiveVideo($vid);
    }
    if ($fancy.length) $fancy.trigger('refresh.owl.carousel');
  });

});
