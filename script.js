// Selección de elementos
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Alternar el estado del menú
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active'); // Activa/desactiva la clase "active"
    navToggle.classList.toggle('active'); // Cambia el estilo del botón hamburguesa (opcional)
});

// Cerrar el menú al hacer clic en un enlace (opcional, para móviles)
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active'); // Cierra el menú
        navToggle.classList.remove('active'); // Resetea el botón hamburguesa
    });
});
