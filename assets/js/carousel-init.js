$(document).ready(function () {

  /* ============================
     Carrusel de imágenes
  ============================ */
  $('.carousel-imagen').owlCarousel({
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
    },
    onInitialized: function () {
      $(this.$element).trigger('refresh.owl.carousel');
    }
  });

  /* ============================
     Helpers: controlar videos
  ============================ */
  function pauseAllVideos($carousel, resetTime = true) {
    $carousel.find('video').each(function () {
      try {
        this.pause();
        if (resetTime) this.currentTime = 0; // opcional
      } catch (e) {}
    });
  }

  function playActiveVideo($carousel) {
    const $v = $carousel.find('.owl-item.active video').first();
    if (!$v.length) return;

    const v = $v.get(0);

    // Asegura autoplay cross-browser
    v.muted = true;
    v.loop = true;
    v.playsInline = true;

    // Solo intenta reproducir si no está en modo interactivo
    // (si el usuario activó controles, respetamos su decisión)
    if (v.classList.contains('is-interactive')) return;

    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(function () {});
    }
  }

  /* ============================
     Carrusel de video
  ============================ */
  $('.carousel-video').owlCarousel({
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
    },
    onInitialized: function () {
      const $car = $(this.$element);
      $car.trigger('refresh.owl.carousel');
      playActiveVideo($car); // arranca el primer video
    }
  });

  // Al cambiar de slide / arrastrar:
  // pausa todos, resetea y reproduce solo el activo
  $('.carousel-video').on('changed.owl.carousel translated.owl.carousel dragged.owl.carousel', function () {
    const $car = $(this);

    // Quita estado interactivo y controles al moverse de slide (opcional, recomendado)
    $car.find('video.is-interactive').each(function () {
      this.classList.remove('is-interactive');
      this.removeAttribute('controls');
      this.muted = true; // vuelve a muted para permitir autoplay
    });

    pauseAllVideos($car, true);
    playActiveVideo($car);
  });

  /* ============================
     Click: activar controles en video
  ============================ */
  $(document).on('click', '.carousel-video-el', function (e) {
    e.stopPropagation();

    const video = this;

    // Primer click: activar controles e interacción
    if (!video.classList.contains('is-interactive')) {
      video.classList.add('is-interactive');
      video.setAttribute('controls', 'controls');

      // Si quieres que el usuario tenga audio al interactuar:
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
  $('.carousel-fancy').owlCarousel({
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

  /* ============================
     Refresh al terminar de cargar
  ============================ */
  $(window).on('load', function () {
    $('.carousel-imagen').trigger('refresh.owl.carousel');

    const $vid = $('.carousel-video');
    $vid.trigger('refresh.owl.carousel');
    playActiveVideo($vid); // asegura autoplay al cargar

    $('.carousel-fancy').trigger('refresh.owl.carousel');
  });

});
