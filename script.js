// Selección de elementos
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Alternar el menú hamburguesa
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar el menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
