<!-- src/components/common/AppHeader.vue (Con navegación a la izquierda) -->
<template>
  <header class="header">
    <!-- Logo -->
    <router-link to="/" class="header__logo">Elixium</router-link>

    <!-- Menú de navegación desktop -->
    <nav class="header__nav-desktop">
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

    <!-- Espaciador flexible -->
    <div class="header__spacer"></div>

    <!-- Acciones (login/registro) para desktop -->
    <div class="header__actions">
      <router-link to="/auth/register" class="header__link header__register">
        Registrarse
      </router-link>
      <router-link to="/auth/login" class="header__link header__login">
        Iniciar sesión
      </router-link>
    </div>

    <!-- Botón hamburguesa para móvil -->
    <div class="header__hamburger" @click="toggleMenu">&#9776;</div>

    <!-- Menú móvil (overlay) -->
    <div class="header__mobile-menu" :class="{ 'is-open': isMenuOpen }">
      <div class="header__mobile-overlay" @click="closeMenu"></div>
      <nav class="header__mobile-nav">
        <div class="header__mobile-close" @click="closeMenu">&times;</div>
        <ul class="header__mobile-list">
          <li class="header__mobile-item">
            <router-link to="/cines" @click="closeMenu">Cines</router-link>
          </li>
          <li class="header__mobile-item">
            <router-link to="/peliculas" @click="closeMenu">Películas</router-link>
          </li>
          <li class="header__mobile-item">
            <router-link to="/promociones" @click="closeMenu">Promociones</router-link>
          </li>
          <li class="header__mobile-item">
            <router-link to="/auth/register" @click="closeMenu">Registrarse</router-link>
          </li>
          <li class="header__mobile-item">
            <router-link to="/auth/login" @click="closeMenu">Iniciar sesión</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.classList.toggle('menu-open', this.isMenuOpen);
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.classList.remove('menu-open');
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #020510;
  position: relative;
  z-index: 100;

  // Logo
  &__logo {
    font-size: 1.5rem;
    font-weight: 600;
    background: linear-gradient(to right, #ff2c78, #dca4ff);
    -webkit-background-clip: text;
    color: transparent;
    text-decoration: none;
    margin-right: 2rem; // Espacio entre logo y navegación
  }

  // Menú desktop
  &__nav-desktop {
    @media (max-width: 768px) {
      display: none;
    }
  }

  &__menu {
    display: flex;
    list-style: none;
    gap: 2rem;
    padding-left: 0;
    margin: 0;
    justify-content: flex-start; // Alineación a la izquierda
  }

  &__menu-item a {
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;

    &:hover, &.router-link-active {
      color: #ff2c78;
    }
  }

  // Espaciador flexible para empujar las acciones a la derecha
  &__spacer {
    flex-grow: 1;
  }

  // Acciones (login/registro)
  &__actions {
    display: flex;
    gap: 1.5rem;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__link {
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s;

    &:hover {
      color: #ff2c78;
    }
  }

  // Botón hamburguesa
  &__hamburger {
    display: none;
    font-size: 1.8rem;
    color: #ffffff;
    cursor: pointer;
    z-index: 101;

    @media (max-width: 768px) {
      display: block;
      margin-left: auto; // Empuja a la derecha
    }
  }

  // Menú móvil
  &__mobile-menu {
    visibility: hidden;
    opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s ease;

    &.is-open {
      visibility: visible;
      opacity: 1;
    }
  }

  &__mobile-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  &__mobile-nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    max-width: 300px;
    height: 100%;
    background-color: #07051e;
    z-index: 2;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    padding: 2rem;
    overflow-y: auto;

    .is-open & {
      transform: translateX(0);
    }
  }

  &__mobile-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    color: #ffffff;
    cursor: pointer;
  }

  &__mobile-list {
    list-style: none;
    padding: 0;
    margin: 2rem 0 0 0;
  }

  &__mobile-item {
    margin-bottom: 1.5rem;

    a {
      color: #ffffff;
      text-decoration: none;
      font-weight: 500;
      font-size: 1.2rem;
      display: block;
      padding: 0.5rem 0;
      transition: color 0.3s;

      &:hover, &.router-link-active {
        color: #ff2c78;
      }
    }
  }
}

body.menu-open {
  overflow: hidden;
}
</style>
