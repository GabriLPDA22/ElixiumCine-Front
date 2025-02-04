<script setup lang="ts">
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const carouselConfig = {
  itemsToShow: 2.5,
  wrapAround: true
};

const slides = [
  'https://via.placeholder.com/800x400/ff0000/ffffff',
  'https://via.placeholder.com/800x400/00ff00/ffffff',
  'https://via.placeholder.com/800x400/0000ff/ffffff',
  'https://via.placeholder.com/800x400/ffff00/ffffff',
  'https://via.placeholder.com/800x400/ff00ff/ffffff'
];

</script>

<template>
  <Carousel v-bind="carouselConfig">
    <Slide v-for="slide in slides" :key="slide">
      <div class="carousel__item">
        <img :src="slide" alt="Slide Image" />
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
