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
.offers-section__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.offer-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &__content {
    padding: 15px;
  }

  &__title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__description {
    font-size: 1rem;
    color: #666;
    margin-bottom: 10px;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  &__tag {
    background: #f0f0f0;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9rem;
  }

  &__image-container {
    position: relative;
  }

  &__image {
    width: 100%;
    height: auto;
    display: block;
  }

  &__badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.8rem;
  }

  &--inactive {
    opacity: 0.5;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-5px);
  }
}
</style>
