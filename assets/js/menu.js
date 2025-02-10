document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle'); // Botón hamburguesa
  const navMenu   = document.querySelector('.nav-menu');     // Contenedor del menú

  if (navToggle && navMenu) {
    // Función para alternar el estado del menú
    const toggleMenu = () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      
      navToggle.classList.toggle('active');    // Alternar estado del botón
      navMenu.classList.toggle('active');        // Alternar visibilidad del menú
      document.body.classList.toggle('no-scroll'); // Evitar scroll en el body
    };

    // Al hacer clic en el botón hamburguesa se alterna el menú
    navToggle.addEventListener('click', toggleMenu);

    // Cerrar el menú al hacer clic en cualquier enlace dentro del menú
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });
  } else {
    console.warn('Elementos del menú no encontrados.');
  }
});
