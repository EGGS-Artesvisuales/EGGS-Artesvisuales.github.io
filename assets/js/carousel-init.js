$(document).ready(function() {
  // Definimos el contenido de las flechas para evitar repetir código
  var navText = [
    '<span class="owl-nav-prev">&#10094;</span>',
    '<span class="owl-nav-next">&#10095;</span>'
  ];

  // Carousel de imágenes: muestra 1 imagen por slide, con flechas y arrastre con el mouse
  $('.carousel-imagen').owlCarousel({
    items: 1,                // Una imagen por slide
    loop: true,
    margin: 10,
    nav: true,               // Activa las flechas
    dots: false,             // Desactiva los dots
    mouseDrag: true,         // Permite arrastrar con el mouse
    navText: navText,        // Utiliza el array definido
    autoHeight: false        // Se utiliza la altura definida por CSS
  });

  // Carousel fancy: muestra varios elementos con configuración responsive y arrastre con el mouse
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
});

