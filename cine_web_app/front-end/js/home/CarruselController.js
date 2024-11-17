async function loadMovies() {
    try {
        const response = await fetch('http://localhost:5006/api/Movie/GetPeliculas', {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const movies = await response.json();

        const carouselTrack = document.getElementById('carousel-track');
        carouselTrack.innerHTML = ''; // Limpia el carrusel antes de añadir las películas

        const movieIds = new Set(); // Conjunto para almacenar IDs únicos de películas

        movies.forEach((movie, index) => {
            if (movieIds.has(movie.id)) return; // Evitar duplicados
            movieIds.add(movie.id);

            // Crea un elemento de lista para cada película
            const listItem = document.createElement('li');
            listItem.classList.add('carousel__slide');

            // Imagen de la película
            const img = document.createElement('img');
            img.src = movie.cartel; // Usa movie.cartel directamente
            img.alt = movie.titulo;
            img.classList.add('carousel__image');

            // Redirección al hacer clic
            img.addEventListener('click', () => {
                window.location.href = `movies.html?id=${movie.id}`;
            });

            // Título de la película
            const title = document.createElement('p');
            title.classList.add('carousel__title');
            title.textContent = movie.titulo;

            listItem.appendChild(img);
            listItem.appendChild(title);
            carouselTrack.appendChild(listItem);
        });

        initializeCarousel(); // Inicializa el carrusel
    } catch (error) {
        console.error("Error loading movies:", error);
    }
}

function isMobile() {
    return window.innerWidth <= 768; // Ajuste para dispositivos móviles
}

function initializeCarousel() {
    const slides = Array.from(document.querySelectorAll('.carousel__slide'));
    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');
    const track = document.getElementById('carousel-track');
    let currentIndex = isMobile() ? 0 : Math.floor(slides.length / 2); // Centraliza la imagen inicial

    function updateSlideClasses() {
        slides.forEach((slide, index) => {
            slide.classList.remove('carousel__slide--center', 'carousel__slide--side');
            if (index === currentIndex) {
                slide.classList.add('carousel__slide--center');
            } else {
                slide.classList.add('carousel__slide--side');
            }
        });

        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transition = 'transform 0.5s ease'; // Transición fluida
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlideClasses();
    }

    function moveToPreviousSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlideClasses();
    }

    nextButton.addEventListener('click', moveToNextSlide);
    prevButton.addEventListener('click', moveToPreviousSlide);

    window.addEventListener('resize', () => {
        currentIndex = isMobile() ? 0 : Math.floor(slides.length / 2);
        updateSlideClasses();
    });

    updateSlideClasses(); // Configura el carrusel inicialmente
}

// Llama a la función para cargar las películas
document.addEventListener('DOMContentLoaded', loadMovies);
