// Obtén el ID de la película de la URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Variables globales
let cineSeleccionado = null;
let diaSeleccionado = null; // No hay día seleccionado al inicio
const daySelector = document.getElementById("day-selector");
const showtimesContainer = document.getElementById("showtimes-container");

// Oculta los elementos relacionados con sesiones y días al cargar la página
daySelector.style.display = "none";
showtimesContainer.style.display = "none";

// Función para cargar los detalles de la película
async function loadMovieDetails(id) {
    try {
        const response = await fetch(`http://localhost:5006/api/Movie/GetPeliculaById?id=${id}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const movie = await response.json();
        console.log('Datos de la película:', movie);

        // Asigna datos de la película a los elementos HTML
        document.getElementById('movie-banner').src = movie.imagen;
        document.getElementById('movie-poster').src = movie.cartel;
        document.getElementById('movie-title').textContent = movie.titulo;
        document.getElementById('movie-director').textContent = movie.director;
        document.getElementById('movie-actors').textContent = movie.actores;
        document.getElementById('movie-description').textContent = movie.descripcion;
        document.getElementById('movie-duration').textContent = movie.duracion;
        document.getElementById('movie-release-date').textContent = movie.fechaEstreno;
        document.getElementById('movie-genre').textContent = movie.genero;
        document.getElementById('movie-rating').textContent = movie.calificacion;

        // Imagen de clasificación de edad
        const ageRatingIcon = document.getElementById('age-rating-icon');
        ageRatingIcon.src = movie.imagenEdadRecomendada;
        ageRatingIcon.alt = `Clasificación +${movie.edadRecomendada}`;
    } catch (error) {
        console.error("Error loading movie details:", error);
    }
}


function redirectToSeatSelection(movieTitle, cineName, date, time, room) {
    console.log(`Redirigiendo con movieTitle: ${movieTitle}, cineName: ${cineName}, date: ${date}, time: ${time}, room: ${room}`);
    // Redirige a la página de selección de asientos con los datos en la URL
    window.location.href = `/cine_web_app/front-end/views/butacas.html?movieTitle=${encodeURIComponent(movieTitle)}&cineName=${encodeURIComponent(cineName)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&room=${encodeURIComponent(room)}`;
}




// Abre el modal para selección de cine
function openCinemaModal() {
    document.getElementById("cinema-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
    loadCinemas();
}

// Cierra el modal de cine
function closeCinemaModal() {
    document.getElementById("cinema-modal").classList.add("hidden");
    document.body.style.overflow = "auto";
}

// Cargar cines desde el backend
async function loadCinemas() {
    try {
        const response = await fetch('http://localhost:5006/api/Cine/GetCines');
        if (!response.ok) throw new Error('Error al cargar los cines');

        const cinemas = await response.json();
        const cinemaList = document.getElementById("cinema-list");
        cinemaList.innerHTML = "";

        cinemas.forEach(cine => {
            const li = document.createElement("li");
            li.textContent = cine.nombre;
            li.dataset.cineId = cine.id;

            li.addEventListener("click", () => {
                selectCinema(cine.nombre, cine.id);
                closeCinemaModal();
            });

            cinemaList.appendChild(li);
        });
    } catch (error) {
        console.error("Error al cargar los cines:", error);
    }
}

// Seleccionar cine y actualizar la UI
function selectCinema(cinemaName, cinemaId) {
    cineSeleccionado = cinemaId;
    document.querySelector(".location span").textContent = cinemaName;

    // Muestra los elementos y carga las sesiones una vez se ha seleccionado el cine
    if (cineSeleccionado) {
        daySelector.style.display = "flex";
        showtimesContainer.style.display = "flex";
        loadDaysAndSessions(); // Cargar los días y las sesiones del cine seleccionado
    } else {
        daySelector.style.display = "none";
        showtimesContainer.style.display = "none";
    }
}

// Cargar los días y las sesiones
async function loadDaysAndSessions() {
    try {
        const response = await fetch(`http://localhost:5006/api/Cine/GetCineConPeliculas?cineId=${cineSeleccionado}`);
        if (!response.ok) throw new Error('Error al cargar las películas del cine');

        const cine = await response.json();
        console.log("Películas desde el backend:", cine.peliculas);

        daySelector.innerHTML = "";

        const fechasUnicas = new Set();

        cine.peliculas.forEach((pelicula) => {
            console.log(`Cargando sesiones para: ${pelicula.titulo}`);
            const sesionesPorCine = pelicula.sesiones["Gran Casa"]; // Cambiar si el cine no es "Gran Casa"
            if (!sesionesPorCine) return;

            Object.keys(sesionesPorCine).forEach((day) => {
                if (/^\d{4}-\d{2}-\d{2}$/.test(day)) {
                    fechasUnicas.add(day);
                } else {
                    console.warn(`Fecha inválida: ${day}`);
                }
            });
        });

        [...fechasUnicas].sort().forEach((day, index) => {
            const dayButton = document.createElement("button");
            dayButton.classList.add("day-button");
            if (index === 0) {
                dayButton.classList.add("active");
                diaSeleccionado = day; // Seleccionar automáticamente el primer día
            }
            dayButton.textContent = formatDate(day);
            dayButton.textContent = formatDate(day);
            dayButton.dataset.date = day;

            dayButton.addEventListener("click", () => {
                document.querySelectorAll(".day-button").forEach(btn => btn.classList.remove("active"));
                dayButton.classList.add("active");
                diaSeleccionado = day;
                renderShowtimesByCinema(); // Renderiza las sesiones del día seleccionado
            });

            daySelector.appendChild(dayButton);
        });

        // Renderizar sesiones para el primer día por defecto
        if (diaSeleccionado) {
            renderShowtimesByCinema();
        } else {
            console.error("No hay días válidos disponibles para mostrar sesiones.");
        }
    } catch (error) {
        console.error("Error al cargar días y sesiones:", error);
    }
}


// Función para formatear la fecha de manera adecuada
function formatDate(dateString) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        console.error("Fecha inválida:", dateString);
        return "Fecha inválida";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.error("Fecha inválida después de crear el objeto Date:", dateString);
        return "Fecha inválida";
    }

    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString("es-ES", options);
}




// Carga los detalles de la película al abrir la página
if (movieId) {
    loadMovieDetails(movieId);
} else {
    console.error("No se encontró un ID de película en la URL.");
}

// Obtener los parámetros de la URL
// Obtener los parámetros de la URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        cineId: params.get('cineId'),
        movieId: params.get('movieId'),
        sessionId: params.get('sessionId')
    };
}

async function renderShowtimesByCinema() {
    try {
        const response = await fetch(`http://localhost:5006/api/Cine/GetCineConPeliculas?cineId=${cineSeleccionado}`);
        if (!response.ok) throw new Error('Error al cargar las películas del cine');

        const cine = await response.json();
        showtimesContainer.innerHTML = "";

        const peliculaSeleccionada = cine.peliculas.find(pelicula => pelicula.id === parseInt(movieId));
        if (!peliculaSeleccionada) {
            showtimesContainer.innerHTML = "<p>No se encontró la película seleccionada.</p>";
            return;
        }

        const sesionesPorDia = peliculaSeleccionada.sesiones["Gran Casa"]?.[diaSeleccionado];
        if (!Array.isArray(sesionesPorDia) || sesionesPorDia.length === 0) {
            showtimesContainer.innerHTML = "<p>No hay sesiones disponibles para este día.</p>";
            return;
        }

        sesionesPorDia.forEach(sesion => {
            const sessionDiv = document.createElement("div");
            sessionDiv.classList.add("session");

            const timeDiv = document.createElement("div");
            timeDiv.classList.add("session__time");
            timeDiv.textContent = sesion.hora;
            sessionDiv.appendChild(timeDiv);

            const roomDiv = document.createElement("div");
            roomDiv.classList.add("session__room");
            roomDiv.textContent = `Sala ${sesion.sala} ${sesion.esISense ? "iSense" : ""}`;
            sessionDiv.appendChild(roomDiv);

            if (sesion.esVOSE) {
                const voseDiv = document.createElement("div");
                voseDiv.classList.add("session__tag", "session__tag--vose");
                voseDiv.textContent = "VOSE";
                sessionDiv.appendChild(voseDiv);
            }

            if (sesion.esISense) {
                const isenseDiv = document.createElement("div");
                isenseDiv.classList.add("session__tag", "session__tag--isense");
                isenseDiv.textContent = "iSense";
                sessionDiv.appendChild(isenseDiv);
            }

            // Agrega evento para redirigir a la URL con los parámetros corregidos
            sessionDiv.addEventListener("click", () => {
                const queryParams = new URLSearchParams({
                    cineName: cine.nombre, // Asegúrate de que este valor coincida exactamente con el backend
                    movieTitle: peliculaSeleccionada.titulo, // Cambiado de "movieName" a "movieTitle"
                    date: diaSeleccionado,
                    time: sesion.hora,
                    room: sesion.sala
                });

                window.location.href = `/cine_web_app/front-end/views/butacas.html?${queryParams.toString()}`;
            });


            showtimesContainer.appendChild(sessionDiv);
        });

    } catch (error) {
        console.error("Error al cargar las sesiones del cine:", error);
        showtimesContainer.innerHTML = "<p>Error al cargar las sesiones. Intenta de nuevo más tarde.</p>";
    }
}