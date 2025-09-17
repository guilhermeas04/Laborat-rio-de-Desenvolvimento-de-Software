document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        endereco: document.getElementById('endereco').value,
        profissao: document.getElementById('profissao').value,
        rendimentos: [
            { empregador: document.getElementById('empregador1').value, rendimento: document.getElementById('rendimento1').value },
            { empregador: document.getElementById('empregador2').value, rendimento: document.getElementById('rendimento2').value },
            { empregador: document.getElementById('empregador3').value, rendimento: document.getElementById('rendimento3').value }
        ].filter(r => r.empregador && r.rendimento), // Filtra apenas os preenchidos
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    };

    // A ser implementado: Enviar dados para o backend
    console.log('Dados do cadastro:', usuario);
    alert('Cadastro realizado com sucesso! (Simulação)');

    // Limpar o formulário e redirecionar para o login
    this.reset();
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
});
