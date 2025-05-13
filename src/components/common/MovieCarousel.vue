<!-- src/components/common/MovieCarousel.vue (Carrusel Infinito) -->
<template>
  <div class="movie-carousel">
    <h2 class="movie-carousel__title">TOP PELÍCULAS</h2>

    <div class="movie-carousel__container">
      <!-- Botón anterior -->
      <button class="movie-carousel__nav movie-carousel__nav--prev" @click="prevSlide">
        <span class="movie-carousel__nav-icon">&lt;</span>
      </button>

      <!-- Contenedor del track del carrusel -->
      <div class="movie-carousel__track-container" ref="trackContainer">
        <div
          class="movie-carousel__track"
          ref="track"
          :style="{ transform: `translateX(${-currentPosition}px)` }"
        >
          <!-- Clones al principio para carrusel infinito -->
          <div
            v-for="(movie, index) in moviesCloneEnd"
            :key="`end-${index}`"
            class="movie-carousel__slide"
          >
            <div class="movie-carousel__card">
              <img :src="movie.image" :alt="movie.title" class="movie-carousel__image">
              <div class="movie-carousel__title-overlay">
                <h3 class="movie-carousel__movie-title">{{ movie.title }}</h3>
              </div>
            </div>
          </div>

          <!-- Películas originales -->
          <div
            v-for="(movie, index) in movies"
            :key="`original-${index}`"
            class="movie-carousel__slide"
          >
            <div class="movie-carousel__card">
              <img :src="movie.image" :alt="movie.title" class="movie-carousel__image">
              <div class="movie-carousel__title-overlay">
                <h3 class="movie-carousel__movie-title">{{ movie.title }}</h3>
              </div>
            </div>
          </div>

          <!-- Clones al final para carrusel infinito -->
          <div
            v-for="(movie, index) in moviesCloneStart"
            :key="`start-${index}`"
            class="movie-carousel__slide"
          >
            <div class="movie-carousel__card">
              <img :src="movie.image" :alt="movie.title" class="movie-carousel__image">
              <div class="movie-carousel__title-overlay">
                <h3 class="movie-carousel__movie-title">{{ movie.title }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón siguiente -->
      <button class="movie-carousel__nav movie-carousel__nav--next" @click="nextSlide">
        <span class="movie-carousel__nav-icon">&gt;</span>
      </button>
    </div>

    <!-- Indicadores -->
    <div class="movie-carousel__indicators">
      <button
        v-for="(_, index) in movies.length"
        :key="index"
        class="movie-carousel__indicator"
        :class="{ 'active': currentSlideIndex === index }"
        @click="goToSlide(index)"
      ></button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

// Importación de imágenes
import fastFuriousImage from '@/assets/images/fast_&_furious_x.jpg';
import venomImage from '@/assets/images/Wicked-Cartel.jpg';
import robotSalvajeImage from '@/assets/images/Robot-Salvaje-Cartel.jpg';
import terrifierImage from '@/assets/images/Terrifier-3.jpg';
import spidermanImage from '@/assets/images/Spiderman-No-Way-Home-Cartel.jpg';

export default defineComponent({
  name: 'MovieCarousel',
  setup() {
    // Referencias
    const trackContainer = ref(null);
    const track = ref(null);

    // Estado
    const slideWidth = ref(300); // Ancho inicial de diapositiva (se ajustará)
    const slideGap = ref(20); // Espacio entre diapositivas
    const currentSlideIndex = ref(0);
    const currentPosition = ref(0);
    const isTransitioning = ref(false);
    const autoplayInterval = ref(null);

    // Lista de películas
    const movies = ref([
      {
        title: 'ROBOT SALVAJE',
        image: robotSalvajeImage
      },
      {
        title: 'TERRIFIER 3',
        image: terrifierImage
      },
      {
        title: 'SPIDER-MAN: NO WAY HOME',
        image: spidermanImage
      },
      {
        title: 'VENOM',
        image: venomImage
      },
      {
        title: 'FAST & FURIOUS X',
        image: fastFuriousImage
      }
    ]);

    // Número de clones para mostrar antes y después (para el carrusel infinito)
    const numClones = ref(3);

    // Clones para el efecto infinito
    const moviesCloneStart = computed(() => {
      return movies.value.slice(0, numClones.value);
    });

    const moviesCloneEnd = computed(() => {
      return movies.value.slice(-numClones.value);
    });

    // Total de slides (original + clones)
    const totalSlides = computed(() => {
      return movies.value.length + numClones.value * 2;
    });

    // Calcular la posición de inicio real (después de los clones iniciales)
    const startPosition = computed(() => {
      return numClones.value * (slideWidth.value + slideGap.value);
    });

    // Métodos de navegación
    const calculateTargetPosition = (index) => {
      return startPosition.value + index * (slideWidth.value + slideGap.value);
    };

    const goToSlide = (index) => {
      if (isTransitioning.value) return;

      currentSlideIndex.value = index;
      currentPosition.value = calculateTargetPosition(index);
      restartAutoplay();
    };

    const nextSlide = () => {
      if (isTransitioning.value) return;

      isTransitioning.value = true;
      const nextIndex = (currentSlideIndex.value + 1) % movies.value.length;
      currentSlideIndex.value = nextIndex;
      currentPosition.value = calculateTargetPosition(nextIndex);

      restartAutoplay();

      setTimeout(() => {
        isTransitioning.value = false;
      }, 500); // Duración de la transición
    };

    const prevSlide = () => {
      if (isTransitioning.value) return;

      isTransitioning.value = true;
      const prevIndex = (currentSlideIndex.value - 1 + movies.value.length) % movies.value.length;
      currentSlideIndex.value = prevIndex;
      currentPosition.value = calculateTargetPosition(prevIndex);

      restartAutoplay();

      setTimeout(() => {
        isTransitioning.value = false;
      }, 500); // Duración de la transición
    };

    // Gestión del autoplay
    const startAutoplay = () => {
      stopAutoplay();
      autoplayInterval.value = setInterval(() => {
        nextSlide();
      }, 5000);
    };

    const stopAutoplay = () => {
      if (autoplayInterval.value) {
        clearInterval(autoplayInterval.value);
        autoplayInterval.value = null;
      }
    };

    const restartAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    // Ajustar el tamaño de las diapositivas según el ancho del contenedor
    const updateSlideSizes = () => {
      if (!trackContainer.value) return;

      const containerWidth = trackContainer.value.clientWidth;
      let slidesPerView = 3;

      // Ajustar slides visibles según ancho
      if (containerWidth < 768) {
        slidesPerView = 1;
      } else if (containerWidth < 1024) {
        slidesPerView = 2;
      }

      // Calcular nuevo ancho de slide
      const availableWidth = containerWidth - (slidesPerView - 1) * slideGap.value;
      slideWidth.value = Math.floor(availableWidth / slidesPerView);

      // Actualizar posición actual para mantener el slide activo
      currentPosition.value = calculateTargetPosition(currentSlideIndex.value);
    };

    // Observar cambios en el ancho de ventana
    const handleResize = () => {
      updateSlideSizes();
    };

    // Observar transiciones para efecto infinito
    const handleTransitionEnd = () => {
      // Cuando llega al final, saltar al inicio sin transición
      if (currentSlideIndex.value === movies.value.length - 1 && !isTransitioning.value) {
        // Desactivar transición
        track.value.style.transition = 'none';

        // Reiniciar al principio
        currentSlideIndex.value = 0;
        currentPosition.value = calculateTargetPosition(0);

        // Reactivar transición después del salto
        setTimeout(() => {
          track.value.style.transition = 'transform 0.5s ease';
        }, 50);
      }
    };

    // Lifecycle hooks
    onMounted(() => {
      // Inicializar tamaños
      nextTick(() => {
        updateSlideSizes();

        // Iniciar en el primer slide real (después de los clones)
        currentPosition.value = startPosition.value;
      });

      // Configurar listeners
      window.addEventListener('resize', handleResize);
      if (track.value) {
        track.value.addEventListener('transitionend', handleTransitionEnd);
      }

      // Iniciar autoplay
      startAutoplay();
    });

    onUnmounted(() => {
      stopAutoplay();
      window.removeEventListener('resize', handleResize);
      if (track.value) {
        track.value.removeEventListener('transitionend', handleTransitionEnd);
      }
    });

    return {
      trackContainer,
      track,
      movies,
      moviesCloneStart,
      moviesCloneEnd,
      currentSlideIndex,
      currentPosition,
      slideWidth,
      prevSlide,
      nextSlide,
      goToSlide
    };
  }
});
</script>

<style lang="scss" scoped>
.movie-carousel {
  padding: 2rem 0;

  &__title {
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: white;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  &__track-container {
    width: 100%;
    overflow: hidden;
    padding: 1rem 0;
  }

  &__track {
    display: flex;
    gap: 20px;
    transition: transform 0.5s ease;
  }

  &__slide {
    flex: 0 0 auto;
  }

  &__card {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 380px;

    @media (max-width: 768px) {
      height: 320px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__title-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
    padding: 2rem 1rem 1rem;
  }

  &__movie-title {
    color: white;
    text-align: center;
    font-size: 1.2rem;
    margin: 0;
    font-weight: 600;
  }

  &__nav {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 44, 120, 0.7);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 2;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(255, 44, 120, 1);
    }

    &--prev {
      left: 10px;
    }

    &--next {
      right: 10px;
    }
  }

  &__nav-icon {
    line-height: 1;
  }

  &__indicators {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 2rem;
  }

  &__indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;

    &.active {
      background: rgba(255, 44, 120, 1);
      transform: scale(1.2);
    }
  }
}
</style>
