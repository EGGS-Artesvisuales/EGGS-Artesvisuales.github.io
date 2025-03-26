$(document).ready(function() {
  // Carrusel de imágenes con captions
  $('.carousel-imagen').owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    dotsEach: 1,
    center: true,
    stagePadding: 30,
    autoHeight: false,
    responsive: {
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
    dots: true,
    navText: [
      '<span class="owl-nav-prev">&#10094;</span>',
      '<span class="owl-nav-next">&#10095;</span>'
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        dots: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 5
      }
    }
  });
});

