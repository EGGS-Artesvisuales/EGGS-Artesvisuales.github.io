$(document).ready(function () {

  // Guard: si Owl no está cargado, no habrá carrusel (y todo se verá “en lista”)
  if (!$.fn || !$.fn.owlCarousel) {
    console.error("OwlCarousel NO está cargado. Revisa orden de scripts: jQuery -> owl.carousel -> carousel-init.js");
    return;
  }

  /* ============================
     Carrusel de imágenes
  ============================ */
  $('.carousel-imagen').owlCarousel({
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
    }
  });

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
    }
  });

  // Al cambiar slide: pausamos todo y reproducimos solo el activo
  $videoCarousel.on('translated.owl.carousel changed.owl.carousel dragged.owl.carousel', function () {
    const $car = $(this);

    // resetea estado visual del overlay
    $car.find('.img-container').removeClass('is-active');

    pauseAllVideos($car, true);
    playActiveVideo($car);
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
     Refresh al cargar
  ============================ */
  $(window).on('load', function () {
    $('.carousel-imagen').trigger('refresh.owl.carousel');
    $videoCarousel.trigger('refresh.owl.carousel');
    $('.carousel-fancy').trigger('refresh.owl.carousel');
  });

});

