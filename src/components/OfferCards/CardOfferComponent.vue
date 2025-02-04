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
import { useOffersStore } from '../../Stores/offers';
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

<style lang="scss" scoped>
.offers-section {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(5, 7, 19);
  margin-bottom: 2rem;

  &__title {
      font-size: 2rem;
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 1.5rem;
  }

  &__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 1200px;
      margin-bottom: 20px;
  }
}

.offer-card {
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  width: 100%;
  max-width: 500px;

  &:hover {
      transform: scale(1.05);
  }

  &__content {
      flex: 1;
      padding-right: 1rem;
  }

  &__title {
      font-size: 1.3rem;
      font-weight: bold;
      color: #333333;
      margin-bottom: 0.5rem;
  }

  &__description {
      font-size: 1rem;
      color: #555555;
      line-height: 1.4;
  }

  &__image {
      width: 100px;
      height: auto;
      border-radius: 8px;
  }

}

@media (max-width: 768px) {
  .offers-section__grid {
    display: grid;
    grid-template-columns: 1fr;
    max-width: 400px;
  }

  .offer-card {
    padding: 0.5rem;
  }
}
</style>
