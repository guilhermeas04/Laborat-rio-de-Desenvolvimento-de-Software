// Configuração da API
const API_BASE_URL = 'http://localhost:8080';

document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const usuario = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        endereco: document.getElementById('endereco').value,
        profissao: document.getElementById('profissao').value,
        senha: document.getElementById('senha').value,
        tipoUsuario: 'Cliente' // Por padrão, novos usuários são clientes
    };

    // Preparar rendimentos
    const rendimentos = [
        { empregador: document.getElementById('empregador1').value, rendimento: document.getElementById('rendimento1').value },
        { empregador: document.getElementById('empregador2').value, rendimento: document.getElementById('rendimento2').value },
        { empregador: document.getElementById('empregador3').value, rendimento: document.getElementById('rendimento3').value }
    ].filter(r => r.empregador && r.rendimento); // Filtra apenas os preenchidos

    try {
        // Primeiro, criar o usuário
        const response = await fetch(`${API_BASE_URL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario)
        });

        if (response.ok) {
            const usuarioCriado = await response.json();

            // Depois, adicionar os rendimentos se existirem
            for (const rendimento of rendimentos) {
                const rendimentoData = {
                    empregador: rendimento.empregador,
                    valor: parseFloat(rendimento.rendimento)
                };

                await fetch(`${API_BASE_URL}/usuarios/${usuarioCriado.id}/rendimentos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(rendimentoData)
                });
            }

            alert('Cadastro realizado com sucesso!');
            this.reset();
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        } else {
            const errorData = await response.text();
            console.error('Erro ao cadastrar:', errorData);
            alert('Erro ao realizar cadastro. Verifique os dados e tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        alert('Erro ao conectar com o servidor. Tente novamente.');
    }
});
