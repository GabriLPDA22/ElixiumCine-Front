<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Pelicula } from '../../models/Pelicula';


// Estado de las películas
const movies = ref<Pelicula[]>([]);
const currentSlide = ref(0);
const gap = 20; // Adjust the gap value as needed
const visibleSlides = 3; // Adjust the number of visible slides as needed

const loadMovies = async () => {
  try {
    const response = await fetch(`http://localhost:5167/api/Movie/GetPeliculas`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al cargar las películas: ${response.status}`);
    }

    movies.value = await response.json();
  } catch (error) {
    console.error('Error al cargar las películas:', error);
  }
};

// Función para obtener la ruta de la imagen
const getImagePath = (filename: string) => {
  return `/src/images/${filename}`;
};

// Funciones del carrusel
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + movies.value.length) % movies.value.length;
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % movies.value.length;
};

// Manejar clics en las ofertas
const handleCardClick = (title: string) => {
  console.log(`Oferta seleccionada: ${title}`);
};

// Carga las películas al montar el componente
onMounted(() => {
  loadMovies().catch((error) => console.error('Error al cargar las películas:', error));
});
</script>

<template>
  <section class="carousel">
    <div class="carousel__container">
      <button class="carousel__button carousel__button--left" @click="prevSlide">
        <span class="carousel__button-content">
          <img :src="getImagePath('left-arrow.png')" alt="Left Arrow" />
        </span>
      </button>
      <ul class="carousel__list" :style="{ transform: `translateX(calc(-${currentSlide} * (100% + ${gap}px) / ${visibleSlides}))` }">
        <li v-for="(movie, index) in movies" :key="movie.id"
          :style="{ flex: `0 0 calc((100% - (${gap}px * (${visibleSlides} - 1))) / ${visibleSlides})`, marginRight: `${gap}px` }"
          class="carousel__item" :class="{ active: index === currentSlide }">
          <img :src="getImagePath(movie.cartel)" :alt="movie.titulo" class="carousel__image" />
          <p class="carousel__title">{{ movie.titulo }}</p>
        </li>
      </ul>
      <button class="carousel__button carousel__button--right" @click="nextSlide">
        <span class="carousel__button-content">
          <img :src="getImagePath('right-arrow.png')" alt="Right Arrow" />
        </span>
      </button>
    </div>
  </section>

  <!-- Sección de ¿Quiénes somos? -->
  <section class="about-section">
    <div class="about-section__background">
      <div class="about-section__content">
        <h2 class="about-section__title">¿Quiénes somos?</h2>
        <p class="about-section__description">
          Nos dedicamos a ofrecerte lo mejor del cine, acercándote a los últimos estrenos, críticas y todo lo
          que necesitas saber sobre el séptimo arte.
        </p>
        <a href="/cine_web_app/front-end/views/quienessomos.html">
          <button class="about-section__button">
            <div style="text-decoration: none; color: white;">Ver Más</div>
          </button>
        </a>
      </div>
    </div>
  </section>

  <!-- Sección de Ofertas -->
  <section class="offers-section">
    <h2 class="offers-section__title">Ofertas</h2>
    <CardOfferComponent @card-clicked="handleCardClick" />
  </section>
</template>


<style lang="scss">
@import '../../assets/styles.scss';
</style>