<!-- src/views/CookiesView.vue -->
<template>
  <div class="cookies-page">
    <header class="header">
      <div class="container">
        <h1>Política de Cookies</h1>
        <p>Información sobre el uso de cookies en este sitio web.</p>
      </div>
    </header>

    <main class="main-content">
      <div class="container">
        <section class="section">
          <h2>¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que se almacenan en el navegador del usuario para recoger información sobre su visita al sitio web. Se utilizan para mejorar la experiencia de navegación y ofrecer un servicio más personalizado.</p>
        </section>

        <section class="section">
          <h2>Tipos de cookies utilizadas</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Caducidad</th>
                <th>Finalidad</th>
                <th>Clase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>__utma</td>
                <td>De terceros (Google Analytics)</td>
                <td>2 años</td>
                <td>Se usa para distinguir usuarios y sesiones.</td>
                <td>No Exenta</td>
              </tr>
              <tr>
                <td>__utmb</td>
                <td>De terceros (Google Analytics)</td>
                <td>30 minutos</td>
                <td>Se usa para determinar nuevas sesiones o visitas.</td>
                <td>No Exenta</td>
              </tr>
              <tr>
                <td>__utmc</td>
                <td>De terceros (Google Analytics)</td>
                <td>Al finalizar la sesión</td>
                <td>Se configura para su uso con Urchin.</td>
                <td>No Exenta</td>
              </tr>
              <tr>
                <td>__utmz</td>
                <td>De terceros (Google Analytics)</td>
                <td>6 meses</td>
                <td>Almacena el origen o la campaña que explica cómo el usuario ha llegado hasta la página web.</td>
                <td>No Exenta</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="section">
          <h2>Desactivación de cookies</h2>
          <p>Puedes evitar la descarga de cookies configurando tu navegador. Aquí tienes algunos enlaces útiles para configurar las cookies en los navegadores más comunes:</p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank">Google Chrome</a></li>
            <li><a href="http://windows.microsoft.com/es-es/windows-vista/cookies-frequently-asked-questions" target="_blank">Internet Explorer</a></li>
            <li><a href="http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we" target="_blank">Mozilla Firefox</a></li>
            <li><a href="http://www.apple.com/es/privacy/use-of-cookies/" target="_blank">Safari</a></li>
            <li><a href="http://help.opera.com/Windows/11.50/es-ES/cookies.html" target="_blank">Opera</a></li>
          </ul>
        </section>

        <section class="section">
          <h2>Entidad responsable</h2>
          <p>La entidad responsable de la recogida, procesamiento y utilización de tus datos personales es <strong>Elixium</strong>, propiedad de Gabriel Saiz & Francisco Villa – C/Inventada1234.</p>
        </section>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; {{ currentYear }} Elixium. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'CookiesView',
  setup() {
    const currentYear = ref(new Date().getFullYear());

    return { currentYear };
  }
}
</script>

<style lang="scss" scoped>
$primary-color: #1D1731;
$secondary-color: #f5f5f5;
$text-color: #333;
$table-border: #ACACAC;
$font-family: 'Arial', sans-serif;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cookies-page {
  font-family: $font-family;
  color: $text-color;
  background-color: $secondary-color;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.header {
  background: $primary-color;
  color: white;
  text-align: center;
  padding: 2rem 0;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
  }
}

.main-content {
  padding: 2rem 0;

  .section {
    margin-bottom: 2rem;

    h2 {
      font-size: 1.8rem;
      color: $primary-color;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;

      li {
        margin-bottom: 0.5rem;

        a {
          color: $primary-color;
          text-decoration: underline;
        }
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;

      th, td {
        border: 1px solid $table-border;
        padding: 0.75rem;
        text-align: left;
      }

      th {
        background: $primary-color;
        color: white;
      }

      tr:nth-child(even) {
        background: $secondary-color;
      }
    }
  }
}

.footer {
  background: $primary-color;
  color: white;
  text-align: center;
  padding: 1rem 0;

  p {
    font-size: 0.9rem;
  }
}
</style>
