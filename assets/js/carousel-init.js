$(function() {
  var navText = ["&#9664;", "&#9654;"];

  // Inicialización para el carrusel de imágenes (versión normal)
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

  // Inicialización para el carrusel de imágenes grandes (slide grande)
  // Se elimina "items" ya que autoWidth: true se encarga de respetar el ancho definido en CSS.
  $('.carousel-grandes').owlCarousel({
    loop: true,
    margin: 0,           // Se elimina el margin en JS para usar el gap definido en CSS
    nav: true,
    dots: false,
    navText: navText,
    autoWidth: true,     // Se respeta el ancho definido en CSS (ej. 800px)
    center: true
  });
});
