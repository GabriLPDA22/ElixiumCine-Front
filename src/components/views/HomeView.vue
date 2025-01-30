<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Pelicula } from '@/models/Pelicula';

// Acceso a variables de entorno usando Vite
const apiUrl = import.meta.env.VITE_API_URL;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

console.log("API URL:", apiUrl);
console.log("Google Client ID:", googleClientId);

// Estado de las películas
const movies = ref<Pelicula[]>([]);
const currentSlide = ref(0);
const gap = 20; // Adjust the gap value as needed
const visibleSlides = 3; // Adjust the number of visible slides as needed

const loadMovies = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/Movie/GetPeliculas`, {
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
        <ul class="carousel__track" :style="{
          transform: `translateX(calc(-${currentSlide} * (100% + ${gap}px) / ${visibleSlides}))`,
        }">
          <li v-for="(movie, index) in movies" :key="movie.id"
            :style="{ flex: `0 0 calc((100% - (${gap}px * (${visibleSlides} - 1))) / ${visibleSlides})`, marginRight: `${gap}px` }"
            class="carousel__item" :class="{ active: index === currentSlide }">
            <img :src="getImagePath(movie.cartel)" :alt="movie.titulo" class="carousel__image" />
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
    <CardOfferComponent @card-clicked="handleCardClick" />
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
  background: white;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.carousel__button:hover {
  background-color: #f0f0f0;
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
