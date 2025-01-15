<script setup lang="ts">
import Navbar from './components/navbar.vue'; 
import CustomFooter from './components/CustomFooter.vue';
</script>

<template>
  <div>
    <header>
      <Navbar /> <!-- Cambiado a PascalCase -->
    </header>
    <main>
      <router-view></router-view> <!-- Renderiza el contenido de la ruta activa -->
    </main>
    <footer>
      <CustomFooter />
    </footer>
  </div>
</template>