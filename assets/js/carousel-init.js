// carousel-init.js
$(document).ready(function(){
  // Inicialización para el carrusel de imágenes
  $(".carousel-imagen").owlCarousel({
    items: 3, // ajusta según tus necesidades
    loop: true,
    margin: 20,
    nav: true,
    navText: [
      '<span class="owl-nav-prev">&#10094;</span>',
      '<span class="owl-nav-next">&#10095;</span>'
    ],
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  });

  // Si tienes otro carrusel fancy, puedes inicializarlo por separado:
  $(".carousel-fancy").owlCarousel({
    items: 3, // ajusta según tus necesidades
    loop: true,
    margin: 20,
    nav: true,
    navText: [
      '<span class="owl-nav-prev">&#10094;</span>',
      '<span class="owl-nav-next">&#10095;</span>'
    ],
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  });
});
