// Obtener los parámetros de la URL en la página de selección de asientos
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        movieId: params.get('movieId'),
        cinemaId: params.get('cineId'),
        date: params.get('date'),
        time: params.get('time'),
        room: params.get('room')
    };
}

// Función para obtener y cargar la información de la selección de asientos desde el backend
async function loadSeatSelectionInfo() {
    const { movieId, cinemaId, date, time, room } = getQueryParams();

    // Verificar si los parámetros existen
    if (!movieId || !cinemaId || !date || !time || !room) {
        console.error("Faltan parámetros en la URL");
        return;
    }

    try {
        // Realizar la solicitud al backend para obtener la información de la sesión y el banner
        const response = await fetch(`http://localhost:5006/api/Cine/GetSeatSelectionInfo?cineId=${cinemaId}&movieId=${movieId}&sessionDate=${date}&sessionTime=${time}`);
        
        if (!response.ok) throw new Error("Error al obtener la información de la sesión");

        const data = await response.json();

        // Mostrar la información en el HTML
        document.querySelector('.movie__title').textContent = data.MovieTitle;
        document.querySelector('.movie__session-info').innerHTML = `
            <p>Cine: ${data.CineName}</p>
            <p>Sesión: ${data.SessionDate}, ${data.SessionTime}</p>
            <p>Sala: ${data.Room}</p>
        `;

        // Configurar el banner de fondo
        const bannerElement = document.querySelector('.seat-selection__details');
        bannerElement.style.backgroundImage = `url(${data.BannerImage})`; // Aquí utilizamos "BannerImage" que es lo que llega desde el backend

    } catch (error) {
        console.error("Error:", error);
    }
}

// Llamar a la función cuando la página cargue
window.onload = loadSeatSelectionInfo;