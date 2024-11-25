document.addEventListener("DOMContentLoaded", () => {
    async function fetchMovies() {
        try {
            const response = await fetch("http://localhost:5006/api/Movie/GetPeliculas");
            if (!response.ok) throw new Error("Error al obtener detalles de las películas");
            const peliculas = await response.json();

            // Filtrar las películas duplicadas por su título
            const peliculasUnicas = peliculas.filter(
                (movie, index, self) =>
                    index === self.findIndex((m) => m.titulo === movie.titulo)
            );

            setupCarousel(peliculasUnicas);
            renderMovieDetails(peliculasUnicas[0]); // Mostrar la primera película inicialmente
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function renderMovieDetails(movie) {
        // Actualiza el título, metadata y descripción
        document.querySelector("#movie-title").textContent = movie.titulo;
        document.querySelector("#movie-metadata").innerHTML = `
            <span>IMDB ${movie.calificacion}</span> | 
            <span>${movie.fechaEstreno.slice(0, 10)}</span> | 
            <span>${movie.duracion}</span> | 
            <span>${movie.genero}</span>
        `;
        document.querySelector("#movie-description").textContent = movie.descripcion;

        // Actualiza el fondo del banner dinámicamente
        const background = document.querySelector("#background-image");
        background.style.backgroundImage = `url(${movie.imagen})`;
        background.style.transition = "background-image 0.5s ease-in-out"; // Transición suave
    }

    function setupDayButtons(sessions) {
        const daySelector = document.getElementById("day-selector");
        daySelector.innerHTML = "";
        const days = Object.keys(sessions);

        days.forEach((day, index) => {
            const dayButton = document.createElement("button");
            dayButton.classList.add("day-button");
            if (index === 0) dayButton.classList.add("active");
            dayButton.textContent = formatDate(day);
            dayButton.dataset.date = day;

            dayButton.addEventListener("click", () => {
                document.querySelectorAll(".day-button").forEach((btn) => btn.classList.remove("active"));
                dayButton.classList.add("active");
                renderShowtimes(sessions, day);
            });

            daySelector.appendChild(dayButton);
        });

        renderShowtimes(sessions, days[0]);
    }

    function formatDate(dateString) {
        const options = { weekday: "short", day: "numeric", month: "short" };
        return new Date(dateString).toLocaleDateString("es-ES", options);
    }

    function renderShowtimes(sessions, date) {
        const showtimesContainer = document.getElementById("showtimes-container");
        showtimesContainer.innerHTML = "";

        if (sessions[date]) {
            sessions[date].forEach((session) => {
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
        const track = $("#carousel-track");
        const isMobile = window.innerWidth <= 768; // Detectar si es móvil

        // Crear los slides del carrusel dinámicamente
        track.empty();
        peliculas.forEach((movie, index) => {
            const slide = `
                <li class="carousel__slide ${index === 0 ? "selected" : ""}" data-index="${index}">
                    <a href="movie-details.html?id=${movie.id}" class="carousel__link">
                        <img src="${movie.cartel}" alt="${movie.titulo}" class="carousel__image">
                    </a>
                </li>`;
            track.append(slide);
        });

        // Inicializar Owl Carousel
        track.addClass("owl-carousel").owlCarousel({
            loop: true,
            margin: 10,
            nav: !isMobile, // Mostrar botones de navegación solo en escritorio
            mouseDrag: isMobile, // Habilitar drag solo en móvil
            touchDrag: isMobile, // Habilitar drag táctil solo en móvil
            responsive: {
                0: { items: 1 }, // 1 elemento en pantallas pequeñas
                600: { items: 2 }, // 2 elementos en pantallas medianas
                1000: { items: 3 }, // 3 elementos en pantallas más grandes
                1200: { items: 7 }, // 5 elementos en pantallas grandes
            },
            navText: [
                `<button class="carousel__button carousel__button--left">
                    <span class="carousel__button-content">
                        <img src="/cine_web_app/front-end/images/left-arrow.png" alt="Left Arrow">
                    </span>
                 </button>`,
                `<button class="carousel__button carousel__button--right">
                    <span class="carousel__button-content">
                        <img src="/cine_web_app/front-end/images/right-arrow.png" alt="Right Arrow">
                    </span>
                 </button>`
            ],
        });

        // Actualizar fondo y destacar slide activo
        track.on("changed.owl.carousel", function (event) {
            const currentIndex = event.item.index - event.relatedTarget._clones.length / 2; // Calcula índice real
            const realIndex = (currentIndex + peliculas.length) % peliculas.length; // Evita valores negativos
            const currentMovie = peliculas[realIndex];

            // Actualiza el fondo y los detalles
            renderMovieDetails(currentMovie);

            // Resaltar slide activo
            $(".carousel__slide").removeClass("selected");
            $(`.carousel__slide[data-index="${realIndex}"]`).addClass("selected");
        });

        // Flechas personalizadas para escritorio
        if (!isMobile) {
            $(".carousel__button--left").on("click", function () {
                track.trigger("prev.owl.carousel");
            });
            $(".carousel__button--right").on("click", function () {
                track.trigger("next.owl.carousel");
            });
        }
    }

    fetchMovies();
});
