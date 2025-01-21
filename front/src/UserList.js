import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css'; // Certifique-se de importar o arquivo CSS

function UserList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Requisição GET para listar usuários
    axios.get('http://127.0.0.1:8000/api/listar_usuarios/')
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar usuários:', error);
      });
  }, []);

  return (
    <div className="user-list">
      <h2>Lista de Usuários</h2>
      <div className="user-grid">
        {usuarios.map((usuario) => (
          <div className="user-card" key={usuario.id}>
            <img
              src={`http://127.0.0.1:8000${usuario.imagem}`} // URL completa da imagem
              alt={`${usuario.nome} ${usuario.sobrenome}`} // Texto alternativo
              className="user-image"
            />
            <div className="user-details">
              <p><strong>{usuario.nome} {usuario.sobrenome}</strong></p>
              <p className="username">@{usuario.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;