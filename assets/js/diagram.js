// Agregar interactividad al diagrama
document.querySelectorAll('.node a').forEach((link) => {
    link.addEventListener('click', () => {
        console.log(`Navegando a: ${link.title}`);
    });
});
