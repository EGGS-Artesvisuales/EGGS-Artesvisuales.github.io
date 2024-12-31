// Selección de elementos
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Verifica si los elementos existen antes de agregar eventos
if (navToggle && navMenu) {
    // Alternar el estado del menú hamburguesa
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un enlace (opcional)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
} else {
    console.error("Elementos del menú hamburguesa no encontrados.");
}
