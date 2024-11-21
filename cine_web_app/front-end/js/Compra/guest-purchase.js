document.addEventListener('DOMContentLoaded', function () {
    const ticketTable = document.querySelector('.ticket-table');
    const totalSummary = document.getElementById('final-total');

    // Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const seats = params.get('seats') ? params.get('seats').split(',') : [];
    const totalPrice = parseFloat(params.get('totalPrice')) || 0; // Precio de las entradas
    const vipCount = parseInt(params.get('vipCount')) || 0; // Número de entradas VIP
    const cartProducts = params.get('cartProducts') ? JSON.parse(params.get('cartProducts')) : []; // Productos del carrito
    const cartTotal = parseFloat(params.get('cartTotal')) || 0; // Total de la compra (entradas + productos)

    // Cálculo de entradas normales
    const normalCount = seats.length - vipCount; // Diferencia entre el total de entradas y las VIP
    const normalPrice = normalCount * 6.90; // Precio de las entradas normales
    const vipPrice = vipCount * 8.10; // Precio de las entradas VIP

    // Renderizar entradas normales
    function renderNormalTickets() {
        if (normalCount > 0) {
            const normalRow = document.createElement('div');
            normalRow.classList.add('table-row');
            normalRow.innerHTML = `
                <span>${normalCount}x Entrada Normal</span>
                <span>${normalPrice.toFixed(2)} €</span>
            `;
            ticketTable.appendChild(normalRow);
        }
    }

    // Renderizar entradas VIP
    function renderVipTickets() {
        if (vipCount > 0) {
            const vipRow = document.createElement('div');
            vipRow.classList.add('table-row');
            vipRow.innerHTML = `
                <span>${vipCount}x Entrada VIP</span>
                <span>${vipPrice.toFixed(2)} €</span>
            `;
            ticketTable.appendChild(vipRow);
        }
    }

    // Renderizar productos
    function renderProducts() {
        cartProducts.forEach(product => {
            const productRow = document.createElement('div');
            productRow.classList.add('table-row');
            productRow.innerHTML = `
                <span>${product.quantity}x ${product.name}</span>
                <span>${(product.price * product.quantity).toFixed(2)} €</span>
            `;
            ticketTable.appendChild(productRow);
        });
    }

    // Mostrar el total final
    function renderTotal() {
        totalSummary.textContent = `${cartTotal.toFixed(2)} €`;
    }

    // Renderizar la página completa
    function renderPage() {
        renderNormalTickets(); // Muestra las entradas normales
        renderVipTickets();    // Muestra las entradas VIP
        renderProducts();      // Muestra los productos
        renderTotal();         // Muestra el total directamente desde `cartTotal`
    }

    renderPage(); // Inicia el renderizado
});
