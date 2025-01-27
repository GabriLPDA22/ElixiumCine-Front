<script setup lang="ts">
import navbar from './components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<template>
  <div>
    <header>
      <navbar />
    </header>
    <main>
      <router-view></router-view> <!-- Renderiza el contenido de la ruta activa -->
    </main>
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>
<style lang="scss">
@import './assets/css/styles.scss';
</style>