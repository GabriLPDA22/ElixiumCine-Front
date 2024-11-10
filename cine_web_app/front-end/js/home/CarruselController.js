document.addEventListener('DOMContentLoaded', () => {
    const slides = Array.from(document.querySelectorAll('.carousel__slide'));
    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');
    let currentIndex = 2; // La imagen central inicial

    function updateSlideClasses() {
        slides.forEach((slide, index) => {
            slide.classList.remove('carousel__slide--center');

            // Aplicar la clase "center" solo al slide en currentIndex
            if (index === currentIndex) {
                slide.classList.add('carousel__slide--center');
            }
        });
    }

    function moveToNextSlide() {
        // Rotar el índice de la imagen central hacia la derecha
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlideClasses();
    }

    function moveToPreviousSlide() {
        // Rotar el índice de la imagen central hacia la izquierda
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlideClasses();
    }

    nextButton.addEventListener('click', moveToNextSlide);
    prevButton.addEventListener('click', moveToPreviousSlide);

    // Inicializar las clases de las imágenes
    updateSlideClasses();
});
