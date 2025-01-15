<script setup lang="ts">
import Ofertas from './components/Ofertas.vue';
import Navbar from './components/navbar.vue';
import CustomFooter from './components/CustomFooter.vue';
</script>

<template>
    <div>
        <header>
            <Navbar />
        </header>
        <main>
            <Ofertas />

        </main>
        <footer>
            <CustomFooter />
        </footer>
    </div>
</template>