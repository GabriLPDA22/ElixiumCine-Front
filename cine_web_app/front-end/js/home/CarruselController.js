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
        console.log('Datos de películas:', movies);

        const carouselTrack = document.getElementById('carousel-track');
        carouselTrack.innerHTML = ''; // Limpia el carrusel antes de añadir las películas

        movies.forEach((movie, index) => {
            // Crea un elemento de lista para cada película
            const listItem = document.createElement('li');
            listItem.classList.add('carousel__slide');

            // Si quieres hacer que el elemento central tenga una clase especial
            if (index === 2) { // Elige el elemento central
                listItem.classList.add('carousel__slide--center');
            } else {
                listItem.classList.add('carousel__slide--side');
            }

            // Imagen de la película
            const img = document.createElement('img');
            img.src = movie.cartel; // Usa movie.cartel directamente
            img.alt = movie.titulo;
            img.classList.add('carousel__image');
            console.log('Ruta de la imagen:', img.src);

            // Evento de clic para redirigir a la página de detalles de la película
            img.addEventListener("click", () => {
                // Redirecciona a la página de detalle de la película con el ID de la película en la URL
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

        initializeCarousel(); // Inicializa el carrusel una vez que las películas estén cargadas
    } catch (error) {
        console.error("Error loading movies:", error);
    }
}

// Función para detectar si estamos en modo móvil
function isMobile() {
    return window.innerWidth <= 768; // Ajuste para dispositivos móviles
}

function initializeCarousel() {
    const slides = Array.from(document.querySelectorAll('.carousel__slide'));
    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');
    let currentIndex = isMobile() ? 0 : 2; // Ajuste de la imagen central inicial dependiendo del dispositivo

    function updateSlideClasses() {
        slides.forEach((slide, index) => {
            slide.classList.remove('carousel__slide--center', 'carousel__slide--side');

            // Aplicar la clase "center" solo al slide en currentIndex
            if (index === currentIndex) {
                slide.classList.add('carousel__slide--center');
            } else {
                slide.classList.add('carousel__slide--side');
            }
        });

        // Ajusta el desplazamiento en el track para mantener la imagen centrada
        const slideWidth = slides[0].getBoundingClientRect().width;
        const track = document.getElementById('carousel-track');
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    function moveToNextSlide() {
        // Ajusta el índice central hacia la derecha
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlideClasses();
    }

    function moveToPreviousSlide() {
        // Ajusta el índice central hacia la izquierda
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlideClasses();
    }

    nextButton.addEventListener('click', moveToNextSlide);
    prevButton.addEventListener('click', moveToPreviousSlide);

    // Inicializar las clases de las imágenes
    updateSlideClasses();

    // Actualiza el carrusel cuando cambia el tamaño de la pantalla
    window.addEventListener('resize', () => {
        currentIndex = isMobile() ? 0 : 2;
        updateSlideClasses();
    });
}

// Llama a la función para cargar las películas cuando la página se carga
document.addEventListener('DOMContentLoaded', loadMovies);
