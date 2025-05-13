<!-- src/views/auth/LoginView.vue (Corregido) -->
<template>
  <div class="login-page">
    <!-- Header -->
    <header class="header">
      <router-link to="/" class="header__logo">Elixium</router-link>
      <div class="header__language">
        <button class="header__language-btn" id="language-toggle" @click="toggleLanguageDropdown">
          <span id="current-language">{{ currentLanguage === 'en' ? 'English' : 'Español' }}</span>
          <img :src="globoIcon" alt="Language Icon" class="header__language-icon">
        </button>
        <div class="header__language-dropdown" :style="{ display: showLanguageDropdown ? 'block' : 'none' }">
          <div class="header__language-option" @click="switchLanguage">
            {{ currentLanguage === 'en' ? 'Español' : 'English' }}
          </div>
        </div>
      </div>
    </header>

    <!-- Background Grid with Posters -->
    <div class="background-grid">
      <div v-for="(poster, index) in posters" :key="index"
        :class="`poster poster--${index + 1} poster--${poster.size}`"
        :style="{ backgroundImage: `url(${poster.image})` }">
      </div>
    </div>

    <!-- Overlay -->
    <div class="overlay"></div>

    <!-- Main Login Form -->
    <main class="auth">
      <div class="auth__form-container">
        <h2 class="auth__title">{{ translations[currentLanguage].logIn }}</h2>
        <form id="login-form" class="auth__form" @submit.prevent="login">
          <div class="auth__field">
            <label for="login-email" class="auth__label">{{ translations[currentLanguage].email }}</label>
            <input
              type="email"
              id="login-email"
              v-model="formData.email"
              class="auth__input"
              :placeholder="translations[currentLanguage].yourEmail"
              required
            >
          </div>
          <div class="auth__field">
            <label for="login-password" class="auth__label">{{ translations[currentLanguage].password }}</label>
            <input
              type="password"
              id="login-password"
              v-model="formData.password"
              class="auth__input"
              :placeholder="translations[currentLanguage].yourPassword"
              required
            >
          </div>
          <button type="submit" class="auth__button">
            {{ translations[currentLanguage].logIn }}
          </button>
          <div class="auth__options">
            <label class="auth__checkbox-label">
              <input type="checkbox" v-model="formData.rememberMe" class="auth__checkbox">
              {{ translations[currentLanguage].rememberMe }}
            </label>
            <router-link to="/auth/register" class="auth__link">
              {{ translations[currentLanguage].dontHaveAccount }}
            </router-link>
          </div>
        </form>

        <!-- Botón para comprar como invitado -->
        <div class="guest-option">
          <p id="guest-text">
            {{ translations[currentLanguage].continueAsGuest }}
          </p>
          <button id="guest-purchase-btn" class="auth__button auth__button--guest" @click="guestPurchase">
            {{ translations[currentLanguage].buyAsGuest }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// Importaciones de imágenes usando importación ES
import globoIcon from '@/assets/images/globo.png';
import dunePoster from '@/assets/images/dune_parte_dos.jpg';
import infinityWarPoster from '@/assets/images/Vengadores_Infinity_War.jpg';
import escuadronPoster from '@/assets/images/escuadron_suicida-cartel.jpg';
import doctorStrangePoster from '@/assets/images/doctor-strange.jpg';
import venomPoster from '@/assets/images/Venom_Habraa_matanza.jpg';
import transformerPoster from '@/assets/images/transformer-5.jpeg';
import harryPotterPoster from '@/assets/images/harry-potter.jpeg';
import upPoster from '@/assets/images/up.jpg';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const showLanguageDropdown = ref(false);
    const currentLanguage = ref('es');

    // Form data
    const formData = reactive({
      email: '',
      password: '',
      rememberMe: false
    });

    // Translations
    const translations = {
      en: {
        logIn: 'Log in',
        email: 'Email',
        password: 'Password',
        yourEmail: 'Your email',
        yourPassword: 'Your password',
        rememberMe: 'Remember me',
        dontHaveAccount: 'Don\'t have an account? Sign up',
        continueAsGuest: 'Don\'t have an account? You can continue as a guest:',
        buyAsGuest: 'Buy as Guest'
      },
      es: {
        logIn: 'Iniciar sesión',
        email: 'Correo',
        password: 'Contraseña',
        yourEmail: 'Tu correo',
        yourPassword: 'Tu contraseña',
        rememberMe: 'Recuérdame',
        dontHaveAccount: '¿No tienes una cuenta? Regístrate',
        continueAsGuest: '¿No tienes una cuenta? Puedes continuar como invitado:',
        buyAsGuest: 'Comprar como Invitado'
      }
    };

    // Poster images - usando variables importadas
    const posters = [
      { image: dunePoster, size: 'small' },
      { image: infinityWarPoster, size: 'large' },
      { image: escuadronPoster, size: 'small' },
      { image: doctorStrangePoster, size: 'large' },
      { image: venomPoster, size: 'large' },
      { image: transformerPoster, size: 'small' },
      { image: harryPotterPoster, size: 'large' },
      { image: upPoster, size: 'small' }
    ];

    // Toggle language dropdown
    const toggleLanguageDropdown = (event) => {
      event.stopPropagation();
      showLanguageDropdown.value = !showLanguageDropdown.value;
    };

    // Switch language
    const switchLanguage = () => {
      currentLanguage.value = currentLanguage.value === 'en' ? 'es' : 'en';
      showLanguageDropdown.value = false;
    };

    // Handle document click to close dropdown
    const handleDocumentClick = (event) => {
      const languageToggle = document.getElementById('language-toggle');
      if (languageToggle && !languageToggle.contains(event.target)) {
        showLanguageDropdown.value = false;
      }
    };

    // Login function
    const login = async () => {
      try {
        const response = await fetch('http://localhost:5006/api/Auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Correo: formData.email,
            Contraseña: formData.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Guardar el nombre de usuario en localStorage
          localStorage.setItem('usuario', data.nombre);

          // Redireccionar a la página de inicio
          router.push('/');
        } else {
          alert(`Error: ${data.mensaje || 'Error desconocido'}`);
        }
      } catch (error) {
        console.error('Login error:', error);
        alert(currentLanguage.value === 'en'
          ? 'An error occurred during login. Please try again later.'
          : 'Ocurrió un error durante el inicio de sesión. Por favor, inténtalo más tarde.');
      }
    };

    // Guest purchase function
    const guestPurchase = () => {
      // Mantener los parámetros de URL si existen
      const queryParams = new URLSearchParams(window.location.search);
      router.push({ path: '/productos-bar', query: Object.fromEntries(queryParams) });
    };

    // Setup event listeners
    onMounted(() => {
      document.addEventListener('click', handleDocumentClick);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleDocumentClick);
    });

    return {
      formData,
      currentLanguage,
      translations,
      posters,
      globoIcon,
      showLanguageDropdown,
      toggleLanguageDropdown,
      switchLanguage,
      login,
      guestPurchase
    };
  }
};
</script>

<style lang="scss" scoped>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-page {
  font-family: "Poppins", sans-serif;
  background-color: #1b1b2f;
  overflow: hidden;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: relative;
  z-index: 2;

  &__logo {
    font-size: 1.5rem;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
    background: radial-gradient(circle, #ff2c78, #dca4ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
  }

  &__language {
    position: relative;

    &-btn {
      background: none;
      border: none;
      font-size: 1rem;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    &-icon {
      width: 1rem;
      height: 1rem;
    }

    &-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      background: #1e1e2f;
      border-radius: 8px;
      margin-top: 0.5rem;
      padding: 0.5rem 0;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
      z-index: 2;

      .header__language-option {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        color: #ffffff;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
          background: #33334d;
        }
      }
    }
  }
}

.background-grid {
  display: grid;
  gap: 5px;
  width: 1300px;
  height: 750px;
  grid-template-columns: repeat(4, 1fr);
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  .poster {
    background-size: cover;
    background-position: center;
    border-radius: 22px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    opacity: 0.57;

    &--small {
      width: 281px;
      height: 300px;
    }

    &--large {
      width: 281px;
      height: 400px;
    }
  }

  .poster--1 {
    grid-column: 1;
    grid-row: 1;
  }
  .poster--2 {
    grid-column: 2;
    grid-row: 1 / span 2;
  }
  .poster--3 {
    grid-column: 3;
    grid-row: 1;
  }
  .poster--4 {
    grid-column: 4;
    grid-row: 1 / span 2;
  }
  .poster--5 {
    grid-column: 1;
    grid-row: 2 / span 2;
  }
  .poster--6 {
    grid-column: 2;
    grid-row: 3;
  }
  .poster--7 {
    grid-column: 3;
    grid-row: 2 / span 2;
  }
  .poster--8 {
    grid-column: 4;
    grid-row: 3;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(11, 11, 23, 0.5);
  z-index: 1;
}

.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  z-index: 2;

  &__form-container {
    background: rgba(30, 30, 47, 0.8);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    text-align: center;
    width: 400px;
  }

  &__title {
    font-size: 1.8rem;
    color: #ffffff;
    margin-bottom: 1.5rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;
  }

  &__label {
    font-size: 0.9rem;
    color: #dcdcdc;
  }

  &__input {
    padding: 0.8rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    background-color: #2e2e3b;
    color: #ffffff;

    &::placeholder {
      color: #888888;
    }

    &:focus {
      outline: 2px solid #ff2c78;
    }
  }

  &__button {
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background-color: #ff2c78;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #d45b8c;
    }

    &--guest {
      margin-top: 1rem;
      background-color: #3a3a59;

      &:hover {
        background-color: #4a4a69;
      }
    }
  }

  &__options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }

  &__checkbox-label {
    font-size: 0.8rem;
    color: #dcdcdc;
    display: flex;
    align-items: center;

    & input {
      margin-right: 0.5rem;
    }
  }

  &__link {
    font-size: 0.8rem;
    color: #dca4ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.guest-option {
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;

  p {
    color: #dcdcdc;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .auth__form-container {
    width: 345px;
  }

  .auth {
    min-height: 80vh;
  }
}
</style>
