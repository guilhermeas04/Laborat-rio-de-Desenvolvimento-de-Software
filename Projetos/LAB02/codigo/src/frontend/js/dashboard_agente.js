// Configuração da API
const API_BASE_URL = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', async function () {
    // Verificar se o usuário está logado como agente
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (!usuario || tipoUsuario !== 'Agente') {
        alert('Acesso negado. Faça login como agente.');
        window.location.href = 'login.html';
        return;
    }

    // Exibir nome do usuário
    const welcomeMessage = document.querySelector('h2');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Bem-vindo, ${usuario.nome}!`;
    }

    try {
        // Buscar todos os pedidos para análise (como agente tem acesso a todos)
        const response = await fetch(`${API_BASE_URL}/pedidos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const pedidos = await response.json();
            const pedidosPendentes = pedidos.filter(pedido => !pedido.status || pedido.status === 'PENDENTE');

            const listaPendentes = document.getElementById('pedidos-pendentes');

            if (pedidosPendentes.length === 0) {
                listaPendentes.innerHTML = '<p>Não há pedidos pendentes no momento.</p>';
            } else {
                let pedidosHtml = '';
                pedidosPendentes.forEach(pedido => {
                    pedidosHtml += `
                        <div class="pedido-item">
                            <div>
                                <h3>Pedido #${pedido.id} - Cliente: ${pedido.cliente ? pedido.cliente.nome : 'N/A'}</h3>
                                <p>Data do Pedido: ${new Date(pedido.dataPedido).toLocaleDateString()}</p>
                            </div>
                            <div class="pedido-actions">
                                <button onclick="aprovarPedido(${pedido.id})">Aprovar</button>
                                <button class="btn-danger" onclick="rejeitarPedido(${pedido.id})">Rejeitar</button>
                            </div>
                        </div>
                    `;
                });
                listaPendentes.innerHTML = pedidosHtml;
            }
        } else {
            console.error('Erro ao buscar pedidos');
            document.getElementById('pedidos-pendentes').innerHTML = '<p>Erro ao carregar pedidos.</p>';
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        document.getElementById('pedidos-pendentes').innerHTML = '<p>Erro ao conectar com o servidor.</p>';
    }
});

// Funções para ações dos pedidos
async function aprovarPedido(pedidoId) {
    try {
        const response = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'APROVADO' })
        });

        if (response.ok) {
            alert('Pedido aprovado com sucesso!');
            location.reload(); // Recarregar a página para atualizar a lista
        } else {
            alert('Erro ao aprovar pedido.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

async function rejeitarPedido(pedidoId) {
    if (confirm('Tem certeza que deseja rejeitar este pedido?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'REJEITADO' })
            });

            if (response.ok) {
                alert('Pedido rejeitado.');
                location.reload(); // Recarregar a página para atualizar a lista
            } else {
                alert('Erro ao rejeitar pedido.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor.');
        }
    }
}

// Função de logout
function logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('tipoUsuario');
    window.location.href = 'login.html';
}
