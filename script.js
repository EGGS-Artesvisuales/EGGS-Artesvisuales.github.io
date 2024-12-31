// Selección de elementos
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Verifica si los elementos existen antes de agregar eventos
if (navToggle && navMenu) {
    // Alternar el estado del menú hamburguesa
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // Activa/desactiva la clase "active" en el menú
        navToggle.classList.toggle('active'); // Cambia el estilo del botón hamburguesa
        console.log("Menú hamburguesa activado/desactivado");
    });

    // Cerrar el menú al hacer clic en un enlace (opcional, ideal para móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active'); // Cierra el menú
            navToggle.classList.remove('active'); // Restaura el botón hamburguesa
            console.log(`Navegación a ${link.getAttribute('href')}`);
        });
    });
} else {
    console.error("Elementos del menú hamburguesa no encontrados.");
}
