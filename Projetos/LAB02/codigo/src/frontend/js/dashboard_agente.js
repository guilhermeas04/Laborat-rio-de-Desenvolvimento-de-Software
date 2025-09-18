document.addEventListener('DOMContentLoaded', function() {
    // A ser implementado: buscar os pedidos pendentes no backend
    const pedidosPendentes = [
        {
            id: 2,
            cliente: 'João da Silva',
            marca: 'Honda',
            modelo: 'Civic',
            ano: 2024,
            dataPedido: '2025-09-17'
        }
    ]; // Array simulado

    const listaPendentes = document.getElementById('pedidos-pendentes');

    if (pedidosPendentes.length === 0) {
        listaPendentes.innerHTML = '<p>Não há pedidos pendentes no momento.</p>';
    } else {
        let pedidosHtml = '';
        pedidosPendentes.forEach(pedido => {
            pedidosHtml += `
                <div class="pedido-item">
                    <div>
                        <h3>${pedido.marca} ${pedido.modelo} - Cliente: ${pedido.cliente}</h3>
                        <p>Data do Pedido: ${pedido.dataPedido}</p>
                    </div>
                    <div class="pedido-actions">
                        <button onclick="alert('Funcionalidade de aprovar a ser implementada.')">Aprovar</button>
                        <button class="btn-danger" onclick="alert('Funcionalidade de rejeitar a ser implementada.')">Rejeitar</button>
                    </div>
                </div>
            `;
        });
        listaPendentes.innerHTML = pedidosHtml;
    }
});
