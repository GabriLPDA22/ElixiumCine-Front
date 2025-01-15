<script setup>
import cumpleanos from '../../images/cumpleanos.png';
import ofertajoker from '../../images/ofertajoker.png';
import ofertaLlavero from '../../images/Oferta-Llavero.png';
import ofertaPoster from '../../images/Oferta-Poster.png';
</script>

<template>
    <section class="main__top-movies">
        <h2 class="main__title">Top Películas</h2>
        <div class="carousel">
            <!-- Botón izquierdo -->
            <button class="carousel__button carousel__button--left">
                <span class="carousel__button-content">
                    <img src="../../images/left-arrow.png" alt="Left Arrow">
                </span>
            </button>

            <!-- Carrusel de películas -->
            <div class="carousel__track-container">
                <ul class="carousel__track" id="carousel-track">
                    <!-- Las películas se cargarán dinámicamente aquí -->
                </ul>
            </div>

            <!-- Botón derecho -->
            <button class="carousel__button carousel__button--right">
                <span class="carousel__button-content">
                    <img src="../../images/right-arrow.png" alt="Right Arrow">
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
                <img :src="cumpleanos" alt="Cumpleaños" class="offer-card__image">
            </div>

            <div class="offer-card">
                <div class="offer-card__content">
                    <h3 class="offer-card__title">Estreno Joker con amigos</h3>
                    <p class="offer-card__description">
                        Únete al estreno del Joker este 11 de noviembre y trae a un amigo para obtener 50% de descuento.
                    </p>
                </div>
                <img :src="ofertajoker" alt="Joker" class="offer-card__image">
            </div>

            <div class="offer-card">
                <div class="offer-card__content">
                    <h3 class="offer-card__title">Llavero de Película</h3>
                    <p class="offer-card__description">
                        Asiste al estreno y llévate un llavero exclusivo. ¡Hasta agotar existencias!
                    </p>
                </div>
                <img :src="ofertaLlavero" alt="Llavero" class="offer-card__image">
            </div>

            <div class="offer-card">
                <div class="offer-card__content">
                    <h3 class="offer-card__title">Póster de Estreno</h3>
                    <p class="offer-card__description">
                        Recibe un póster oficial el primer día del estreno.
                    </p>
                </div>
                <img :src="ofertaPoster" alt="Póster" class="offer-card__image">
            </div>
        </div>
    </section>
</template>
