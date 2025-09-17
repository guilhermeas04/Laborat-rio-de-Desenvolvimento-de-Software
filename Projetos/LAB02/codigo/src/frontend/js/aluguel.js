document.getElementById('aluguelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pedido = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        ano: document.getElementById('ano').value,
        placa: document.getElementById('placa').value,
        matricula: document.getElementById('matricula').value,
    };

    // A ser implementado: Enviar dados do pedido para o backend
    console.log('Novo pedido de aluguel:', pedido);
    alert('Pedido de aluguel enviado para análise!');

    // Limpar o formulário e redirecionar
    this.reset();
    setTimeout(() => {
        window.location.href = 'dashboard_cliente.html';
    }, 1000);
});
