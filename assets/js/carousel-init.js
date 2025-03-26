$(document).ready(function() {
  // Carrusel de imágenes con captions
  $('.carousel-imagen').owlCarousel({
    items: 1,
    loop: true,
    margin: 3,
    nav: true,
    dots: true,
    dotsEach: 1,
    center: true,
    stagePadding: 30,
    autoHeight: true,
    navText: ["&#9664;", "&#9654;"],
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
    items: 5,
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
