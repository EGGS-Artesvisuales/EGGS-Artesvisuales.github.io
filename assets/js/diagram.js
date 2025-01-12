document.addEventListener('DOMContentLoaded', function() {
  // Agregar interactividad al diagrama una sola vez
  document.querySelectorAll('.node a').forEach(link => {
    link.addEventListener('click', () => {
      console.log(`Navegando a: ${link.title}`);
    });
  });
});
