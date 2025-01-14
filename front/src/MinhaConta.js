import React, { useState, useEffect } from 'react';
import './MinhaConta.css';
//Atualização da rota Minha Conta no Menu UserDpropdown
const MinhaConta = ({ usuario, setUsuarioLogado }) => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    novoUsername: '',
  });
  const [mensagem, setMensagem] = useState(null);

  // Atualizar o formulário com os dados do usuário ao carregar o componente
  useEffect(() => {
    if (usuario) {
      console.log('Dados do usuário:', usuario); // Debug para verificar os dados recebidos
      setFormData({
        nome: usuario.nome || '',
        sobrenome: usuario.sobrenome || '',
        novoUsername: usuario.username || '',
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/editar_perfil/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usuario.username, // Username atual
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          novo_username: formData.novoUsername,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMensagem('Perfil atualizado com sucesso!');
        // Atualiza os dados do usuário logado no estado global
        const usuarioAtualizado = {
          ...usuario,
          nome: data.usuario.nome,
          sobrenome: data.usuario.sobrenome,
          username: data.usuario.username,
        };
        setUsuarioLogado(usuarioAtualizado);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
      } else {
        setMensagem(data.erro || 'Erro ao atualizar o perfil.');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setMensagem('Erro ao atualizar o perfil.');
    }
  };

  if (!usuario) {
    return <p>Você precisa estar logado para acessar esta página.</p>;
  }

  return (
    <div className="minha-conta-container">
      <h2>Minha Conta</h2>
      <img
        src={usuario.imagem ? `http://localhost:8000${usuario.imagem}` : '/assets/user-icon.png'}
        alt={usuario.nome}
        className="minha-conta-imagem"
      />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Sobrenome:</label>
          <input
            type="text"
            name="sobrenome"
            value={formData.sobrenome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nome de Usuário:</label>
          <input
            type="text"
            name="novoUsername"
            value={formData.novoUsername}
            onChange={handleChange}
            required
          />
        </div>
       
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};

export default MinhaConta;
