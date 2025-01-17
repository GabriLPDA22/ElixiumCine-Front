<template>
    <!-- Main Content -->
    <main class="cine-detail">
        <!-- Fondo e Información de la película -->
        <div id="background-image" class="cine-detail__background"></div>
        <img id="cinema-logo" src="../../images/gran-casa.svg" alt="Gran Casa Logo"
            class="cine-detail__logo" />
        <section class="cine-detail__info">
            <h1 id="movie-title" class="cine-detail__info-title">
                Título de la Película
            </h1>
            <div id="movie-metadata" class="cine-detail__info-metadata">
                <!-- Aquí se llenará la información con IMDb, año, duración, género -->
            </div>
            <p id="movie-description" class="cine-detail__info-description">
                Descripción de la película...
            </p>

            <div id="day-selector" class="day-selector"></div>

            <div id="showtimes-container" class="cine-detail__info-showtimes">
                <div class="session">
                    <div class="session__time">16:30</div>
                    <div class="session__room">Sala 10 iSense</div>
                    <div class="session__tag session__tag--isense">iSense</div>
                </div>
                <div class="session">
                    <div class="session__time">18:05</div>
                    <div class="session__room">Sala 8</div>
                </div>
                <div class="session">
                    <div class="session__time">19:20</div>
                    <div class="session__room">Sala 10 iSense</div>
                    <div class="session__tags">
                        <div class="session__tag session__tag--isense">iSense</div>
                        <div class="session__tag session__tag--vose">VOSE</div>
                    </div>
                </div>
            </div>
            <section class="main__top-movies">
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
        </section>
    </main>
</template>


<script>
export default {
  name: 'GranCasa',
};
</script>