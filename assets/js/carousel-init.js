$(document).ready(function() {
  // Inicialización para el carrusel de imágenes (una imagen por slide)
$('.owl-carousel-large').owlCarousel({
  items: 1,           // Se muestra un item activo centrado
  loop: true,
  margin: 10,         // Separación entre items (aplica también al efecto visual)
  nav: true,
  dots: false,
  center: true,       // Activa el modo centrado
  stagePadding: 30,   // Espacio en píxeles para mostrar parte de los items adyacentes; ajusta este valor según necesites
  autoHeight: true
});


  // Inicialización para el carrusel fancy (si es que lo utilizas)
  $('.carousel-fancy').owlCarousel({
    items: 3, // Ajusta según tus necesidades
    loop: true,
    margin: 9,
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

