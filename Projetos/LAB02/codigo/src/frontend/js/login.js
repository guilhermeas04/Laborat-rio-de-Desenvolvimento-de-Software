document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // --- LÓGICA DE LOGIN SIMULADA ---
    if (email === 'cliente@teste.com') {
        alert('Login como cliente bem-sucedido!');
        window.location.href = 'dashboard_cliente.html';
    } else if (email === 'agente@teste.com') {
        alert('Login como agente bem-sucedido!');
        window.location.href = 'dashboard_agente.html';
    } else {
        alert('Email ou senha inválidos. Use "cliente@teste.com" ou "agente@teste.com" para testar.');
    }
    // --- FIM DA LÓGICA SIMULADA ---
});
