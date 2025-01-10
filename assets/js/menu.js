document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle'); // Botón hamburguesa
  const navMenu = document.getElementById('nav-menu'); // Menú de navegación

  if (navToggle && navMenu) {
    // Al hacer clic en el ícono hamburguesa
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active'); // Alternar visibilidad del menú
      navToggle.classList.toggle('active'); // Cambiar estado del botón
    });

    // Cerrar el menú al hacer clic en cualquier enlace del menú
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  } else {
    console.warn('Elementos del menú no encontrados.');
  }
});

