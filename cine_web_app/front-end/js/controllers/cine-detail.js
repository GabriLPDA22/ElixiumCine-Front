document.addEventListener("DOMContentLoaded", () => {
    const daySelector = document.getElementById("day-selector");

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

            renderMovieDetails(peliculasUnicas[0]); // Mostrar la primera película inicialmente
            setupCarousel(peliculasUnicas);
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
        background.style.opacity = "1";

        // Filtrar sesiones de cine
        const granCasaSessions = movie.sesiones["Gran Casa"];
        if (granCasaSessions) {
            renderDayButtons(granCasaSessions);
        } else {
            daySelector.innerHTML = "<p>No hay sesiones disponibles para este cine.</p>";
        }
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

                // Hora de la sesión
                const timeDiv = document.createElement("div");
                timeDiv.classList.add("session__time");
                timeDiv.textContent = session.hora;

                // Sala de la sesión
                const roomDiv = document.createElement("div");
                roomDiv.classList.add("session__room");
                roomDiv.textContent = `Sala ${session.sala} ${session.esISense ? "iSense" : ""}`;

                // Ensamblar la tarjeta de sesión
                sessionDiv.appendChild(timeDiv);
                sessionDiv.appendChild(roomDiv);

                // Etiqueta VOSE (si aplica)
                if (session.esVOSE) {
                    const voseDiv = document.createElement("div");
                    voseDiv.classList.add("session__tag", "session__tag--vose");
                    voseDiv.textContent = "VOSE";
                    sessionDiv.appendChild(voseDiv);
                }

                // Etiqueta iSense (si aplica)
                if (session.esISense) {
                    const isenseTag = document.createElement("div");
                    isenseTag.classList.add("session__tag", "session__tag--isense");
                    isenseTag.textContent = "iSense";
                    sessionDiv.appendChild(isenseTag);
                }

                // Agregar evento para redirigir con los parámetros correctos
                sessionDiv.addEventListener("click", () => {
                    const queryParams = new URLSearchParams({
                        cineName: "Gran Casa", // Sustituir con el nombre dinámicamente
                        movieTitle: "Spider-Man: No Way Home", // Sustituir con el título dinámicamente
                        date: date,
                        time: session.hora,
                        room: session.sala,
                    });
                    console.log(queryParams);

                    window.location.href = `/cine_web_app/front-end/views/butacas.html?${queryParams.toString()}`;
                });

                // Añadir la tarjeta de sesión al contenedor
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
        peliculas.forEach((movie, index) => {
            const slide = `
                <li class="carousel__slide" data-index="${index}" data-title="${movie.titulo}" data-id="${movie.id}">
                    <a href="/cine_web_app/front-end/views/movies.html?id=${movie.id}" class="carousel__link">
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
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 3 },
                1200: { items: 7 },
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
            const currentIndex = event.item.index - event.relatedTarget._clones.length / 2;
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
