// Obtén el ID de la película de la URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Define el elemento `daySelector`
const daySelector = document.getElementById("day-selector");

// Función para cargar los detalles de la película
async function loadMovieDetails(id) {
    try {
        const response = await fetch(`http://localhost:5006/api/Movie/GetPeliculaById?id=${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const movie = await response.json();
        console.log('Datos de la película:', movie);

        // Asigna los datos de la película a los elementos HTML
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

        // Renderiza los botones de días y horarios de sesiones
        renderDayButtons(movie.sesiones);

    } catch (error) {
        console.error("Error loading movie details:", error);
    }
}

// Función para renderizar los botones de días en el selector
function renderDayButtons(sessions) {
    daySelector.innerHTML = "";
    const days = Object.keys(sessions);

    days.forEach((day, index) => {
        const dayButton = document.createElement("button");
        dayButton.classList.add("day-button");
        if (index === 0) dayButton.classList.add("active"); // El primer día es activo por defecto
        dayButton.textContent = formatDate(day);
        dayButton.dataset.date = day;

        dayButton.addEventListener("click", () => {
            document.querySelectorAll(".day-button").forEach(btn => btn.classList.remove("active"));
            dayButton.classList.add("active");
            renderShowtimes(sessions, day); // Renderiza los horarios de la fecha seleccionada
        });

        daySelector.appendChild(dayButton);
    });

    renderShowtimes(sessions, days[0]); // Renderiza los horarios del primer día al cargar
}

// Función para formatear la etiqueta de los días
function formatDate(dateString) {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString("es-ES", options);
}

// Función para renderizar los horarios de sesiones para una fecha específica
function renderShowtimes(sessions, date) {
    const showtimesContainer = document.getElementById("showtimes-container");
    showtimesContainer.innerHTML = "";

    if (sessions[date]) {
        sessions[date].forEach(session => {
            const sessionDiv = document.createElement("div");
            sessionDiv.classList.add("session");

            const timeDiv = document.createElement("div");
            timeDiv.classList.add("session__time");
            timeDiv.textContent = session.hora;

            const roomDiv = document.createElement("div");
            roomDiv.classList.add("session__room");
            roomDiv.textContent = `Sala ${session.sala} ${session.esISense ? "iSense" : ""}`;

            sessionDiv.appendChild(timeDiv);
            sessionDiv.appendChild(roomDiv);

            if (session.esVOSE) {
                const voseDiv = document.createElement("div");
                voseDiv.classList.add("session__tag", "session__tag--vose");
                voseDiv.textContent = "VOSE";
                sessionDiv.appendChild(voseDiv);
            }

            if (session.esISense) {
                const isenseTag = document.createElement("div");
                isenseTag.classList.add("session__tag", "session__tag--isense");
                isenseTag.textContent = "iSense";
                sessionDiv.appendChild(isenseTag);
            }

            showtimesContainer.appendChild(sessionDiv);
        });
    } else {
        showtimesContainer.innerHTML = "<p>No hay sesiones para esta fecha.</p>";
    }
}

// Llama a la función con el ID obtenido
if (movieId) {
    loadMovieDetails(movieId);
} else {
    console.error("No se encontró un ID de película en la URL.");
}
