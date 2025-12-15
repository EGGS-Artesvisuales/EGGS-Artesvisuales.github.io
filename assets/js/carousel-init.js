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
      $(this.$element).trigger('refresh.owl.carousel');
    }
  });

  // Pausar videos al cambiar de slide / arrastrar
  $('.carousel-video').on('changed.owl.carousel translated.owl.carousel dragged.owl.carousel', function() {
    $(this).find('video').each(function(){
      this.pause();
      this.currentTime = 0; // opcional
    });
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
    $('.carousel-video').trigger('refresh.owl.carousel');
    $('.carousel-fancy').trigger('refresh.owl.carousel');
  });

});

