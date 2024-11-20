


document.addEventListener('DOMContentLoaded', async function () {
    const seatMapContainer = document.getElementById('seat-map');
    const selectedSeatsDisplay = document.getElementById('selected-seats');
    const continueBtn = document.getElementById('continue-btn');
    let selectedSeats = [];



    const API_BASE_URL = 'http://localhost:5006/api/Butacas'; // URL correcta para la API


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
    


    async function inicializarButacas() {
        const butacasIniciales = seatLayout.flatMap((row, rowIndex) =>
            row.map((seat, colIndex) => {
                if (seat === 1) {
                    const isVip = vipSeats[rowIndex][colIndex] === 1; // Determina si es VIP
                    return {
                        id: `${rowIndex}-${colIndex}`, // ID como string
                        descripcion: `${rowIndex}-${colIndex}`, // Coordenadas como descripción
                        estaOcupado: false, // Inicia desocupado
                        categoria: isVip ? "VIP" : "Estandar", // Categoría basada en vipSeats
                        suplemento: isVip ? 5 : 0 // Suplemento según categoría
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
                body: JSON.stringify(butacasIniciales), // Enviar butacas inicializadas
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


    // Función para renderizar el mapa de butacas
    function renderSeatMap(butacas) {
        seatMapContainer.innerHTML = ""; // Limpia el contenedor antes de renderizar

        seatLayout.forEach((row, rowIndex) => {
            row.forEach((seat, colIndex) => {
                const seatElement = document.createElement('div');
                seatElement.classList.add('seat');

                if (seat === 1) {
                    const coord = `${rowIndex}-${colIndex}`; // Coordenadas como cadena
                    const butaca = butacas.find(b => b.descripcion === coord);
                    const isVip = vipSeats[rowIndex][colIndex] === 1; // Detecta si es VIP

                    if (butaca) {
                        if (butaca.estaOcupado) {
                            seatElement.classList.add('reserved'); // Marcada como reservada
                        } else {
                            seatElement.classList.add('available');
                            seatElement.dataset.seatId = coord; // Guardar coordenadas como string
                            seatElement.dataset.categoria = isVip ? "VIP" : "Estandar"; // Añade categoría al dataset

                            // Clase visual para VIP
                            if (isVip) {
                                seatElement.classList.add('vip-seat'); // Clase para VIP
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


    // Alternar selección de butacas
    function toggleSeatSelection(seat) {
        if (seat.classList.contains('available')) {
            seat.classList.toggle('selected');
            const seatId = seat.dataset.seatId;

            if (seat.classList.contains('selected')) {
                selectedSeats.push(seatId);
            } else {
                selectedSeats = selectedSeats.filter(id => id !== seatId);
            }

            updateSelectedSeatsDisplay();
        }
    }

    // Actualizar el texto de las butacas seleccionadas
    function updateSelectedSeatsDisplay() {
        selectedSeatsDisplay.textContent = selectedSeats.length
            ? `Butacas seleccionadas: ${selectedSeats.join(', ')}`
            : 'No se ha seleccionado ninguna butaca';
    }

    // Función para cargar las butacas desde el backend
    async function cargarButacas() {
        try {
            const response = await fetch(`${API_BASE_URL}/GetButacas`);
            if (!response.ok) throw new Error("Error al cargar las butacas");

            const butacas = await response.json();
            renderSeatMap(butacas);
        } catch (error) {
            console.error("Error al cargar las butacas:", error.message);
            alert("No se pudo cargar el estado de las butacas.");
            throw error;
        }
    }

    // Función para reservar las butacas seleccionadas
    function renderSeatMap(butacas) {
        seatMapContainer.innerHTML = ""; // Limpia el contenedor antes de renderizar
    
        seatLayout.forEach((row, rowIndex) => {
            row.forEach((seat, colIndex) => {
                const seatElement = document.createElement('div');
                seatElement.classList.add('seat');
    
                if (seat === 1) {
                    const coord = `${rowIndex}-${colIndex}`; // Coordenadas como cadena
                    const butaca = butacas.find(b => b.descripcion === coord);
                    const isVip = vipSeats[rowIndex][colIndex] === 1; // Detecta si es VIP
    
                    if (butaca) {
                        if (butaca.estaOcupado) {
                            seatElement.classList.add('reserved'); // Marcada como reservada
                        } else {
                            seatElement.classList.add('available');
                            seatElement.dataset.seatId = coord; // Guardar coordenadas como string
                            seatElement.dataset.categoria = isVip ? "VIP" : "Estandar"; // Añade categoría al dataset
    
                            // Clase visual para VIP
                            if (isVip) {
                                seatElement.classList.add('vip-seat'); // Clase para VIP
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
    
    // Inicializar y cargar las butacas
    try {
        await inicializarButacas();
        await cargarButacas();
    } catch (error) {
        console.error("Error durante la inicialización o carga:", error.message);
    }

    // Manejar el evento de continuar
    continueBtn.addEventListener('click', () => {
        if (selectedSeats.length) {
            // Obtener los parámetros de la URL actual
            const params = new URLSearchParams(window.location.search);

            // Agregar la información de las butacas seleccionadas a los parámetros
            params.set('seats', selectedSeats.join(',')); // Agrega las butacas seleccionadas

            // Redirigir al login con los parámetros en la URL
            window.location.href = `/cine_web_app/front-end/views/security/login-guest.html?${params.toString()}`;
        } else {
            alert('Selecciona al menos un asiento');
        }
    });


});
