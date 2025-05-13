<!-- src/views/HomeView.vue (Corregido para usar Composition API) -->
<template>
  <main class="home">
    <!-- Sección Top Películas con Carousel -->
    <section class="home__section home__top-movies">
      <MovieCarousel />
    </section>

    <!-- Sección ¿Quienes somos? -->
    <section class="home__section home__about">
      <div class="container">
        <h2 class="home__section-title">¿Quienes somos?</h2>
        <div class="home__about-content">
          <p class="home__about-text">
            Nos dedicamos esencialmente a ofrecerte lo mejor del cine, acercándote a las últimas
            novedades, críticas, y todo lo que necesitas saber sobre el séptimo arte.
            Brindamos una experiencia única y completa, para que cada visita sea
            una nueva oportunidad de disfrutar y descubrir lo que más te apasiona
            en la pantalla grande.
          </p>
          <button class="home__about-button">Ver Más</button>
        </div>
      </div>
    </section>

    <!-- Sección Ofertas -->
    <section class="home__section home__offers">
      <div class="container">
        <h2 class="home__section-title">Ofertas</h2>
        <div class="home__offers-grid">
          <!-- Oferta 1 -->
          <div class="home__offer-card">
            <div class="home__offer-content">
              <h3 class="home__offer-title">Invita a un amig@ y compra un menú gigante</h3>
              <p class="home__offer-text">Ahora cuando vienes con amigos, puedes comprar menús gigantes con descuento. Válido de Lunes a Jueves.</p>
              <img :src="ofertaJokerImage" alt="Oferta 1" class="home__offer-image">
            </div>
          </div>

          <!-- Oferta 2 -->
          <div class="home__offer-card">
            <div class="home__offer-content">
              <h3 class="home__offer-title">Descuento para estudiantes</h3>
              <p class="home__offer-text">Si eres estudiante, disfruta de un 20% en todas nuestras salas presentando tu carnet de estudiante en taquilla.</p>
              <img :src="ofertaJokerImage" alt="Oferta 2" class="home__offer-image">
            </div>
          </div>

          <!-- Oferta 3 -->
          <div class="home__offer-card">
            <div class="home__offer-content">
              <h3 class="home__offer-title">Noche de parejas</h3>
              <p class="home__offer-text">Los miércoles, compra dos entradas y recibe gratis un menú de palomitas y bebidas para compartir.</p>
              <img :src="ofertaJokerImage" alt="Oferta 3" class="home__offer-image">
            </div>
          </div>

          <!-- Oferta 4 -->
          <div class="home__offer-card">
            <div class="home__offer-content">
              <h3 class="home__offer-title">Matinal infantil</h3>
              <p class="home__offer-text">Todos los sábados, sesiones infantiles a precio reducido en todas nuestras salas. ¡Trae a los peques!</p>
              <img :src="ofertaJokerImage" alt="Oferta 4" class="home__offer-image">
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { defineComponent } from 'vue';
import MovieCarousel from '@/components/common/MovieCarousel.vue';
import ofertaJokerImage from '@/assets/images/ofertajoker.png';
import bannerCinesImage from '@/assets/images/banner-cines.jpg';

export default defineComponent({
  name: 'HomeView',
  components: {
    MovieCarousel
  },
  setup() {
    return {
      ofertaJokerImage,
      bannerCinesImage
    };
  }
});
</script>

<style lang="scss" scoped>
.home {
  &__section {
    margin-bottom: 4rem;
  }

  &__section-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: white;
  }

  // Sección Quiénes somos
  &__about {
    padding: 3rem 0;
    background-image: v-bind('`url(${bannerCinesImage})`');
    background-size: cover;
    background-position: center;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
    }

    .container {
      position: relative;
      z-index: 1;
    }
  }

  &__about-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  &__about-text {
    color: white;
    line-height: 1.6;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }

  &__about-button {
    background-color: #ff2c78;
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ff5492;
    }
  }

  // Sección Ofertas
  &__offers {
    padding: 2rem 0;
  }

  &__offers-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__offer-card {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &__offer-content {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    position: relative;
    min-height: 200px;
    background-color: rgba(255, 255, 255, 0.9);
  }

  &__offer-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }

  &__offer-text {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #555;
    flex: 1;
  }

  &__offer-image {
    height: 60px;
    width: auto;
    object-fit: contain;
    align-self: flex-end;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
}

// Container para contenido centrado
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
