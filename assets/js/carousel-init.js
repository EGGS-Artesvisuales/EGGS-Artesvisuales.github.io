$(document).ready(function() {

  // Carrusel de imágenes
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
    onInitialized: function() {
      $(this.$element).trigger('refresh.owl.carousel');
    }
  });

  // Carrusel de video
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
    onInitialized: function() {
      const $car = $(this.$element);
      $car.trigger('refresh.owl.carousel');
      playActiveVideo($car); // arranca el primer video
    }
  });

  // --- Helpers: controlar videos en carrusel ---
  function pauseAllVideos($carousel, resetTime = true) {
    $carousel.find('video').each(function(){
      try {
        this.pause();
        if (resetTime) this.currentTime = 0; // opcional
      } catch (e) {}
    });
  }

  function playActiveVideo($carousel) {
    // Owl puede marcar varios active; toma el primero visible
    const $v = $carousel.find('.owl-item.active video').first();
    if (!$v.length) return;

    const v = $v.get(0);

    // Para que autoplay funcione: muted + playsinline + loop
    v.muted = true;
    v.loop = true;
    v.playsInline = true;

    // Intento de reproducción (evita warnings si el browser bloquea)
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(function(){ /* autoplay puede ser bloqueado si no está muted */ });
    }
  }

  // Pausar videos al cambiar de slide / arrastrar
  // y luego reproducir SOLO el activo
  $('.carousel-video').on('changed.owl.carousel translated.owl.carousel dragged.owl.carousel', function() {
    const $car = $(this);
    pauseAllVideos($car, true);
    playActiveVideo($car);
  });

  // Carrusel fancy
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

  // Refresh al terminar de cargar la página
  $(window).on('load', function() {
    $('.carousel-imagen').trigger('refresh.owl.carousel');

    const $vid = $('.carousel-video');
    $vid.trigger('refresh.owl.carousel');
    playActiveVideo($vid); // asegura autoplay al cargar

    $('.carousel-fancy').trigger('refresh.owl.carousel');
  });

});
