<!-- src/components/common/MovieCard.vue -->
<template>
  <router-link
    :to="{ name: 'movieDetail', params: { id: movie.id } }"
    class="movie-card"
  >
    <div class="movie-card__image-container">
      <img
        :src="movie.cartel"
        :alt="movie.titulo"
        class="movie-card__image"
        loading="lazy"
      >
      <div v-if="movie.edadRecomendada" class="movie-card__age-rating">
        <img
          :src="movie.imagenEdadRecomendada"
          :alt="`Clasificación ${movie.edadRecomendada}`"
          class="movie-card__age-rating-icon"
        >
      </div>
      <div v-if="isNewRelease" class="movie-card__tag movie-card__tag--new">
        ESTRENO
      </div>
      <div v-if="isPreSale" class="movie-card__tag movie-card__tag--pre-sale">
        VENTA ANTICIPADA
      </div>
    </div>
    <div class="movie-card__content">
      <h3 class="movie-card__title">{{ movie.titulo }}</h3>
      <div class="movie-card__info">
        <span v-if="movie.duracion" class="movie-card__duration">{{ movie.duracion }}</span>
        <span v-if="movie.calificacion" class="movie-card__rating">
          <span class="movie-card__rating-stars">
            <i v-for="i in Math.floor(movie.calificacion / 2)" :key="`star-${i}`" class="star star--full">★</i>
            <i v-if="movie.calificacion % 2 !== 0" class="star star--half">★</i>
          </span>
          <span class="movie-card__rating-value">{{ (movie.calificacion / 2).toFixed(1) }}</span>
        </span>
      </div>
      <p v-if="showDescription" class="movie-card__description">{{ truncateDescription(movie.descripcion) }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Movie } from '@/types/Movie';

interface Props {
  movie: Movie;
  showDescription?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showDescription: false
});

// Check if movie is a new release (less than 7 days old)
const isNewRelease = computed(() => {
  if (!props.movie.fechaEstreno) return false;

  const estrenoDate = new Date(props.movie.fechaEstreno);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - estrenoDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= 7;
});

// Check if movie is in pre-sale
const isPreSale = computed(() => {
  return props.movie.ventaAnticipada;
});

// Truncate description to 120 characters
const truncateDescription = (description: string) => {
  if (!description) return '';

  return description.length > 120
    ? `${description.substring(0, 120)}...`
    : description;
};
</script>

<style lang="scss" scoped>
.movie-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $color-background-card;
  border-radius: $border-radius-md;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform $transition-normal, box-shadow $transition-normal;
  color: $color-text;
  text-decoration: none;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);

    .movie-card__image {
      transform: scale(1.05);
    }
  }

  &__image-container {
    position: relative;
    height: 350px;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-normal;
  }

  &__age-rating {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: $border-radius-sm;
    padding: 5px;

    &-icon {
      height: 20px;
      width: auto;
    }
  }

  &__tag {
    position: absolute;
    top: 10px;
    left: 0;
    padding: 5px 10px;
    font-size: $font-size-xs;
    font-weight: bold;

    &--new {
      background-color: $color-primary;
      color: white;
    }

    &--pre-sale {
      background-color: $color-warning;
      color: black;
    }
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: $space-3;
  }

  &__title {
    font-size: $font-size-md;
    font-weight: 600;
    margin-bottom: $space-2;
    @include truncate(2);
  }

  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $space-2;
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__duration {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 2px 6px;
    border-radius: $border-radius-sm;
  }

  &__rating {
    display: flex;
    align-items: center;

    &-stars {
      color: $color-warning;
      margin-right: $space-1;

      .star {
        &--half {
          position: relative;
          display: inline-block;
          overflow: hidden;
          width: 0.5em;
        }
      }
    }

    &-value {
      font-weight: 600;
    }
  }

  &__description {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin-top: auto;
    @include truncate(3);
  }
}
</style>
