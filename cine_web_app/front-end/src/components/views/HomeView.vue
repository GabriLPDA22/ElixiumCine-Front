<script setup lang="ts" name="HomeView">
import { ref, onMounted } from 'vue';
import { Pelicula } from '@/models/Pelicula'; // Modelo para las películas

// Estado para las películas
const movies = ref<Pelicula[]>([]);

// Estado para el índice del carrusel
const currentSlide = ref(0);

// Cantidad de películas visibles al mismo tiempo
const visibleSlides = 7;

// Espaciado entre las imágenes
const gap = 10; // En píxeles

// Función para cargar las películas desde el backend
const loadMovies = async () => {
  try {
    const response = await fetch('http://localhost:5006/api/Movie/GetPeliculas', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al cargar las películas: ${response.status}`);
    }

    // El backend devuelve un array de objetos con datos de películas
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
  // Ajuste para evitar problemas de índice negativo
  currentSlide.value = (currentSlide.value - 1 + movies.value.length) % movies.value.length;
};

const nextSlide = () => {
  // Ajuste para evitar desbordamientos
  currentSlide.value = (currentSlide.value + 1) % movies.value.length;
};

// Carga las películas al montar el componente
onMounted(() => {
  loadMovies().catch((error) => console.error('Error al cargar las películas:', error));
});
</script>

<template>
  <!-- Sección de Top Películas -->
  <section class="main__top-movies">
    <h2 class="main__title">Top Películas</h2>
    <div class="carousel">
      <!-- Botón izquierdo -->
      <button class="carousel__button carousel__button--left" @click="prevSlide">
        <span class="carousel__button-content">
          <img :src="getImagePath('left-arrow.png')" alt="Left Arrow" />
        </span>
      </button>

      <!-- Carrusel -->
      <div class="carousel__track-container">
        <ul
          class="carousel__track"
          :style="{
            transform: `translateX(calc(-${currentSlide} * (100% + ${gap}px) / ${visibleSlides}))`,
          }"
        >
          <li
            v-for="(movie, index) in movies"
            :key="movie.id"
            :style="{ flex: `0 0 calc((100% - (${gap}px * (${visibleSlides} - 1))) / ${visibleSlides})`, marginRight: `${gap}px` }"
            class="carousel__item"
            :class="{ active: index === currentSlide }"
          >
            <img
              :src="getImagePath(movie.cartel)"
              :alt="movie.titulo"
              class="carousel__image"
            />
            <p class="carousel__title">{{ movie.titulo }}</p>
          </li>
        </ul>
      </div>

      <!-- Botón derecho -->
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
    <div class="offers-section__grid">
      <div class="offer-card">
        <div class="offer-card__content">
          <h3 class="offer-card__title">Entrada gratis en tu cumpleaños</h3>
          <p class="offer-card__description">
            Regístrate y recibe una entrada gratis en el mes de tu cumpleaños si traes a 3 amigos contigo.
          </p>
        </div>
        <img src="@/images/cumpleanos.png" alt="Cumpleaños" class="offer-card__image" />
      </div>

      <div class="offer-card">
        <div class="offer-card__content">
          <h3 class="offer-card__title">Estreno Joker con amigos</h3>
          <p class="offer-card__description">
            Únete al estreno del Joker este 11 de noviembre y trae a un amigo para obtener 50% de descuento.
          </p>
        </div>
        <img src="@/images/ofertajoker.png" alt="Joker" class="offer-card__image" />
      </div>

      <div class="offer-card">
        <div class="offer-card__content">
          <h3 class="offer-card__title">Llavero de Película</h3>
          <p class="offer-card__description">
            Asiste al estreno y llévate un llavero exclusivo. ¡Hasta agotar existencias!
          </p>
        </div>
        <img src="@/images/Oferta-Llavero.png" alt="Llavero" class="offer-card__image" />
      </div>

      <div class="offer-card">
        <div class="offer-card__content">
          <h3 class="offer-card__title">Póster de Estreno</h3>
          <p class="offer-card__description">
            Recibe un póster oficial el primer día del estreno.
          </p>
        </div>
        <img src="@/images/Oferta-Poster.png" alt="Póster" class="offer-card__image" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Contenedor principal del carrusel */
.carousel__track-container {
  overflow: hidden;
  position: relative;
  width: 100%;
}

/* Estilo del carrusel */
.carousel__track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  list-style: none;
  padding: 0;
  margin: 0;
}

.carousel__item {
  text-align: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.7;
}

.carousel__item.active {
  transform: scale(1.05);
  opacity: 1;
}

/* Estilo de las imágenes */
.carousel__image {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.carousel__item.active .carousel__image {
  transform: scale(1.1);
}

/* Botones del carrusel */
.carousel__button {
  background: white; /* Fondo blanco del círculo */
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px; /* Tamaño del círculo */
  height: 50px; /* Tamaño del círculo */
  border-radius: 50%; /* Hace el botón circular */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra */
  transition: background-color 0.3s ease;
}

.carousel__button:hover {
  background-color: #f0f0f0; /* Cambio de color al pasar el mouse */
}

.carousel__button--left {
  left: 10px;
}

.carousel__button--right {
  right: 10px;
}

.carousel__button img {
  width: 24px;
  height: 24px;
}
</style>

