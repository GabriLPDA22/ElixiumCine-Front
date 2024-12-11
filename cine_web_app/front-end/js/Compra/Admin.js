document.getElementById('finalize-purchase').addEventListener('click', function () {
    const pedidoId = document.getElementById('Id').value.trim();
    if (!pedidoId) {
        alert('Por favor, ingrese un ID de pedido válido.');
        return;
    }

    fetch(`http://localhost:22951/api/Pedido/DeletePedido/${pedidoId} `, {
        method: 'DELETE', 
    })

});