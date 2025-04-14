$(document).ready(function() {
  // Carrusel de imágenes
  $('.carousel-imagen').owlCarousel({
    items: 1,
    loop: true,
    margin: 3,
    nav: true,
    dots: true,
    dotsEach: 1,
    autoHeight: true, // ⬅️ esta opción es clave
    startPosition: 0,
    stagePadding: 30,
    navText: ["&#9664;", "&#9654;"],
    responsive: {
      0: {
        stagePadding: 15
      },
      768: {
        stagePadding: 30
      }
    },
    onInitialized: function() {
      $('.carousel-imagen').trigger('refresh.owl.carousel');
    }
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
      0: {
        items: 2,   // Para dispositivos muy pequeños
        dots: true
      },
      600: {
        items: 3,   // Para dispositivos medianos
        nav: false
      },
      1000: {
        items: 4   // Para pantallas grandes
      }
    }
  });

  // Forzar refresh al terminar de cargar la página
  $(window).on('load', function() {
    $('.carousel-imagen').trigger('refresh.owl.carousel');
    $('.carousel-fancy').trigger('refresh.owl.carousel');
  });
});
