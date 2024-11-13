export const autenticarUsuario = async (nomeDeUsuario, senha) => {
    try {
        const resposta = await fetch(`${API_URL}/autenticar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nomeDeUsuario, senha })
        });
        if (resposta.ok) {
            const dados = await resposta.json();
            localStorage.setItem('token', dados.token);
            return true;
        }
        throw new Error('Autenticação falhou');
    } catch (error) {
        console.error('Erro de autenticação:', error);
        return false;
    }
};

export const usuarioEstaLogado = () => {
    return !!localStorage.getItem('token');
};