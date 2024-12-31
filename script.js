// Selección de elementos
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Alternar el estado del menú
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Cerrar el menú al hacer clic en un enlace (opcional)
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});
