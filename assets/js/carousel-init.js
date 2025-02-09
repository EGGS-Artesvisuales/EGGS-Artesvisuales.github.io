$(function() {
  var navText = ["&#9664;", "&#9654;"];

  // Inicialización para el carrusel de imágenes (versión normal)
  // Se excluyen los contenedores que sean del tipo large.
  $('.carousel-imagen:not(.owl-carousel-large)').owlCarousel({
    items: 4,
    loop: true,
    margin: 6,
    nav: true,
    dots: true,
    mouseDrag: true,
    navText: navText,
    autoHeight: false
  });

  // Inicialización para el carrusel fancy (pequeño)
  $('.carousel-fancy').owlCarousel({
    items: 4,
    loop: true,
    margin: 3,
    nav: true,
    dots: true,
    mouseDrag: true,
    navText: navText,
    responsive: {
      0: { items: 1 },
      600: { items: 3 },
      1000: { items: 5 }
    }
  });

  // Inicialización para el carrusel de imágenes grandes (slide grande)
  // Se elimina "items" ya que autoWidth: true respeta el ancho definido en CSS.
  $('.owl-carousel-large.carousel-imagen').owlCarousel({
    loop: true,
    margin: 0,           // Margin eliminado en JS para usar el gap definido en CSS.
    nav: true,
    dots: true,
    navText: navText,
    autoWidth: true,     // Respeta el ancho definido en CSS (ej. 800px)
    center: true
  });
});

