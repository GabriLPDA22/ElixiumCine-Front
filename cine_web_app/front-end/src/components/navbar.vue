<template>
    <!-- Navbar para pantallas grandes -->
    <header class="header header--desktop">
        <a href="/cine_web_app/front-end/views/home.html" class="header__logo">Elixium</a>
        <nav class="header__nav">
            <ul class="header__menu">
                <li class="header__menu-item"><a href="/cines">Cines</a></li>
                <li class="header__menu-item"><a href="../views/Allmovies.html">Películas</a></li>
                <li class="header__menu-item"><a href="/cine_web_app/front-end/views/Promociones.html">Promociones</a>
                </li>
            </ul>
        </nav>
        <div class="header__actions">
            <a href="/cine_web_app/front-end/views/security/register.html"
                class="header__link header__register">Registrarse</a>
            <a href="/cine_web_app/front-end/views/security/login.html" class="header__link header__login">Iniciar
                sesión</a>
        </div>
    </header>

    <!-- Navbar responsive para móviles -->
    <header class="header header--responsive">
        <a href="/cine_web_app/front-end/views/home.html" class="header__logo">Elixium</a>
        <div class="header__hamburger">&#9776;</div>
        <nav class="header__nav overlay">
            <ul class="header__menu">
                <!-- <li class="header__menu-item"><a href="/cine_web_app/front-end/views/Cinemas.html">Cines</a></li> -->
                <li class="header__menu-item"><a href="/cines">Cines</a></li>
                <li class="header__menu-item"><a href="/cine_web_app/front-end/views/Allmovies.html">Películas</a>
                </li>
                <li class="header__menu-item"><a href="/cine_web_app/front-end/views/Promociones.html">Promociones</a>
                </li>
                <li class="header__menu-item"><a href="/cine_web_app/front-end/views/security/register.html"
                        class="header__link header__register">Registrarse</a></li>
                <li class="header__menu-item"><a href="/cine_web_app/front-end/views/security/login.html"
                        class="header__link header__login">Iniciar sesión</a></li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
// Aplicar ajustes al cargar la página (sino no pilla el js)
document.addEventListener('DOMContentLoaded', () => {
    cargarElementos();
});

function cargarElementos() {
    const responsiveHamburger = document.querySelector('.header--responsive .header__hamburger');
    const responsiveHeader = document.querySelector('.header--responsive');
    const body = document.body;

    responsiveHamburger.addEventListener('click', function () {
        responsiveHeader.classList.toggle('is-open');
        body.classList.toggle('menu-open'); // Evita el scroll cuando el menú está abierto
    });

}

</script>