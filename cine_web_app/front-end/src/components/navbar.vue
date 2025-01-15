<template>
    <!-- Navbar para pantallas grandes -->
    <header class="header header--desktop">
        <router-link to="/" class="header__logo">Elixium</router-link>
        <nav class="header__nav">
            <ul class="header__menu">
                <li class="header__menu-item">
                    <router-link to="/cines">Cines</router-link>
                </li>
                <li class="header__menu-item">
                    <router-link to="/peliculas">Películas</router-link>
                </li>
                <li class="header__menu-item">
                    <router-link to="/promociones">Promociones</router-link>
                </li>
            </ul>
        </nav>
        <div class="header__actions">
            <router-link to="/registrarse" class="header__link header__register">Registrarse</router-link>
            <router-link to="/iniciar-sesion" class="header__link header__login">Iniciar sesión</router-link>
        </div>
    </header>

    <!-- Navbar responsive para móviles -->
    <header class="header header--responsive">
        <router-link to="/" class="header__logo">Elixium</router-link>
        <div class="header__hamburger">&#9776;</div>
        <nav class="header__nav overlay">
            <ul class="header__menu">
                <li class="header__menu-item">
                    <router-link to="/cines">Cines</router-link>
                </li>
                <li class="header__menu-item">
                    <router-link to="/peliculas">Películas</router-link>
                </li>
                <li class="header__menu-item">
                    <router-link to="/promociones">Promociones</router-link>
                </li>
                <li class="header__menu-item">
                    <router-link to="/registrarse" class="header__link header__register">Registrarse</router-link>
                </li>
                <li class="header__menu-item">
                    <router-link to="/iniciar-sesion" class="header__link header__login">Iniciar sesión</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>

defineOptions({
    name: 'Navbar',
});

// Código para manejar el DOM al cargar la página
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