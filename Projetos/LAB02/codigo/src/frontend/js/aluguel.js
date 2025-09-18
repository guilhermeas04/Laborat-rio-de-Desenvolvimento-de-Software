// Configuração da API
const API_BASE_URL = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', function () {
    // Verificar se o usuário está logado
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (!usuario || tipoUsuario !== 'Cliente') {
        alert('Acesso negado. Faça login como cliente.');
        window.location.href = 'login.html';
        return;
    }
});

document.getElementById('aluguelForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    const pedido = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        ano: parseInt(document.getElementById('ano').value),
        placa: document.getElementById('placa').value,
        matricula: document.getElementById('matricula').value,
        cliente: { id: usuario.id },
        dataPedido: new Date().toISOString(),
        status: 'PENDENTE'
    };

    try {
        // Enviar dados do pedido para o backend
        const response = await fetch(`${API_BASE_URL}/pedidos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido)
        });

        if (response.ok) {
            alert('Pedido de aluguel enviado para análise!');
            this.reset();
            setTimeout(() => {
                window.location.href = 'dashboard_cliente.html';
            }, 1000);
        } else {
            const errorData = await response.text();
            console.error('Erro ao enviar pedido:', errorData);
            alert('Erro ao enviar pedido. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        alert('Erro ao conectar com o servidor. Tente novamente.');
    }
});
