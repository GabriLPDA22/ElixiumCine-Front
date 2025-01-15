<script setup>
import cumpleanos from '../images/cumpleanos.png';
import ofertajoker from '../images/ofertajoker.png';
import ofertaLlavero from '../images/Oferta-Llavero.png';
import ofertaPoster from '../images/Oferta-Poster.png';
</script>

<template>
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
