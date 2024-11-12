// Función para abrir el modal
function openCinemaModal() {
    const modal = document.getElementById("cinema-modal");
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Deshabilita el scroll en el body
    loadCinemas(); // Carga la lista de cines
}

// Función para cerrar el modal
function closeCinemaModal() {
    const modal = document.getElementById("cinema-modal");
    modal.classList.add("hidden");
    document.body.style.overflow = "auto"; // Habilita el scroll en el body
}

// Función para cargar los cines desde el backend
async function loadCinemas() {
    try {
        const response = await fetch('http://localhost:5006/api/Cine/GetCines'); // Asegúrate de que esta URL sea correcta
        if (!response.ok) {
            throw new Error('Error al cargar los cines');
        }
        const cinemas = await response.json();
        const cinemaList = document.getElementById("cinema-list");
        cinemaList.innerHTML = ""; // Limpia la lista antes de agregar los cines

        cinemas.forEach(cine => {
            const li = document.createElement("li");
            li.textContent = cine.nombre;
            li.dataset.cineId = cine.id;

            // Al hacer clic en un cine, se selecciona y se cierra el modal
            li.addEventListener("click", () => {
                selectCinema(cine.nombre, cine.id); // Pasa el nombre y el ID del cine seleccionado
                closeCinemaModal(); // Cierra el modal
            });

            cinemaList.appendChild(li);
        });
    } catch (error) {
        console.error("Error al cargar los cines:", error);
    }
}

// Función para seleccionar un cine y actualizar la UI
function selectCinema(cinemaName, cinemaId) {
    const locationElement = document.querySelector(".location span"); // Asegúrate de que este selector sea correcto
    locationElement.textContent = cinemaName; // Muestra el cine seleccionado en la UI

    // Cargar las películas del cine seleccionado
    loadMoviesByCinema(cinemaId);
}

// Función para cargar las películas de un cine específico
async function loadMoviesByCinema(cineId) {
    try {
        const response = await fetch(`http://localhost:5006/api/Cine/GetCineConPeliculas?cineId=${cineId}`);
        if (!response.ok) {
            throw new Error('Error al cargar las películas del cine');
        }
        const cine = await response.json();
        const moviesContainer = document.getElementById("movies-container"); // Asegúrate de que este elemento exista en tu HTML
        moviesContainer.innerHTML = ""; // Limpia el contenedor de películas

        cine.peliculas.forEach(pelicula => {
            // Crear elementos para mostrar la información de la película
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");

            const title = document.createElement("h3");
            title.textContent = pelicula.titulo;

            const description = document.createElement("p");
            description.textContent = pelicula.descripcion;

            // Agrega más detalles de la película según necesites

            movieElement.appendChild(title);
            movieElement.appendChild(description);

            moviesContainer.appendChild(movieElement);
        });
    } catch (error) {
        console.error("Error al cargar las películas del cine:", error);
    }
}
