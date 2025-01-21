<script setup lang="ts">
import navbar from './components/navbar.vue';
import CustomFooter from './components/CustomFooter.vue';
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
      <CustomFooter />
    </footer>
  </div>
</template>
<style lang="scss">
@import './assets/css/styles.scss';
</style>