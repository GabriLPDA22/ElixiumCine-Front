function renderShowtimes(sessions, date) {
    const showtimesContainer = document.getElementById("showtimes-container");
    showtimesContainer.innerHTML = ""; // Limpiar sesiones anteriores

    if (sessions[date]) {
        sessions[date].forEach(session => {
            const sessionDiv = document.createElement("div");
            sessionDiv.classList.add("session");

            // Contenedor de la hora
            const timeDiv = document.createElement("div");
            timeDiv.classList.add("session__time");
            timeDiv.textContent = session.hora;

            // Contenedor de la sala
            const roomDiv = document.createElement("div");
            roomDiv.classList.add("session__room");
            roomDiv.textContent = `Sala ${session.sala} ${session.esISense ? "iSense" : ""}`;

            // Etiqueta "VOSE"
            if (session.esVOSE) {
                const voseDiv = document.createElement("div");
                voseDiv.classList.add("session__tag", "session__tag--vose");
                voseDiv.textContent = "VOSE";
                sessionDiv.appendChild(voseDiv);
            }

            // Etiqueta "iSense"
            if (session.esISense) {
                const isenseTag = document.createElement("div");
                isenseTag.classList.add("session__tag", "session__tag--isense");
                isenseTag.textContent = "iSense";
                sessionDiv.appendChild(isenseTag);
            }

            // Agregar hora y sala al contenedor principal de la sesión
            sessionDiv.appendChild(timeDiv);
            sessionDiv.appendChild(roomDiv);

            // Agregar la sesión al contenedor de showtimes
            showtimesContainer.appendChild(sessionDiv);
        });
    } else {
        showtimesContainer.innerHTML = "<p>No hay sesiones para esta fecha.</p>";
    }
}
