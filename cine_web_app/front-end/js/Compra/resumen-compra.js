// Función para rellenar los datos en el HTML
function populateSummary() {
    const params = getQueryParams();

    // Rellenar el título de la película y formatear correctamente
    const movieTitleElement = document.querySelector('.purchase-summary__title');
    if (movieTitleElement) {
        movieTitleElement.textContent = (params.movieTitle || 'Título no disponible').replace(/\+/g, ' ');
    }

    // Rellenar la información general
    const cineElement = document.querySelector('.purchase-summary__info-item:nth-child(1)');
    const dateElement = document.querySelector('.purchase-summary__info-item:nth-child(2)');
    const timeElement = document.querySelector('.purchase-summary__info-item:nth-child(3)');
    const roomElement = document.querySelector('.purchase-summary__info-item:nth-child(4)');
    const seatsElement = document.querySelector('.purchase-summary__info-item:nth-child(5)');
    const totalElement = document.querySelector('.purchase-summary__info-item:nth-child(6)');

    if (cineElement) cineElement.innerHTML = `<strong>Cine:</strong> ${params.cineName || 'No disponible'}`;
    if (dateElement) dateElement.innerHTML = `<strong>Fecha:</strong> ${params.date || 'No disponible'}`;
    if (timeElement) timeElement.innerHTML = `<strong>Hora:</strong> ${params.time || 'No disponible'}`;
    if (roomElement) roomElement.innerHTML = `<strong>Sala:</strong> ${params.room || 'No disponible'}`;
    if (seatsElement) seatsElement.innerHTML = `<strong>Entradas:</strong> ${params.seats || 'No disponible'}`;
    if (totalElement) totalElement.innerHTML = `<strong>Precio Total:</strong> ${params.cartTotal || '0,00 €'}`;

    // Datos personales
    const nameElement = document.querySelector('.purchase-summary__info-item--personal:nth-child(1)');
    const emailElement = document.querySelector('.purchase-summary__info-item--personal:nth-child(2)');
    const phoneElement = document.querySelector('.purchase-summary__info-item--personal:nth-child(3)');

    if (nameElement) nameElement.textContent = `${params.name || 'No disponible'} ${params.surname || ''}`;
    if (emailElement) emailElement.textContent = params.email || 'No disponible';
    if (phoneElement) phoneElement.textContent = params.phone || 'No disponible';

    // Procesar productos del carrito
    const productParam = params.products;
    if (productParam) {
        const productIds = extractProductIds(productParam);
        if (productIds.length > 0) {
            fetchProductData(productIds);
        }
    }

    // Llamar a la función para obtener datos de la API y cargar la imagen
    const movieTitle = params.movieTitle || '';
    if (movieTitle) {
        fetchMovieData(movieTitle.replace(/\+/g, ' '));
    }
}

// Función para extraer IDs de productos del parámetro 'products'
function extractProductIds(productParam) {
    const productMatches = productParam.match(/id=(\d+)/g) || [];
    return productMatches.map(match => parseInt(match.split('=')[1], 10));
}

// Función para obtener los parámetros de la URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.slice(1);
    const pairs = queryString.split('&');
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
    });
    return params;
}

// Función para cargar los datos de la película desde la API
function fetchMovieData(movieTitle) {
    const apiUrl = 'http://localhost:5006/api/Movie/GetPeliculas';

    console.log(`Llamando a la API de películas en: ${apiUrl}`);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API de películas');
            }
            return response.json();
        })
        .then(data => {
            const movie = data.find(movie => movie.titulo.toLowerCase() === movieTitle.toLowerCase());
            if (movie) {
                const movieImageElement = document.querySelector('.purchase-summary__movie-image');
                if (movieImageElement) {
                    movieImageElement.src = movie.cartel;
                    movieImageElement.alt = movie.titulo;
                }
            } else {
                console.warn('Película no encontrada en la API');
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos de la API de películas:', error);
        });
}

// Función para cargar los datos del producto desde la API
function fetchProductData(productIds) {
    const apiUrl = `http://localhost:5006/api/Productos/GetProductos?ids=${productIds.join(',')}`;

    console.log(`Llamando a la API de productos en: ${apiUrl}`);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API de productos');
            }
            return response.json();
        })
        .then(data => {
            // Filtrar y mostrar sólo los productos que coinciden con los IDs de la URL
            const productContainer = document.querySelector('.purchase-summary__product-list');
            if (productContainer) {
                productContainer.innerHTML = ''; // Limpiar cualquier contenido previo
                productIds.forEach(productId => {
                    const product = data.find(product => product.id === productId);
                    if (product) {
                        const productElement = document.createElement('p');
                        productElement.innerHTML = `<strong>Producto:</strong> ${product.nombre}`;
                        productContainer.appendChild(productElement);
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos de la API de productos:', error);
        });
}

// Llamar a la función para rellenar los datos
populateSummary();
