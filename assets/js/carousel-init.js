$(document).ready(function() {
  // Carousel de imágenes: muestra 1 imagen por slide, con flechas y arrastre con el mouse
  $('.carousel-imagen').owlCarousel({
    items: 1,                // Una imagen por slide
    loop: true,
    margin: 10,
    nav: true,               // Activa las flechas
    dots: false,             // Desactiva los dots
    mouseDrag: true,         // Permite arrastrar con el mouse
    navText: [               // Define el contenido de las flechas
      '<span class="owl-nav-prev">&#10094;</span>',
      '<span class="owl-nav-next">&#10095;</span>'
    ],
    autoHeight: false        // Desactivamos autoHeight para usar la altura definida por CSS
  });

  // Carousel fancy: muestra varios elementos con configuración responsive y arrastre con el mouse
  $('.carousel-fancy').owlCarousel({
    items: 3,                // Valor por defecto: 3 elementos por slide
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    mouseDrag: true,
    navText: [
      '<span class="owl-nav-prev">&#10094;</span>',
      '<span class="owl-nav-next">&#10095;</span>'
    ],
    responsive: {            // Configuración responsive para distintos tamaños de pantalla
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  });
});
