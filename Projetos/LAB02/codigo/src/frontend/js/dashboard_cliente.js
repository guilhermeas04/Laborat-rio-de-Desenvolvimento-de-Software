// Configuração da API
const API_BASE_URL = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', async function () {
    // Verificar se o usuário está logado
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (!usuario || tipoUsuario !== 'Cliente') {
        alert('Acesso negado. Faça login como cliente.');
        window.location.href = 'login.html';
        return;
    }

    // Exibir nome do usuário
    const welcomeMessage = document.querySelector('h2');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Bem-vindo, ${usuario.nome}!`;
    }

    try {
        // Buscar pedidos do cliente no backend
        const response = await fetch(`${API_BASE_URL}/usuarios/${usuario.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const usuarioCompleto = await response.json();
            const pedidos = usuarioCompleto.pedidos || [];

            const listaPedidos = document.getElementById('pedidos-lista');

            if (pedidos.length === 0) {
                listaPedidos.innerHTML = '<p>Você ainda não tem pedidos.</p>';
            } else {
                let pedidosHtml = '';
                pedidos.forEach(pedido => {
                    pedidosHtml += `
                        <div class="pedido-item">
                            <div>
                                <h3>Pedido #${pedido.id}</h3>
                                <p>Data: ${new Date(pedido.dataPedido).toLocaleDateString()}</p>
                                <p>Status: ${pedido.status || 'Em análise'}</p>
                            </div>
                            <div class="pedido-actions">
                                <button onclick="modificarPedido(${pedido.id})">Modificar</button>
                                <button class="btn-danger" onclick="cancelarPedido(${pedido.id})">Cancelar</button>
                            </div>
                        </div>
                    `;
                });
                listaPedidos.innerHTML = pedidosHtml;
            }
        } else {
            console.error('Erro ao buscar pedidos');
            document.getElementById('pedidos-lista').innerHTML = '<p>Erro ao carregar pedidos.</p>';
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        document.getElementById('pedidos-lista').innerHTML = '<p>Erro ao conectar com o servidor.</p>';
    }
});

// Funções para ações dos pedidos
function modificarPedido(pedidoId) {
    alert(`Funcionalidade de modificar pedido ${pedidoId} a ser implementada.`);
}

function cancelarPedido(pedidoId) {
    if (confirm('Tem certeza que deseja cancelar este pedido?')) {
        // Implementar cancelamento via API
        alert(`Pedido ${pedidoId} cancelado (funcionalidade a ser implementada).`);
    }
}

// Função de logout
function logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('tipoUsuario');
    window.location.href = 'login.html';
}
