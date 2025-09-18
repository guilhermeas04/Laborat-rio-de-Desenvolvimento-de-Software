// Configuração da API
const API_BASE_URL = 'http://localhost:8080';

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;

    try {
        // Fazer a requisição para o backend
        const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cpf: cpf,
                senha: senha
            })
        });

        if (response.ok) {
            const data = await response.json();
            const usuario = data.usuario;

            // Salvar dados do usuário no localStorage
            localStorage.setItem('usuario', JSON.stringify(usuario));
            localStorage.setItem('tipoUsuario', data.tipo);

            // Redirecionar baseado no tipo de usuário
            if (data.tipo === 'Cliente') {
                alert('Login como cliente bem-sucedido!');
                window.location.href = 'dashboard_cliente.html';
            } else if (data.tipo === 'Agente') {
                alert('Login como agente bem-sucedido!');
                window.location.href = 'dashboard_agente.html';
            }
        } else {
            alert('CPF ou senha inválidos.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao conectar com o servidor. Tente novamente.');
    }
});
