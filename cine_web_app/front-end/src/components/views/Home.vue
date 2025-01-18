<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Pelicula } from '../../models/Pelicula';

defineOptions({
    name: 'HomeView',
});

// Estado de las películas
const movies = ref<Pelicula[]>([]);

// Función para cargar las películas
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

        // Ajustar URLs de las imágenes si son relativas
        movies.value = (await response.json()).map((movie: Pelicula) => {
            console.log(`URL de la imagen: http://localhost:5006/${movie.cartel}`);
            return {
                ...movie,
                cartel: `http://localhost:5006/${movie.cartel}`,
            };
        });

    } catch (error) {
        console.error('Error al cargar las películas:', error);
    }
};

// Métodos y propiedades faltantes
const prevSlide = () => {
    // Implement your logic here
};

const currentSlide = 0; // Set the initial value

const navigateToMovie = (id: number) => {
    console.log(`Navigating to movie with ID: ${id}`);
    // Implement your logic here
};

const nextSlide = () => {
    // Implement your logic here
};

// Llama a la función al montar el componente
onMounted(() => {
    loadMovies();
});
</script>


<template>
    <section class="main__top-movies">
        <h2 class="main__title">Top Películas</h2>
        <div class="carousel">
            <!-- Botón izquierdo -->
            <button class="carousel__button carousel__button--left" @click="prevSlide">
                <img src="../../images/left-arrow.png" alt="Left Arrow" />
            </button>

            <!-- Carrusel de películas -->
            <div class="carousel__track-container">
                <ul class="carousel__track">
                    <li v-for="(movie, index) in movies" :key="movie.id" class="carousel__slide"
                        :class="{ active: index === currentSlide }">
                        <img :src="movie.cartel" :alt="movie.titulo" class="carousel__image"
                            @click="navigateToMovie(movie.id)" />
                        <p class="carousel__title">{{ movie.titulo }}</p>
                    </li>
                </ul>
            </div>

            <!-- Botón derecho -->
            <button class="carousel__button carousel__button--right" @click="nextSlide">
                <img src="../../images/right-arrow.png" alt="Right Arrow" />
            </button>
        </div>
    </section>

    <!-- Sección de ¿Quiénes somos? -->
    <section class="about-section">
        <div class="about-section__background">
            <div class="about-section__content">
                <h2 class="about-section__title">¿Quiénes somos?</h2>
                <p class="about-section__description">
                    Nos dedicamos a ofrecerte lo mejor del cine, acercándote a las últimas
                    estrenos, críticas, y todo lo que necesitas saber sobre el séptimo arte.
                    Brindamos una experiencia única y completa, para que cada visita sea
                    una nueva oportunidad de disfrutar y descubrir lo que más te apasiona
                    en la pantalla grande.
                </p>
                <a href="/cine_web_app/front-end/views/quienessomos.html">
                    <button class="about-section__button">
                        <div style="text-decoration: none; color:white;">Ver Más</div>
                    </button>
                </a>
            </div>
        </div>
    </section>

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
                <img src="../../images/cumpleanos.png" alt="Cumpleaños" class="offer-card__image">
            </div>

            <div class="offer-card">
                <div class="offer-card__content">
                    <h3 class="offer-card__title">Estreno Joker con amigos</h3>
                    <p class="offer-card__description">
                        Únete al estreno del Joker este 11 de noviembre y trae a un amigo para obtener 50% de descuento.
                    </p>
                </div>
                <img src="../../images/ofertajoker.png" alt="Joker" class="offer-card__image">
            </div>

            <div class="offer-card">
                <div class="offer-card__content">
                    <h3 class="offer-card__title">Llavero de Película</h3>
                    <p class="offer-card__description">
                        Asiste al estreno y llévate un llavero exclusivo. ¡Hasta agotar existencias!
                    </p>
                </div>
                <img src="../../images/Oferta-Llavero.png" alt="Llavero" class="offer-card__image">
            </div>

            <div class="offer-card">
                <div class="offer-card__content">
                    <h3 class="offer-card__title">Póster de Estreno</h3>
                    <p class="offer-card__description">
                        Recibe un póster oficial el primer día del estreno.
                    </p>
                </div>
                <img src="../../images/Oferta-Poster.png" alt="Póster" class="offer-card__image">
            </div>
        </div>
    </section>
</template>
