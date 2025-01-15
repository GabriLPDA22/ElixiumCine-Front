<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import CustomFooter from './components/CustomFooter.vue';
import Home from './components/views/Home.vue';
</script>

<template>
    <div>
        <header>
            <Navbar />
        </header>
        <main>
            <Home />
        </main>
        <footer>
            <CustomFooter />
        </footer>
    </div>
</template>