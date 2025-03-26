$(document).ready(function() {
  // Carrusel grande (imágenes)
  $('.owl-carousel-large').owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    dotsEach: true, // Añade esto
    center: true,
    stagePadding: 30,
    autoHeight: false, // Cambia a false
    responsive: { // Añade responsive para consistencia
      0: {
        stagePadding: 15
      },
      768: {
        stagePadding: 30
      }
    }
  });

  // Carrusel fancy
  $('.carousel-fancy').owlCarousel({
    items: 3,
    loop: true,
    margin: 9,
    nav: true,
    dots: true, // Asegúrate que está en true
    dotsData: true, // Añade esto si necesitas dots personalizados
    navText: [
      '<span class="owl-nav-prev">&#10094;</span>',
      '<span class="owl-nav-next">&#10095;</span>'
    ],
    responsiveClass: true, // Añade esto
    responsive: {
      0: {
        items: 1,
        dots: true // Fuerza dots en móvil
      },
      600: {
        items: 2,
        nav: false // Desactiva flechas en tablet
      },
      1000: {
        items: 3
      }
    }
  });
});
