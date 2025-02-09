$(document).ready(function() {
  var navText = [
    '<span class="owl-nav-prev">&#10094;</span>',
    '<span class="owl-nav-next">&#10095;</span>'
  ];

  // Inicialización para el carrusel de imágenes (normal y grande)
  $('.carousel-imagen').owlCarousel({
    items: 3,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    mouseDrag: true,
    navText: navText,
    autoHeight: false
  });

  // Inicialización para el carrusel fancy (pequeño)
  $('.carousel-fancy').owlCarousel({
    items: 3,
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    mouseDrag: true,
    navText: navText,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  });

  // Inicialización para el carrusel de imágenes grandes (slide grandes)
  $('.carousel-grandes').owlCarousel({
    items: 3,
    loop: true,
    margin: 0,           // Eliminamos el margin aquí para evitar conflictos
    nav: true,
    dots: false,
    navText: navText,
    autoWidth: true,     // Permite que cada ítem tenga el ancho definido en CSS
    center: true
  });
});

