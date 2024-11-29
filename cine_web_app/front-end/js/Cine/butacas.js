
// ==========================================================
// Variables globales
// ==========================================================

const seatMapContainer = document.getElementById('seat-map');
const selectedSeatsDisplay = document.getElementById('selected-seats');
const continueBtn = document.getElementById('continue-btn');
let selectedSeats = []; // Array que almacena los IDs de los asientos seleccionados

const API_BASE_URL = 'http://localhost:5006/api/Butacas'; // URL de la API


    // Matriz de la disposición de los asientos (1 = asiento ocupado, 0 = asiento vacío)
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

// Matriz de los asientos VIP (1 = asiento ocupado, 0 = asiento vacío)
const vipSeats = [
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

    

// ==========================================================
// Inicialización de las butacas en el backend
// ==========================================================
async function inicializarButacas() {
    const butacasIniciales = seatLayout.flatMap((row, rowIndex) =>
        row.map((seat, colIndex) => {
            if (seat === 1) {
                const isVip = vipSeats[rowIndex][colIndex] === 1; // Determina si es VIP
                return {
                    id: `${rowIndex}-${colIndex}`,
                    descripcion: `${rowIndex}-${colIndex}`,
                    estaOcupado: false,
                    categoria: isVip ? "VIP" : "Estandar",
                    suplemento: isVip ? 5 : 0
                };
            }
            return null;
        }).filter(Boolean)
    );

    try {
        const response = await fetch(`${API_BASE_URL}/InicializarButacas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(butacasIniciales),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }
        cargarButacas();
        console.log("Butacas inicializadas correctamente.");
    } catch (error) {
        console.error("Error al inicializar las butacas:", error);
        alert("No se pudieron inicializar las butacas. Intenta recargar la página.");
    }
}

// ==========================================================
// Cargar las butacas desde el backend y renderizarlas
// ==========================================================

async function cargarButacas() {
    try {
        const response = await fetch(`${API_BASE_URL}/GetButacas`);
        if (!response.ok) throw new Error("Error al cargar las butacas");

        const butacas = await response.json();
        renderSeatMap(butacas);
        restoreSelectedSeatsFromURL();
    } catch (error) {
        console.error("Error al cargar las butacas:", error.message);
        alert("No se pudo cargar el estado de las butacas.");
        throw error;
    }
}

function renderSeatMap(butacas) {
    seatMapContainer.innerHTML = "";

    seatLayout.forEach((row, rowIndex) => {
        row.forEach((seat, colIndex) => {
            const seatElement = document.createElement('div');
            seatElement.classList.add('seat');

            if (seat === 1) {
                const coord = `${rowIndex}-${colIndex}`;
                const butaca = butacas.find(b => b.descripcion === coord);
                const isVip = vipSeats[rowIndex][colIndex] === 1;

                if (butaca) {
                    if (butaca.estaOcupado) {
                        seatElement.classList.add('reserved');
                    } else {
                        seatElement.classList.add('available');
                        seatElement.dataset.seatId = coord;
                        seatElement.dataset.categoria = isVip ? "VIP" : "Estandar";

                        if (isVip) {
                            seatElement.classList.add('seat--vip');
                        }else{
                            seatElement.classList.add('seat--no-vip');
                        }

                        seatElement.addEventListener('click', () => toggleSeatSelection(seatElement));
                    }
                }
            } else {
                seatElement.classList.add('empty');
            }

            seatMapContainer.appendChild(seatElement);
        });
    });
}

// ==========================================================
// Gestión de la selección de asientos
// ==========================================================

function toggleSeatSelection(seat) {
    if (seat.classList.contains('available')) {
        seat.classList.toggle('selected');
        const seatId = seat.dataset.seatId;
        const isVip = seat.dataset.categoria === "VIP";
        const price = isVip ? 8.10 : 6.90;

        if (seat.classList.contains('selected')) {
            selectedSeats.push({ id: seatId, price });
        } else {
            selectedSeats = selectedSeats.filter(seat => seat.id !== seatId);
        }

        updateSelectedSeatsDisplay();
        updateURLWithSelectedSeats();
    }
}

function updateURLWithSelectedSeats() {
    const params = new URLSearchParams(window.location.search);

    params.set('seats', selectedSeats.map(seat => seat.id).join(','));

    const vipCount = selectedSeats.filter(seat => {
        const seatElement = document.querySelector(`[data-seat-id="${seat.id}"]`);
        return seatElement && seatElement.dataset.categoria === "VIP";
    }).length;

    params.set('vipCount', vipCount);

    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
}

function restoreSelectedSeatsFromURL() {
    const params = new URLSearchParams(window.location.search);
    const savedSeats = params.get('seats');

    if (savedSeats) {
        const seatIds = savedSeats.split(',');
        seatIds.forEach(seatId => {
            const seatElement = document.querySelector(`[data-seat-id="${seatId}"]`);
            if (seatElement && seatElement.classList.contains('available')) {
                const isVip = seatElement.dataset.categoria === "VIP";
                const price = isVip ? 8.10 : 6.90;

                seatElement.classList.add('selected');
                selectedSeats.push({ id: seatId, price });
            }
        });

        updateSelectedSeatsDisplay();
    }
}

// ==========================================================
// Visualización de los asientos seleccionados
// ==========================================================

function updateSelectedSeatsDisplay() {
    const totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);

    selectedSeatsDisplay.textContent = selectedSeats.length
        ? `Butacas seleccionadas: ${selectedSeats.map(seat => seat.id).join(', ')} | Precio total: €${totalPrice.toFixed(2)}`
        : 'No se ha seleccionado ninguna butaca';
}

// ==========================================================
// Evento del botón "Continuar"
// ==========================================================

continueBtn.addEventListener('click', () => {
    if (selectedSeats.length) {
        const params = new URLSearchParams(window.location.search);

        params.set('seats', selectedSeats.map(seat => seat.id).join(','));

        const vipCount = selectedSeats.filter(seat => {
            const seatElement = document.querySelector(`[data-seat-id="${seat.id}"]`);
            return seatElement && seatElement.dataset.categoria === "VIP";
        }).length;

        params.set('vipCount', vipCount);

        const totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);
        params.set('totalPrice', totalPrice.toFixed(2));

        window.location.href = `/cine_web_app/front-end/views/security/login-guest.html?${params.toString()}`;
    } else {
        alert('Selecciona al menos un asiento');
    }
});

// ==========================================================
// Inicialización de la página
// ==========================================================
/*
document.addEventListener('DOMContentLoaded', async function () {
    try {
        await inicializarButacas();
        // await cargarButacas();
    } catch (error) {
        console.error("Error durante la inicialización o carga:", error.message);
    }
});
*/

// ==========================================================
//  Movil
// ==========================================================

// Detectar si es móvil
function isMobile() {
    return window.innerWidth <= 480; // Ajusta el ancho máximo según lo necesario
}

// Aplicar escala al mapa en móviles
function adjustMapForMobile() {
    const seatMapContainer = document.getElementById('seat-map');
    if (isMobile()) {
        seatMapContainer.style.transform = 'scale(0.8)'; // Ajusta el tamaño del mapa
        seatMapContainer.style.transformOrigin = 'top center'; // Centrado
        seatMapContainer.style.width = '100%'; // Asegura que no haya desbordamientos
    } else {
        seatMapContainer.style.transform = ''; // Resetea la escala para pantallas grandes
        seatMapContainer.style.width = ''; // Resetea el ancho
    }
}

// Escuchar cambios en el tamaño de la ventana
window.addEventListener('resize', adjustMapForMobile);

// Aplicar ajustes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    adjustMapForMobile();
    // Mantén las funciones de inicialización aquí
    inicializarButacas();
    // cargarButacas();

});
