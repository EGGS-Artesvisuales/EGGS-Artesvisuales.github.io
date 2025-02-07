<script>
$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    loop: true,            // Habilita el bucle infinito
    margin: 10,            // Espaciado entre elementos
    nav: true,             // Activa las flechas de navegación
    dots: true,            // Activa los puntos de navegación (mapa)
    navText: ["&#9664;", "&#9654;"], // Flechas personalizadas (izquierda/derecha)
    autoplay: false,       // Puedes activar el autoplay si lo deseas
    responsive: {
      0: { items: 1 },     // 1 elemento para pantallas pequeñas
      600: { items: 3 },   // 3 elementos en pantallas medianas
      1000: { items: 5 }   // 5 elementos en pantallas grandes (ajusta según necesidad)
    }
  });
});
</script>
