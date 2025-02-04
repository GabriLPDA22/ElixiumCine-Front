<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Pelicula } from '../../models/Pelicula';
import CardOfferComponent from '../OfferCards/CardOfferComponent.vue';


// Estado de las películas
const movies = ref<Pelicula[]>([]);
// const currentSlide = ref(0);
// const gap = 20; // Adjust the gap value as needed
// const visibleSlides = 3; // Adjust the number of visible slides as needed

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

// // Función para obtener la ruta de la imagen
// const getImagePath = (filename: string) => {
//   return `/src/images/${filename}`;
// };

// // Funciones del carrusel
// const prevSlide = () => {
//   currentSlide.value = (currentSlide.value - 1 + movies.value.length) % movies.value.length;
// };

// const nextSlide = () => {
//   currentSlide.value = (currentSlide.value + 1) % movies.value.length;
// };

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
  <!-- <section class="carousel">
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
  </section> -->

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
    <CardOfferComponent />
  </section>
</template>


<style lang="scss">
  body{
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
  background-color: rgb(5, 7, 19);
}

.main {
  background: linear-gradient(180deg, #0a0e27 0%, #000000 100%);
  padding: 0;
  color: #ffffff;
  height: auto;

  &__top-movies {
    text-align: center;
    margin-top: 0;
  }

  &__title {
    font-size: 2rem;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
    padding-top: 20px;
  }
}

.about-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  background-color: rgb(5, 7, 19);

  &__background {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/cine_web_app/front-end/images/banner-cines.jpg');
    background-size: cover;
    background-position: center;
    padding: 2rem;
    max-width: 1000px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__content {
    position: relative;
    z-index: 2;
    padding: 2rem;
    border-radius: 8px;
    color: #ffffff;
    max-width: 800px;
    text-align: center;
  }

  &__title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #ffffff;
  }

  &__description {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: #dcdcdc;
  }

  &__button {
    display: inline-block;
    padding: 0.7rem 2.5rem;
    background-color: #ff2c78;
    color: #ffffff;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #d3005a;
    }
  }
}

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
