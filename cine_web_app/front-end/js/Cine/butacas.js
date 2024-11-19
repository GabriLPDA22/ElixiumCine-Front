


document.addEventListener('DOMContentLoaded', async function () {
    const seatMapContainer = document.getElementById('seat-map');
    const selectedSeatsDisplay = document.getElementById('selected-seats');
    const continueBtn = document.getElementById('continue-btn');
    let selectedSeats = [];

    const API_BASE_URL = 'http://localhost:5006/api/Butacas'; // URL correcta para la API


    // Definición de la forma de los asientos (1 = asiento, 0 = vacío)
    // const seatLayout = [
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
    //     [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
    //     [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    //     [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    //     [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    //     [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    //     [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    //     [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    //     [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    //     [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    //     [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    //     [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    //     [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
    // ];

    // Función para inicializar las butacas en el backend
    async function inicializarButacas() {
        const butacasIniciales = seatLayout.flatMap((row, rowIndex) =>
            row.map((seat, colIndex) => {
                if (seat === 1) {
                    return {
                        id: `${rowIndex}-${colIndex}`, // ID único basado en las coordenadas
                        descripcion: `${rowIndex}-${colIndex}`, // Descripción como coordenadas
                        estaOcupado: false, // Todas las butacas están libres al inicio
                        categoria: "Estandar", // Puedes cambiarlo a "VIP" si aplica
                        suplemento: 0 // Ajustar según la categoría
                    };
                }
                return null;
            }).filter(Boolean) // Filtra los valores nulos
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
                throw new Error("Error al inicializar las butacas.");
            }

            console.log("Butacas inicializadas correctamente en el backend.");
        } catch (error) {
            console.error("Error al inicializar las butacas:", error);
            alert("No se pudieron inicializar las butacas. Intenta recargar la página.");
        }
    }

    // Renderizar el mapa de butacas basado en seatLayout
    function renderSeatMap(butacas) {
        seatLayout.forEach((row, rowIndex) => {
            row.forEach((seat, colIndex) => {
                const seatElement = document.createElement('div');
                seatElement.classList.add('seat');

                if (seat === 1) {
                    const coord = `${rowIndex}-${colIndex}`; // Coordenadas como cadena
                    const butaca = butacas.find(b => b.descripcion === coord);

                    if (butaca && butaca.estaOcupado) {
                        seatElement.classList.add('occupied');
                    } else {
                        seatElement.classList.add('available');
                        seatElement.dataset.seatId = coord; // Guardar coordenadas como string
                        seatElement.addEventListener('click', () => toggleSeatSelection(seatElement));
                    }
                } else {
                    seatElement.classList.add('empty');
                }

                seatMapContainer.appendChild(seatElement);
            });
        });
    }

    // Alternar selección de asientos
    function toggleSeatSelection(seat) {
        if (seat.classList.contains('available')) {
            seat.classList.toggle('selected');
            const seatId = seat.dataset.seatId; // Obtener coordenadas como string

            if (seat.classList.contains('selected')) {
                selectedSeats.push(seatId);
            } else {
                selectedSeats = selectedSeats.filter(id => id !== seatId);
            }

            updateSelectedSeatsDisplay();
        }
    }

    // Actualizar texto de butacas seleccionadas
    function updateSelectedSeatsDisplay() {
        selectedSeatsDisplay.textContent = selectedSeats.length
            ? `Butacas seleccionadas: ${selectedSeats.join(', ')}`
            : 'No se ha seleccionado ninguna butaca';
    }

    // Cargar las butacas desde la API y renderizar el mapa
    async function cargarButacas() {
        try {
            const response = await fetch(`${API_BASE_URL}/GetButacas`);
            if (!response.ok) throw new Error('Error al cargar las butacas');
            const butacas = await response.json();

            renderSeatMap(butacas);
        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo cargar el estado de las butacas.');
        }
    }

    // Reservar las butacas seleccionadas
    async function reservarButacas() {
        if (selectedSeats.length === 0) {
            alert('Selecciona al menos un asiento.');
            return;
        }

        console.log("Enviando datos al backend:", selectedSeats);

        try {
            const response = await fetch(`${API_BASE_URL}/ReservarButacas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedSeats), // Enviar coordenadas como strings
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.mensaje || 'Error al reservar butacas');
            }

            const result = await response.json();
            alert(result.mensaje);
            window.location.reload(); // Recargar la página para reflejar cambios
        } catch (error) {
            console.error('Error al reservar butacas:', error);
            alert(`No se pudo completar la reserva: ${error.message}`);
        }
    }

    // Inicializar las butacas y cargar el estado inicial de las butacas
    await inicializarButacas();
    await cargarButacas();

    // Manejar el evento de continuar
    continueBtn.addEventListener('click', () => {
        reservarButacas();
    });
});
