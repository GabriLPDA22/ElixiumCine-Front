<template>

    <h2>Todas las Películas</h2>

    <!-- Filtros -->
    <div class="movies__filters">
        <button class="filter-button active" data-filter="all">Todas</button>
        <button class="filter-button" data-filter="inTheater">En cartelera</button>
        <button class="filter-button" data-filter="comingSoon">Próximos</button>
        <button class="filter-button" data-filter="preSale">Venta anticipada</button>
    </div>

    <div class="movies__container">
        <div class="movie-card">
            <img src="" alt="Movie 1" class="movie-card__image">
            <h3 class="movie-card__title">Movie 1</h3>
        </div>
        <div class="movie-card">
            <img src="" alt="Movie 2" class="movie-card__image">
            <h3 class="movie-card__title">Movie 2</h3>
        </div>
    </div>

</template>