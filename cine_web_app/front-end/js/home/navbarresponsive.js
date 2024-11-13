const responsiveHamburger = document.querySelector('.header--responsive .header__hamburger');
const responsiveHeader = document.querySelector('.header--responsive');
const body = document.body;

responsiveHamburger.addEventListener('click', function () {
    responsiveHeader.classList.toggle('is-open');
    body.classList.toggle('menu-open'); // Evita el scroll cuando el menú está abierto
});
