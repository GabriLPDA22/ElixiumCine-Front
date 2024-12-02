// Aplicar ajustes al cargar la página (sino no pilla el js)
document.addEventListener('DOMContentLoaded', () => {
    cargarElementos();
});

function cargarElementos() {
    const responsiveHamburger = document.querySelector('.header--responsive .header__hamburger');
    const responsiveHeader = document.querySelector('.header--responsive');
    const body = document.body;

    // Abrir y cerrar el menú al hacer clic en el botón del hamburger
    responsiveHamburger.addEventListener('click', function (e) {
        e.stopPropagation(); // Impide que el clic en el botón se propague y cierre el menú
        responsiveHeader.classList.toggle('is-open');
        body.classList.toggle('menu-open'); // Evita el scroll cuando el menú está abierto
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', function (e) {
        if (!responsiveHeader.contains(e.target) && !responsiveHamburger.contains(e.target)) {
            responsiveHeader.classList.remove('is-open');
            body.classList.remove('menu-open');
        }
    });

    // Evitar que el clic en el menú abra el menú al hacer clic dentro de él
    responsiveHeader.addEventListener('click', function (e) {
        e.stopPropagation();
    });
}
