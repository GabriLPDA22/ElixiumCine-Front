
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
    <header :class="['header', 'header--responsive', { 'is-open': isMenuOpen }]">
      <router-link to="/" class="header__logo">Elixium</router-link>
      <div class="header__hamburger" @click="toggleMenu">&#9776;</div>
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
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Estado reactivo para manejar el menú
  const isMenuOpen = ref(false);
  
  // Alternar el estado del menú
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    document.body.classList.toggle('menu-open', isMenuOpen.value);
  };
  </script>
<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #020510;

    &__logo {
        font-size: 1.5rem;
        font-weight: 600;
        font-family: "Poppins", sans-serif;
        background: radial-gradient(circle, #ff2c78, #dca4ff);
        -webkit-background-clip: text;
        color: transparent;
    }

    &__nav {
        flex-grow: 1;
        margin-left: 2rem;
    }

    &__hamburger {
        display: none;
        font-size: 1.5rem;
        color: #ffffff;
        cursor: pointer;
        z-index: 1001;
    }

    &__menu {
        list-style: none;
        display: flex;
        gap: 2rem;

        &-item a {
            color: #ffffff;
            text-decoration: none;
            font-weight: 500;
            font-family: "Poppins", sans-serif;
            transition: color 0.3s;

            &:hover {
                color: #ff2c78;
            }
        }
    }

    &__actions {
        display: flex;
        gap: 1.5rem;

        &__link {
            color: #ffffff;
            text-decoration: none;
            font-weight: 600;
            font-family: "Poppins", sans-serif;
            transition: color 0.3s;

            &:hover {
                color: #ff2c78;
            }
        }

        &__icon {
            color: #ffffff;
            font-size: 1.2rem;
            cursor: pointer;
        }

        .header__register,
        .header__login {
            color: #ffffff;
            text-decoration: none;
            transition: color 0.3s;
            &:hover {
                color: #ff2c78;
            }
        }
    } 
}

@media (min-width: 768px) {
.header--responsive{
    display: none;
}
}
@media (max-width: 768px) {

    .header--desktop {
        display: none;
    }

    .header__hamburger {
        display: block;
    }

    .header__nav {
        margin-left: 0;
    }

    .header__nav.overlay {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 80%;
        background-color: #020510;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        z-index: 1000;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        padding-top: 2rem;
    }

    .header.is-open .header__nav.overlay {
        transform: translateX(0);
    }

    .header__menu {
        flex-direction: column;
        gap: 1rem;
        padding-top: 2rem;
        list-style: none;

        .header__menu-item {
            margin: 1rem 0;

            a {
                color: #ffffff;
                text-decoration: none;
                font-weight: 500;
                font-family: "Poppins", sans-serif;
                display: block;
                padding: 1rem;
                transition: color 0.3s;

                &:hover {
                    color: #ff2c78;
                }
            }
        }
    }
}

body.menu-open {
    overflow: hidden;
}


  </style>
