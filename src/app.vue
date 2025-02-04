<script setup lang="ts">
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import Carrusel from './components/Carrusel.vue';
</script>

<template>
  <div>
    <header>
      <NavbarComponent />
    </header>
    <main>
      <Carrusel />
      <router-view></router-view> <!--Renderiza el contenido de la ruta activa -->
    </main>
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use "./assets/styles.scss" as *;
</style>
