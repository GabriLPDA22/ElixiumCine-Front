//// Variable para almacenar el cine seleccionado y el día seleccionado
//let cineSeleccionado = null;
//let diaSeleccionado = "2024-11-11"; // Día predeterminado (11 de noviembre)
//
//// Función para abrir el modal
//function openCinemaModal() {
//    const modal = document.getElementById("cinema-modal");
//    modal.classList.remove("hidden");
//    document.body.style.overflow = "hidden"; // Deshabilita el scroll en el body
//    loadCinemas(); // Carga la lista de cines
//}
//
//// Función para cerrar el modal
//function closeCinemaModal() {
//    const modal = document.getElementById("cinema-modal");
//    modal.classList.add("hidden");
//    document.body.style.overflow = "auto"; // Habilita el scroll en el body
//}
//
//// Función para cargar los cines desde el backend
//async function loadCinemas() {
//    try {
//        const response = await fetch('http://localhost:5006/api/Cine/GetCines');
//        if (!response.ok) {
//            throw new Error('Error al cargar los cines');
//        }
//        const cinemas = await response.json();
//        const cinemaList = document.getElementById("cinema-list");
//        cinemaList.innerHTML = ""; // Limpia la lista antes de agregar los cines
//
//        cinemas.forEach(cine => {
//            const li = document.createElement("li");
//            li.textContent = cine.nombre;
//            li.dataset.cineId = cine.id;
//
//            // Al hacer clic en un cine, se selecciona y se cierra el modal
//            li.addEventListener("click", () => {
//                selectCinema(cine.nombre, cine.id); // Pasa el nombre y el ID del cine seleccionado
//                closeCinemaModal(); // Cierra el modal
//            });
//
//            cinemaList.appendChild(li);
//        });
//    } catch (error) {
//        console.error("Error al cargar los cines:", error);
//    }
//}
//
//// Función para seleccionar un cine y actualizar la UI
//function selectCinema(cinemaName, cinemaId) {
//    cineSeleccionado = cinemaId; // Guardar el cine seleccionado
//    const locationElement = document.querySelector(".location span");
//    locationElement.textContent = cinemaName; // Muestra el cine seleccionado en la UI
//
//    // Cargar las películas del cine seleccionado
//    loadMoviesByCinema(cinemaId);
//
//    // Mostrar los días y sesiones solo si se ha seleccionado un cine
//    if (cineSeleccionado) {
//        // Verifica si hay películas y sesiones disponibles para mostrar
//        document.getElementById("showtimes-container").style.display = "flex";  // Mostrar el contenedor de sesiones
//        document.getElementById("day-selector").style.display = "flex"; // Mostrar el selector de días
//    } else {
//        document.getElementById("showtimes-container").style.display = "none"; // Ocultar el contenedor de sesiones
//        document.getElementById("day-selector").style.display = "none"; // Ocultar el selector de días
//    }
//}
//
//// Función para cargar las películas y las sesiones de un cine específico
//async function loadMoviesByCinema(cineId) {
//    try {
//        const response = await fetch(`http://localhost:5006/api/Cine/GetCineConPeliculas?cineId=${cineId}`);
//        
//        if (!response.ok) {
//            throw new Error('Error al cargar las películas del cine');
//        }
//
//        const cine = await response.json();
//        const showtimesContainer = document.getElementById("showtimes-container");
//
//        if (!showtimesContainer) {
//            throw new Error("El contenedor de sesiones no se encuentra en el HTML");
//        }
//
//        showtimesContainer.innerHTML = ""; // Limpia el contenedor de sesiones
//
//        // Verifica si hay películas en el cine
//        if (!cine.peliculas || cine.peliculas.length === 0) {
//            showtimesContainer.innerHTML = "<p>No hay películas disponibles para este cine.</p>";
//            return;
//        }
//
//        let haySesiones = false; // Variable para verificar si hay sesiones para el día seleccionado
//
//        // Itera sobre las películas del cine y muestra solo las sesiones del día seleccionado
//        cine.peliculas.forEach(pelicula => {
//            // Verifica si hay sesiones disponibles
//            if (pelicula.sesiones && Object.keys(pelicula.sesiones).length > 0) {
//                // Iterar sobre las fechas de las sesiones
//                Object.keys(pelicula.sesiones).forEach(fecha => {
//                    if (fecha === diaSeleccionado) {
//                        haySesiones = true; // Marca que hay sesiones disponibles
//                        // Crear una lista de sesiones para esa fecha
//                        pelicula.sesiones[fecha].forEach(sesion => {
//                            const sessionElement = document.createElement("div");
//                            sessionElement.classList.add("session");
//
//                            // Hora de la sesión
//                            const sessionTime = document.createElement("div");
//                            sessionTime.classList.add("session__time");
//                            sessionTime.textContent = sesion.hora;
//                            sessionElement.appendChild(sessionTime);
//
//                            // Sala de la sesión
//                            const sessionRoom = document.createElement("div");
//                            sessionRoom.classList.add("session__room");
//                            sessionRoom.textContent = `Sala: ${sesion.sala}`;
//                            sessionElement.appendChild(sessionRoom);
//
//                            // Tags de la sesión (ISense y VOSE)
//                            const sessionTags = document.createElement("div");
//                            sessionTags.classList.add("session__tags");
//
//                            if (sesion.esISense) {
//                                const isenseTag = document.createElement("div");
//                                isenseTag.classList.add("session__tag", "session__tag--isense");
//                                isenseTag.textContent = "ISense";
//                                sessionTags.appendChild(isenseTag);
//                            }
//
//                            if (sesion.esVOSE) {
//                                const voseTag = document.createElement("div");
//                                voseTag.classList.add("session__tag", "session__tag--vose");
//                                voseTag.textContent = "VOSE";
//                                sessionTags.appendChild(voseTag);
//                            }
//
//                            sessionElement.appendChild(sessionTags);
//                            showtimesContainer.appendChild(sessionElement);
//                        });
//                    }
//                });
//            }
//        });
//
//        // Si no hay sesiones para el día seleccionado, ocultar el contenedor
//        if (!haySesiones) {
//            showtimesContainer.innerHTML = "<p>No hay sesiones disponibles para este día.</p>";
//        }
//
//    } catch (error) {
//        console.error("Error al cargar las sesiones del cine:", error);
//        const showtimesContainer = document.getElementById("showtimes-container");
//        if (showtimesContainer) {
//            showtimesContainer.innerHTML = "<p>Hubo un error al cargar las sesiones. Intenta de nuevo más tarde.</p>";
//        }
//    }
//}
//
//// Función para manejar la selección de días
//function selectDay(dia) {
//    diaSeleccionado = dia; // Cambia el día seleccionado
//    const showtimesContainer = document.getElementById("showtimes-container");
//
//    // Limpia el contenedor de sesiones antes de recargar
//    showtimesContainer.innerHTML = "";
//
//    // Vuelve a cargar las sesiones para el cine seleccionado con el nuevo día
//    if (cineSeleccionado) {
//        loadMoviesByCinema(cineSeleccionado);
//    }
//}
//
//// Agregar los eventos a los botones de los días
//document.querySelectorAll(".day-button").forEach(button => {
//    button.addEventListener("click", () => {
//        document.querySelectorAll(".day-button").forEach(b => b.classList.remove("active"));
//        button.classList.add("active");
//        selectDay(button.textContent.trim());
//    });
//});
//