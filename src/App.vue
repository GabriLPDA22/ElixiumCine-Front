<!-- src/App.vue (Corregido) -->
<template>
  <div class="app">
    <AppHeader />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from '@/components/common/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
};
</script>

<style lang="scss">
// Estilos globales
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

html, body {
  width: 100%;
  height: 100%;
  background-color: #07051e;
  color: #ffffff;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

// Estilos para scrollbar
* {
  scrollbar-width: thin;
  scrollbar-color: #ff2c78 #0a0e27;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0a0e27;
}

::-webkit-scrollbar-thumb {
  background: #ff2c78;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ff4a8d;
}

// Transiciones para las rutas
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Estilos de botones
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #ff2c78;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #ff5492;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
}

// Loader
.loader {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #ff2c78;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// Utilidades de texto
.text-center {
  text-align: center;
}
</style>
