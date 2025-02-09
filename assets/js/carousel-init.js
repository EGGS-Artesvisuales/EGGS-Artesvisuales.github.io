$(document).ready(function() {
  // Definimos el contenido de las flechas para evitar repetir código
  var navText = [
    '<span class="owl-nav-prev">&#10094;</span>',
    '<span class="owl-nav-next">&#10095;</span>'
  ];

  // Inicialización para el carrusel de imágenes (normal y grande)
  $('.carousel-imagen').owlCarousel({
    items: 3,                // Muestra 3 imágenes por slide
    loop: true,
    margin: 10,
    nav: true,               // Activa las flechas
    dots: false,             // Desactiva los dots
    mouseDrag: true,         // Permite arrastrar con el mouse
    navText: navText,        // Utiliza el array definido
    autoHeight: false        // Se utiliza la altura definida por CSS
  });

  // Inicialización para el carrusel fancy (pequeño)
  $('.carousel-fancy').owlCarousel({
    items: 3,                // Valor por defecto: 3 elementos por slide
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    mouseDrag: true,
    navText: navText,        // Reutiliza el array de navegación
    responsive: {            // Configuración responsive para distintos tamaños de pantalla
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  });

  // Inicialización para el carrusel de imágenes grandes
  $('.carousel-grandes').owlCarousel({
    items: 3,             // Muestra 3 items a la vez
    loop: true,
    margin: 20,
    nav: true,            // Activa las flechas de navegación
    dots: false,
    navText: navText,
    autoWidth: true,      // Permite que cada item tenga un ancho definido por CSS
    center: true          // Opcional: centra el item activo
  });
});

