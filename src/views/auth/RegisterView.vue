<!-- src/views/auth/RegisterView.vue -->
<template>
  <div class="register-page">
    <!-- Header -->
    <header class="header">
      <router-link to="/" class="header__logo">Elixium</router-link>
      <div class="header__language">
        <button class="header__language-btn" id="language-toggle" @click="toggleLanguageDropdown">
          <span id="current-language">{{ currentLanguage === 'en' ? 'English' : 'Español' }}</span>
          <img src="@/assets/images/globo.png" alt="Language Icon" class="header__language-icon">
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

    <!-- Main Registration Form -->
    <main class="auth">
      <div class="auth__form-container">
        <h2 class="auth__title">{{ translations[currentLanguage].signUp }}</h2>
        <form class="auth__form" @submit.prevent="register">
          <div class="auth__field">
            <label for="name" class="auth__label">{{ translations[currentLanguage].name }}</label>
            <input type="text" id="name" v-model="formData.name" class="auth__input" required>
          </div>
          <div class="auth__field">
            <label for="email" class="auth__label">{{ translations[currentLanguage].email }}</label>
            <input type="email" id="email" v-model="formData.email" class="auth__input" required>
          </div>
          <div class="auth__field">
            <label for="password" class="auth__label">{{ translations[currentLanguage].password }}</label>
            <input type="password" id="password" v-model="formData.password" class="auth__input" required>
          </div>
          <button type="submit" class="auth__button">{{ translations[currentLanguage].signUp }}</button>
          <div class="auth__options">
            <label class="auth__checkbox-label">
              <input type="checkbox" v-model="formData.rememberMe" class="auth__checkbox">
              {{ translations[currentLanguage].rememberMe }}
            </label>
            <router-link to="/auth/login" class="auth__link">
              {{ translations[currentLanguage].alreadyHaveAccount }}
            </router-link>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterView',
  setup() {
    const router = useRouter();
    const showLanguageDropdown = ref(false);
    const currentLanguage = ref('es');

    // Form data
    const formData = reactive({
      name: '',
      email: '',
      password: '',
      rememberMe: false
    });

    // Translations
    const translations = {
      en: {
        signUp: 'Sign up',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        rememberMe: 'Remember me',
        alreadyHaveAccount: 'Already have an account? Log in'
      },
      es: {
        signUp: 'Registrarse',
        name: 'Nombre',
        email: 'Correo',
        password: 'Contraseña',
        rememberMe: 'Recuérdame',
        alreadyHaveAccount: '¿Ya tienes una cuenta? Inicia sesión'
      }
    };

    // Poster images
    const posters = [
      { image: require('@/assets/images/dune_parte_dos.jpg'), size: 'small' },
      { image: require('@/assets/images/Vengadores_Infinity_War.jpg'), size: 'large' },
      { image: require('@/assets/images/escuadron_suicida-cartel.jpg'), size: 'small' },
      { image: require('@/assets/images/doctor-strange.jpg'), size: 'large' },
      { image: require('@/assets/images/Venom_Habraa_matanza.jpg'), size: 'large' },
      { image: require('@/assets/images/transformer-5.jpeg'), size: 'small' },
      { image: require('@/assets/images/harry-potter.jpeg'), size: 'large' },
      { image: require('@/assets/images/up.jpg'), size: 'small' }
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

    // Register function
    const register = async () => {
      try {
        const response = await fetch('http://localhost:5006/api/Auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Nombre: formData.name,
            Correo: formData.email,
            Contraseña: formData.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          alert(currentLanguage.value === 'en'
            ? 'Registration successful! You can now log in.'
            : 'Registro exitoso! Ahora puedes iniciar sesión.');
          router.push('/auth/login');
        } else {
          alert(`Error: ${data.mensaje || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert(currentLanguage.value === 'en'
          ? 'An error occurred during registration. Please try again later.'
          : 'Ocurrió un error durante el registro. Por favor, inténtalo más tarde.');
      }
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
      showLanguageDropdown,
      toggleLanguageDropdown,
      switchLanguage,
      register
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

.register-page {
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

@media (max-width: 480px) {
  .auth__form-container {
    width: 345px;
  }

  .auth {
    min-height: 80vh;
  }
}
</style>
