const hamburger = document.querySelector('.header__hamburger');
const header = document.querySelector('.header');
const body = document.body;

hamburger.addEventListener('click', function () {
    header.classList.toggle('is-open');
    body.classList.toggle('menu-open'); // Evita el scroll cuando el menú está abierto
});
