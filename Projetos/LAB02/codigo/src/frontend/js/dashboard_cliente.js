document.addEventListener('DOMContentLoaded', function() {
    // A ser implementado: buscar os pedidos do cliente no backend
    const pedidos = [
        {
            id: 1,
            marca: 'Toyota',
            modelo: 'Corolla',
            ano: 2023,
            status: 'Aprovado'
        },
        {
            id: 2,
            marca: 'Honda',
            modelo: 'Civic',
            ano: 2024,
            status: 'Em análise'
        }
    ]; // Array de pedidos simulado

    const listaPedidos = document.getElementById('pedidos-lista');

    if (pedidos.length === 0) {
        listaPedidos.innerHTML = '<p>Você ainda não tem pedidos.</p>';
    } else {
        let pedidosHtml = '';
        pedidos.forEach(pedido => {
            pedidosHtml += `
                <div class="pedido-item">
                    <div>
                        <h3>${pedido.marca} ${pedido.modelo} (${pedido.ano})</h3>
                        <p>Status: ${pedido.status}</p>
                    </div>
                    <div class="pedido-actions">
                        <button onclick="alert('Funcionalidade de modificar a ser implementada.')">Modificar</button>
                        <button class="btn-danger" onclick="alert('Funcionalidade de cancelar a ser implementada.')">Cancelar</button>
                    </div>
                </div>
            `;
        });
        listaPedidos.innerHTML = pedidosHtml;
    }
});
