# Cine-Front 🎥 (Docker)

Este proyecto es el frontend de un sistema de gestión de cine, diseñado para ejecutarse en un entorno **Dockerizado**. Proporciona una interfaz de usuario interactiva que consume una API documentada con **Swagger**.

---

## 🚀 Tecnologías utilizadas

- **HTML**: Estructura de las páginas web.
- **SCSS/CSS**: Estilización de la interfaz de usuario.
- **JavaScript**: Lógica y funcionalidad interactiva.
- **Fetch API**: Para consumir los servicios del backend.
- **Docker**: Contenedorización del proyecto.

---

## 🌐 Configuración del entorno

### Backend requerido

Este frontend está diseñado para conectarse a un backend (implementado con **Swagger**) que se ejecuta en un contenedor Docker. La URL del backend debe configurarse en el archivo `js/config.js` como:

```javascript
const BASE_URL = "http://backend-container:5000"; // Cambiar según tu configuración
