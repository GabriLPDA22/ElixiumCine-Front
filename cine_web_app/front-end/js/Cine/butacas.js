
// ==========================================================
// Variables globales
// ==========================================================

const seatMapContainer = document.getElementById('seat-map');
const selectedSeatsDisplay = document.getElementById('selected-seats');
const continueBtn = document.getElementById('continue-btn');
let selectedSeats = []; // Array que almacena los IDs de los asientos seleccionados

const API_BASE_URL = 'http://localhost:5006/api/Butacas'; // URL de la API


    // Definición de la forma de los asientos (1 = asiento, 0 = vacío)
    const seatLayout = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
    ];

    const vipSeats = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    

// ==========================================================
// Inicialización de las butacas en el backend
// ==========================================================

/**
 * Inicializa las butacas en el backend enviando su estado inicial.
 */
async function inicializarButacas() {
    const butacasIniciales = seatLayout.flatMap((row, rowIndex) =>
        row.map((seat, colIndex) => {
            if (seat === 1) {
                const isVip = vipSeats[rowIndex][colIndex] === 1; // Determina si es VIP
                return {
                    id: `${rowIndex}-${colIndex}`, // ID único para el asiento
                    descripcion: `${rowIndex}-${colIndex}`, // Coordenadas como descripción
                    estaOcupado: false, // Inicia como desocupado
                    categoria: isVip ? "VIP" : "Estandar", // Define si es VIP o estándar
                    suplemento: isVip ? 5 : 0 // Aplica suplemento solo para VIP
                };
            }
            return null;
        }).filter(Boolean) // Filtra valores nulos
    );

    try {
        const response = await fetch(`${API_BASE_URL}/InicializarButacas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(butacasIniciales), // Envía las butacas al backend
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        console.log("Butacas inicializadas correctamente.");
    } catch (error) {
        console.error("Error al inicializar las butacas:", error);
        alert("No se pudieron inicializar las butacas. Intenta recargar la página.");
    }
}

// ==========================================================
// Cargar las butacas desde el backend y renderizarlas
// ==========================================================

/**
 * Carga las butacas desde el backend y las renderiza en el mapa.
 */
async function cargarButacas() {
    try {
        const response = await fetch(`${API_BASE_URL}/GetButacas`);
        if (!response.ok) throw new Error("Error al cargar las butacas");

        const butacas = await response.json(); // Obtiene el estado de las butacas
        renderSeatMap(butacas); // Renderiza el mapa de asientos
        restoreSelectedSeatsFromURL(); // Restaura los asientos seleccionados desde la URL
    } catch (error) {
        console.error("Error al cargar las butacas:", error.message);
        alert("No se pudo cargar el estado de las butacas.");
        throw error;
    }
}

/**
 * Renderiza el mapa de asientos en el contenedor `seatMapContainer`.
 */
function renderSeatMap(butacas) {
    seatMapContainer.innerHTML = ""; // Limpia el contenedor antes de renderizar

    seatLayout.forEach((row, rowIndex) => {
        row.forEach((seat, colIndex) => {
            const seatElement = document.createElement('div');
            seatElement.classList.add('seat');

            if (seat === 1) {
                const coord = `${rowIndex}-${colIndex}`; // Coordenadas del asiento
                const butaca = butacas.find(b => b.descripcion === coord);
                const isVip = vipSeats[rowIndex][colIndex] === 1; // Detecta si es VIP

                if (butaca) {
                    if (butaca.estaOcupado) {
                        seatElement.classList.add('reserved'); // Marca como ocupada
                    } else {
                        seatElement.classList.add('available');
                        seatElement.dataset.seatId = coord; // Define el ID del asiento
                        seatElement.dataset.categoria = isVip ? "VIP" : "Estandar"; // Define la categoría

                        if (isVip) {
                            seatElement.classList.add('vip-seat'); // Aplica estilo VIP
                        }

                        seatElement.addEventListener('click', () => toggleSeatSelection(seatElement));
                    }
                }
            } else {
                seatElement.classList.add('empty'); // Marca el espacio como vacío
            }

            seatMapContainer.appendChild(seatElement); // Añade el asiento al contenedor
        });
    });
}

// ==========================================================
// Gestión de la selección de asientos
// ==========================================================

/**
 * Alterna la selección de un asiento.
 */
function toggleSeatSelection(seat) {
    if (seat.classList.contains('available')) {
        seat.classList.toggle('selected');
        const seatId = seat.dataset.seatId;
        const isVip = seat.dataset.categoria === "VIP";
        const price = isVip ? 8.10 : 6.90; // Define el precio según la categoría

        if (seat.classList.contains('selected')) {
            selectedSeats.push({ id: seatId, price }); // Agrega el asiento con su precio
        } else {
            selectedSeats = selectedSeats.filter(seat => seat.id !== seatId); // Elimina del array
        }

        updateSelectedSeatsDisplay(); // Actualiza el texto en pantalla
        updateURLWithSelectedSeats(); // Actualiza la URL con los asientos seleccionados
    }
}


/**
 * Actualiza la URL con los asientos seleccionados.
 */
function updateURLWithSelectedSeats() {
    const params = new URLSearchParams(window.location.search);
    params.set('seats', selectedSeats.map(seat => seat.id).join(',')); // Solo guarda las IDs en la URL
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
}


/**
 * Restaura los asientos seleccionados desde la URL.
 */
function restoreSelectedSeatsFromURL() {
    const params = new URLSearchParams(window.location.search);
    const savedSeats = params.get('seats'); // Obtener el parámetro "seats" de la URL

    if (savedSeats) {
        const seatIds = savedSeats.split(',');
        seatIds.forEach(seatId => {
            const seatElement = document.querySelector(`[data-seat-id="${seatId}"]`);
            if (seatElement && seatElement.classList.contains('available')) {
                const isVip = seatElement.dataset.categoria === "VIP";
                const price = isVip ? 8.10 : 6.90; // Define el precio según la categoría

                seatElement.classList.add('selected'); // Marca como seleccionado
                selectedSeats.push({ id: seatId, price }); // Añade al array actual de seleccionados
            }
        });

        updateSelectedSeatsDisplay(); // Actualiza el texto en pantalla
    }
}


// ==========================================================
// Visualización de los asientos seleccionados
// ==========================================================

/**
 * Actualiza el texto que muestra los asientos seleccionados.
 */
function updateSelectedSeatsDisplay() {
    const totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0); // Calcula el precio total

    selectedSeatsDisplay.textContent = selectedSeats.length
        ? `Butacas seleccionadas: ${selectedSeats.map(seat => seat.id).join(', ')} | Precio total: €${totalPrice.toFixed(2)}`
        : 'No se ha seleccionado ninguna butaca';
}


// ==========================================================
// Evento del botón "Continuar"
// ==========================================================

/**
 * Maneja el evento del botón "Continuar".
 */
continueBtn.addEventListener('click', () => {
    if (selectedSeats.length) {
        const params = new URLSearchParams(window.location.search);

        // Añadir los IDs de los asientos seleccionados
        params.set('seats', selectedSeats.map(seat => seat.id).join(','));

        // Calcular el precio total de las butacas seleccionadas
        const totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);
        params.set('totalPrice', totalPrice.toFixed(2)); // Guardar el precio total con 2 decimales

        // Redirigir al login con los parámetros actualizados
        window.location.href = `/cine_web_app/front-end/views/security/login-guest.html?${params.toString()}`;
    } else {
        alert('Selecciona al menos un asiento');
    }
});


// ==========================================================
// Inicialización de la página
// ==========================================================

/**
 * Inicializa la página al cargar.
 */
document.addEventListener('DOMContentLoaded', async function () {
    try {
        await inicializarButacas(); // Inicializa las butacas en el backend
        await cargarButacas(); // Carga y renderiza las butacas
    } catch (error) {
        console.error("Error durante la inicialización o carga:", error.message);
    }
});
