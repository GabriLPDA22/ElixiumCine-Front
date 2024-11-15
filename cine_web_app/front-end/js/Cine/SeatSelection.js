// Obtener los parámetros de la URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const movieTitle = params.get('movieTitle');
    const cinemaName = params.get('cineName');
    const date = params.get('date');
    const time = params.get('time');
    const room = params.get('room');
    
    console.log('Parámetros extraídos:', { movieTitle, cinemaName, date, time, room });

    if (!movieTitle || !cinemaName || !date || !time || !room) {
        console.error("Algunos parámetros están vacíos o son nulos:", { movieTitle, cinemaName, date, time, room });
    }

    return { movieTitle, cinemaName, date, time, room };
}

// Función para obtener y cargar la información de la selección de asientos desde el backend
async function loadSeatSelectionInfo() {
    const { movieTitle, cinemaName, date, time, room } = getQueryParams();

    if (!movieTitle || !cinemaName || !date || !time || !room) {
        console.error("Faltan parámetros en la URL");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5006/api/Cine/GetSeatSelectionInfo?cineName=${encodeURIComponent(cinemaName)}&movieTitle=${encodeURIComponent(movieTitle)}&sessionDate=${encodeURIComponent(date)}&sessionTime=${encodeURIComponent(time)}`);
        
        if (!response.ok) throw new Error("Error al obtener la información de la sesión");

        const data = await response.json();
        console.log("Datos de la API:", data);

        // Actualiza el contenido HTML utilizando los datos de la API
        document.querySelector('.movie-title__text').textContent = data.movieTitle || "SIN TÍTULO";
        document.querySelector('.session-details').innerHTML = `
            <p>Cine: ${data.cineName || "Sin nombre de cine"}</p>
            <p>Sesión: ${data.sessionDate || "Fecha no disponible"}, ${data.sessionTime || "Hora no disponible"}</p>
            <p>Sala: ${data.room || "Sala no disponible"}</p>
        `;

        // Configurar la imagen del banner
        const bannerImageElement = document.querySelector('.movie-details__background-image');
        if (bannerImageElement) {
            bannerImageElement.src = data.bannerImage || '';
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

// Llamar a la función cuando la página cargue
window.onload = loadSeatSelectionInfo;