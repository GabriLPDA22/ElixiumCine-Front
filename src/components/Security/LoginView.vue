<template>
    <main class="auth">
      <!-- Background Grid with Posters -->
      <div class="background-grid">
        <div
          class="poster poster--1 poster--small"
          style="background-image: url('/src/images/dune_parte_dos.jpg');"
        ></div>
        <div
          class="poster poster--2 poster--large"
          style="background-image: url('/src/images/Vengadores_Infinity_War.jpg');"
        ></div>
        <div
          class="poster poster--3 poster--small"
          style="background-image: url('/src/images/escuadron_suicida-cartel.jpg');"
        ></div>
        <div
          class="poster poster--4 poster--large"
          style="background-image: url('/src/images/doctor-strange.jpg');"
        ></div>
        <div
          class="poster poster--5 poster--large"
          style="background-image: url('/src/images/Venom_Habraa_matanza.jpg');"
        ></div>
        <div
          class="poster poster--6 poster--small"
          style="background-image: url('/src/images/transformer-5.jpeg');"
        ></div>
        <div
          class="poster poster--7 poster--large"
          style="background-image: url('/src/images/harry-potter.jpeg');"
        ></div>
        <div
          class="poster poster--8 poster--small"
          style="background-image: url('/src/images/up.jpg');"
        ></div>
      </div>
  
      <!-- Overlay -->
      <div class="overlay"></div>
  
      <!-- Auth Form -->
      <div class="auth__form-container">
        <h2 class="auth__title">Sign up</h2>
        <AuthForm />
      </div>
    </main>
  </template>
  
  <script>
  import AuthForm from "/src/components/Security/AuthForm.vue";
  
  export default {
    components: { AuthForm },
  };
  </script>
  
  <style scoped>
  /* Background Grid */
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
    z-index: 0;
  }
  
  .poster {
    background-size: cover;
    background-position: center;
    border-radius: 22px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    opacity: 0.57;
  }
  
  .poster--small {
    width: 281px;
    height: 300px;
  }
  
  .poster--large {
    width: 281px;
    height: 400px;
  }
  
  /* Auth */
  .auth {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    position: relative;
    z-index: 0;
  }
  
  .auth__form-container {
    background: rgba(252, 252, 252, 0.438);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(245, 242, 242, 0.5);
    text-align: center;
    width: 400px;
    z-index: 999;
  }
  
  .auth__title {
    font-size: 1.8rem;
    color: #ffffff;
    margin-bottom: 1.5rem;
  }
  
  /* Overlay */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
  </style>
  