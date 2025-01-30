<template>
  <div class="offers-section__grid">
    <div v-for="(offer, index) in offers" :key="index" class="offer-card" :class="{ 'offer-card--inactive': !isActive }"
      @click="handleCardClick(offer.title)">
      <div class="offer-card__content">
        <h3 class="offer-card__title">{{ offer.title }}</h3>
        <p class="offer-card__description">{{ offer.description }}</p>
        <div v-if="offer.tags.length" class="offer-card__tags">
          <span v-for="(tag, tagIndex) in offer.tags" :key="tagIndex" class="offer-card__tag">
            {{ tag }}
          </span>
        </div>
      </div>
      <div class="offer-card__image-container">
        <img :src="offer.imageSrc" :alt="offer.altText || offer.title" class="offer-card__image" loading="lazy" />
        <div v-if="offer.isNew" class="offer-card__badge">Nuevo</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOffersStore } from '@/Stores/offers';
import { ref } from 'vue';

// Accedemos al store
const offersStore = useOffersStore();
const offers = offersStore.offers;

// Definimos la propiedad isActive
const isActive = ref(true);

// Emitimos eventos al hacer clic
const emit = defineEmits(['card-clicked']);
const handleCardClick = (title: string) => {
  emit('card-clicked', title);
};
</script>