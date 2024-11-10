document.addEventListener("DOMContentLoaded", () => {
    const daySelector = document.getElementById("day-selector");

    async function fetchMovies() {
        try {
            const response = await fetch("http://localhost:5006/api/Movie/GetPeliculas");
            if (!response.ok) throw new Error("Error al obtener detalles de las películas");
            const peliculas = await response.json();

            renderMovieDetails(peliculas[0]); // Mostrar la primera película inicialmente sin opacidad
            setupCarousel(peliculas);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function renderMovieDetails(movie) {
        document.querySelector(".cine-detail__info-title").textContent = movie.titulo;
        document.querySelector(".cine-detail__info-metadata").innerHTML = `
            <span>IMDB ${movie.calificacion}</span> | <span>${movie.fechaEstreno.slice(0, 10)}</span> | <span>${movie.duracion}</span> | <span>${movie.genero}</span>
        `;
        document.querySelector(".cine-detail__info-description").textContent = movie.descripcion;

        const background = document.querySelector(".cine-detail__background");
        background.style.backgroundImage = `url(${movie.imagen})`;
        background.style.opacity = '1';

        renderDayButtons(movie.sesiones);
    }

    function renderDayButtons(sessions) {
        daySelector.innerHTML = "";
        const days = Object.keys(sessions);

        days.forEach((day, index) => {
            const dayButton = document.createElement("button");
            dayButton.classList.add("day-button");
            if (index === 0) dayButton.classList.add("active");
            dayButton.textContent = formatDate(day);
            dayButton.dataset.date = day;

            dayButton.addEventListener("click", () => {
                document.querySelectorAll(".day-button").forEach(btn => btn.classList.remove("active"));
                dayButton.classList.add("active");
                renderShowtimes(sessions, day);
            });

            daySelector.appendChild(dayButton);
        });

        renderShowtimes(sessions, days[0]);
    }

    function formatDate(dateString) {
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return new Date(dateString).toLocaleDateString("es-ES", options);
    }

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

    function setupCarousel(peliculas) {
        const track = document.getElementById("carousel-track");
        track.innerHTML = "";

        peliculas.forEach((movie, index) => {
            const slide = document.createElement("li");
            slide.classList.add("carousel__slide");
            if (index === 0) slide.classList.add("selected");

            const img = document.createElement("img");
            img.src = movie.cartel;
            img.alt = movie.titulo;
            img.classList.add("carousel__image");

            img.addEventListener("click", () => {
                document.querySelectorAll(".carousel__slide").forEach(slide => slide.classList.remove("selected"));
                slide.classList.add("selected");
                renderMovieDetails(movie);
            });

            slide.appendChild(img);
            track.appendChild(slide);
        });
    }

    fetchMovies();
});
