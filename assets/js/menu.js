document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    // Al hacer clic en el ícono hamburguesa
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      
      navMenu.classList.toggle('active');    // Alternar visibilidad del menú
      navToggle.classList.toggle('active');    // Cambiar estado del botón
      document.body.classList.toggle('no-scroll'); // Evitar scroll en el body
    });

    // Cerrar el menú al hacer clic en cualquier enlace
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
