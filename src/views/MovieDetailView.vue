<!-- src/views/MovieDetailView.vue -->
<template>
  <main class="movie-detail">
    <!-- Loading State -->
    <div v-if="loading" class="movie-detail__loading">
      <div class="loader"></div>
      <p>Cargando película...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="movie-detail__error">
      <p>{{ error }}</p>
      <button class="btn btn--primary" @click="fetchMovieDetails">Reintentar</button>
      <router-link to="/peliculas" class="btn btn--outline mt-3">Volver a películas</router-link>
    </div>

    <!-- Movie Content -->
    <template v-else-if="movie">
      <!-- Banner and Background -->
      <div class="movie-detail__banner">
        <img
          :src="movie.imagen"
          :alt="`Banner de ${movie.titulo}`"
          class="movie-detail__banner-image"
        >
        <div class="movie-detail__overlay"></div>
      </div>

      <!-- Movie Information -->
      <div class="movie-detail__content container">
        <div class="movie-detail__info">
          <!-- Poster -->
          <div class="movie-detail__poster">
            <img
              :src="movie.cartel"
              :alt="`Cartel de ${movie.titulo}`"
              class="movie-detail__poster-image"
            >

            <!-- Age Rating -->
            <div v-if="movie.edadRecomendada" class="movie-detail__age-rating">
              <img
                :src="movie.imagenEdadRecomendada"
                :alt="`Clasificación ${movie.edadRecomendada}`"
                class="movie-detail__age-rating-icon"
              >
            </div>
          </div>

          <!-- Details -->
          <div class="movie-detail__details">
            <h1 class="movie-detail__title">{{ movie.titulo }}</h1>

            <div class="movie-detail__metadata">
              <!-- Movie Rating -->
              <div v-if="movie.calificacion" class="movie-detail__rating">
                <span class="movie-detail__rating-stars">
                  <i v-for="i in Math.floor(movie.calificacion / 2)" :key="`star-${i}`" class="star star--full">★</i>
                  <i v-if="movie.calificacion % 2 !== 0" class="star star--half">★</i>
                </span>
                <span class="movie-detail__rating-value">{{ (movie.calificacion / 2).toFixed(1) }}</span>
              </div>

              <!-- Movie Duration -->
              <div v-if="movie.duracion" class="movie-detail__duration">
                <i class="icon">⏱</i>
                <span>{{ movie.duracion }}</span>
              </div>

              <!-- Release Date -->
              <div v-if="movie.fechaEstreno" class="movie-detail__release-date">
                <i class="icon">📅</i>
                <span>{{ formatDate(movie.fechaEstreno) }}</span>
              </div>

              <!-- Genre -->
              <div v-if="movie.genero" class="movie-detail__genre">
                <span>{{ movie.genero }}</span>
              </div>
            </div>

            <!-- Description -->
            <div class="movie-detail__section">
              <h2 class="movie-detail__section-title">Sinopsis</h2>
              <p class="movie-detail__description">{{ movie.descripcion }}</p>
            </div>

            <!-- Director -->
            <div v-if="movie.director" class="movie-detail__section">
              <h2 class="movie-detail__section-title">Director</h2>
              <p class="movie-detail__director">{{ movie.director }}</p>
            </div>

            <!-- Actors -->
            <div v-if="movie.actores" class="movie-detail__section">
              <h2 class="movie-detail__section-title">Reparto</h2>
              <p class="movie-detail__actors">{{ movie.actores }}</p>
            </div>
          </div>
        </div>

        <!-- Session Selection Section -->
        <div class="movie-detail__sessions">
          <div class="movie-detail__session-header">
            <h2 class="movie-detail__section-title">Sesiones disponibles</h2>

            <!-- Cinema Selection -->
            <div class="movie-detail__cinema-selector">
              <button
                class="movie-detail__cinema-button"
                @click="showCinemaSelector = true"
              >
                {{ selectedCinema ? selectedCinema.nombre : 'Seleccionar cine' }}
                <i class="icon">🔽</i>
              </button>

              <!-- Cinema Selector Modal -->
              <div
                v-if="showCinemaSelector"
                class="movie-detail__cinema-modal"
              >
                <div class="movie-detail__cinema-modal-overlay" @click="showCinemaSelector = false"></div>
                <div class="movie-detail__cinema-modal-content">
                  <h3 class="movie-detail__cinema-modal-title">Selecciona un cine</h3>
                  <ul class="movie-detail__cinema-list">
                    <li
                      v-for="cinema in cinemas"
                      :key="cinema.id"
                      class="movie-detail__cinema-item"
                      @click="selectCinema(cinema)"
                    >
                      {{ cinema.nombre }}
                    </li>
                  </ul>
                  <button
                    class="movie-detail__cinema-modal-close"
                    @click="showCinemaSelector = false"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Day Selector -->
          <div class="movie-detail__day-selector">
            <button
              v-for="(day, index) in availableDays"
              :key="index"
              class="day-button"
              :class="{ 'active': selectedDay === day.date }"
              @click="selectDay(day.date)"
            >
              {{ day.label }}
            </button>
          </div>

          <!-- Session Times -->
          <div v-if="selectedCinema && selectedDay">
            <SessionTimes
              :sessions="filteredSessions"
              @select-session="selectSession"
            />
          </div>

          <div v-else class="movie-detail__no-sessions">
            <p>Selecciona un cine y una fecha para ver las sesiones disponibles.</p>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '@/store/movie';
import { useCinemaStore } from '@/store/cinema';
import { useCartStore } from '@/store/cart';
import SessionTimes from '@/components/common/SessionTimes.vue';
import type { Cinema } from '@/types/Cinema';
import type { Session } from '@/types/Session';

// Router
const route = useRoute();
const router = useRouter();

// Stores
const movieStore = useMovieStore();
const cinemaStore = useCinemaStore();
const cartStore = useCartStore();

// Reactive state
const loading = ref(true);
const error = ref<string | null>(null);
const selectedCinema = ref<Cinema | null>(null);
const selectedDay = ref<string | null>(null);
const showCinemaSelector = ref(false);

// Get movie ID from route params
const movieId = computed(() => {
  const id = Number(route.params.id);
  return isNaN(id) ? null : id;
});

// Get movie from store
const movie = computed(() => {
  return movieStore.currentMovie;
});

// Get cinemas from store
const cinemas = computed(() => {
  return cinemaStore.cinemas;
});

// Generate available days for the selector (next 7 days)
const availableDays = computed(() => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dateStr = formatDateForAPI(date);
    const dayName = getDayName(date.getDay()).slice(0, 3).toLowerCase();
    const dayNum = date.getDate();
    const monthName = getMonthName(date.getMonth()).slice(0, 3).toLowerCase();

    days.push({
      date: dateStr,
      label: `${dayName}, ${dayNum} ${monthName}`
    });
  }

  return days;
});

// Filter sessions based on selected cinema and day
const filteredSessions = computed(() => {
  if (!movie.value || !selectedCinema.value || !selectedDay.value) {
    return [];
  }

  // Check if movie has sessions for this cinema and day
  if (!movie.value.sesiones ||
      !movie.value.sesiones[selectedCinema.value.nombre] ||
      !movie.value.sesiones[selectedCinema.value.nombre][selectedDay.value]) {
    return [];
  }

  return movie.value.sesiones[selectedCinema.value.nombre][selectedDay.value];
});

// Methods
const fetchMovieDetails = async () => {
  if (!movieId.value) {
    error.value = 'ID de película no válido';
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    // Fetch movie details
    await movieStore.fetchMovieById(movieId.value);

    // Fetch cinemas if not already loaded
    if (cinemas.value.length === 0) {
      await cinemaStore.fetchCinemas();
    }

    // Select first day by default
    if (availableDays.value.length > 0) {
      selectedDay.value = availableDays.value[0].date;
    }
  } catch (err) {
    error.value = 'Error al cargar los detalles de la película';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const selectCinema = (cinema: Cinema) => {
  selectedCinema.value = cinema;
  showCinemaSelector.value = false;
};

const selectDay = (date: string) => {
  selectedDay.value = date;
};

const selectSession = (session: Session) => {
  if (!movie.value || !selectedCinema.value || !selectedDay.value) return;

  // Set session info in cart store
  cartStore.setSessionInfo({
    movieTitle: movie.value.titulo,
    cineName: selectedCinema.value.nombre,
    date: selectedDay.value,
    time: session.hora,
    room: session.sala,
    sessionId: session.id
  });

  // Navigate to seat selection
  router.push('/butacas');
};

// Format date for display (DD/MM/YYYY)
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// Format date for API (YYYY-MM-DD)
const formatDateForAPI = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// Get day name
const getDayName = (dayIndex: number) => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return days[dayIndex];
};

// Get month name
const getMonthName = (monthIndex: number) => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[monthIndex];
};

// Lifecycle hooks
onMounted(() => {
  fetchMovieDetails();
});

// Reset movie details when component is unmounted
onBeforeUnmount(() => {
  movieStore.resetCurrentMovie();
});

// Watch for changes in movieId
watch(
  () => route.params.id,
  () => {
    fetchMovieDetails();
  }
);
</script>

<style lang="scss" scoped>
.movie-detail {
  min-height: calc(100vh - 200px);
  background-color: $color-background-darker;

  &__loading,
  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 200px);
    padding: 3rem 0;
    text-align: center;
    color: $color-text;

    .loader {
      display: inline-block;
      width: 50px;
      height: 50px;
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-left-color: $color-primary;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }
  }

  &__banner {
    position: relative;
    width: 100%;
    height: 45vh;
    overflow: hidden;

    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(10, 14, 39, 1));
  }

  &__content {
    margin-top: -100px;
    position: relative;
    z-index: 1;
    padding-bottom: 3rem;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3rem;

    @include md {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  &__poster {
    position: relative;
    flex-shrink: 0;
    width: 300px;
    margin: 0 auto;

    @include md {
      margin: 0;
    }

    &-image {
      width: 100%;
      border-radius: $border-radius-md;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    }
  }

  &__age-rating {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: $border-radius-sm;
    padding: 5px;

    &-icon {
      height: 20px;
      width: auto;
    }
  }

  &__details {
    flex: 1;
  }

  &__title {
    font-size: $font-size-3xl;
    margin-bottom: 1rem;
  }

  &__metadata {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;

    > div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.2rem 0.5rem;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: $border-radius-sm;
      font-size: $font-size-sm;
    }
  }

  &__rating {
    &-stars {
      color: $color-warning;
      margin-right: 0.2rem;

      .star {
        &--half {
          position: relative;
          display: inline-block;
          overflow: hidden;
          width: 0.5em;
        }
      }
    }

    &-value {
      font-weight: 600;
    }
  }

  &__section {
    margin-bottom: 1.5rem;

    &-title {
      font-size: $font-size-lg;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: $color-primary;
    }
  }

  &__description,
  &__director,
  &__actors {
    font-size: $font-size-base;
    line-height: 1.6;
    color: $color-text-secondary;
  }

  &__session-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    @include md {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__day-selector {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 2rem;

    .day-button {
      padding: 0.5rem 1rem;
      background: none;
      border: none;
      color: $color-text-secondary;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all $transition-normal;

      &.active {
        color: $color-primary;
        border-bottom-color: $color-primary;
      }

      &:hover:not(.active) {
        color: $color-text;
      }
    }
  }

  &__cinema-selector {
    position: relative;
  }

  &__cinema-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    color: $color-text;
    border: 1px solid $color-primary;
    border-radius: $border-radius-sm;
    cursor: pointer;
    transition: all $transition-normal;

    &:hover {
      background-color: rgba($color-primary, 0.2);
    }

    .icon {
      font-size: $font-size-xs;
    }
  }

  &__cinema-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;

    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
    }

    &-content {
      position: relative;
      z-index: 1;
      background-color: $color-background-card;
      border-radius: $border-radius-md;
      padding: 2rem;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    }

    &-title {
      font-size: $font-size-xl;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    &-close {
      display: block;
      width: 100%;
      padding: 0.75rem;
      margin-top: 1.5rem;
      background-color: $color-primary;
      color: white;
      border: none;
      border-radius: $border-radius-sm;
      cursor: pointer;
      transition: background-color $transition-normal;

      &:hover {
        background-color: $color-primary-dark;
      }
    }
  }

  &__cinema-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__cinema-item {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: background-color $transition-normal;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &__no-sessions {
    text-align: center;
    padding: 2rem;
    color: $color-text-secondary;
    font-style: italic;
  }
}

// Keyframes for the loader spinner
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
