document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle'); // Botón hamburguesa
  const navMenu = document.getElementById('nav-menu'); // Menú de navegación

  if (navToggle && navMenu) {
    // Al hacer clic en el ícono hamburguesa
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !isExpanded);
      
      navMenu.classList.toggle('active'); // Alternar visibilidad del menú
      navToggle.classList.toggle('active'); // Cambiar estado del botón
      document.body.classList.toggle('no-scroll'); // Evitar scroll
    });

    // Cerrar el menú al hacer clic en cualquier enlace del menú
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', false);
        document.body.classList.remove('no-scroll');
      });
    });
  } else {
    console.warn('Elementos del menú no encontrados.');
  }
});
