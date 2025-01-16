import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import agendaIcon from './assets/agenda.png';
import searchIcon from './assets/lupa.png';
import UserDropdown from './UserDropdown';

function Navbar({ usuarioLogado, setUsuarioLogado, handleLogout }) {
  const [termoBusca, setTermoBusca] = useState('');
  const navigate = useNavigate();

  const handleBuscaChange = (event) => {
    setTermoBusca(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      buscarEventos();
    }
  };

  const buscarEventos = () => {
    if (termoBusca.trim() === '') {
      alert('Por favor, insira um termo de busca.');
      return;
    }
    navigate(`/buscar?nome=${encodeURIComponent(termoBusca)}`);
    setTermoBusca(''); // Limpar campo de busca após redirecionar
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="navbar">
      {/* Logo e Barra de Pesquisa */}
      <div className="navbar-left">
        <Link to="/" onClick={scrollToTop}>
          <img src={agendaIcon} alt="Agenda" id="agenda-icon" />
        </Link>
        <div className="search-bar">
          <div className="search-icon">
            <img src={searchIcon} alt="Lupa" />
          </div>
          <input
            type="text"
            id="search-input"
            placeholder="Buscar eventos"
            value={termoBusca}
            onChange={handleBuscaChange}
            onKeyDown={handleKeyDown}
            aria-label="Buscar eventos por nome"
          />
          <button
            id="search-button"
            className="search-button"
            onClick={buscarEventos}
            aria-label="Botão para buscar eventos"
          >
            Procurar
          </button>
        </div>
      </div>

      {/* Área de usuário */}
      <div className="navbar-right">
        {!usuarioLogado ? (
          <>
            <button
              className="btn btn-primary me-2"
              onClick={() => (window.location.href = '/register')}
            >
              Cadastre-se
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => (window.location.href = '/login')}
            >
              Acesse sua conta
            </button>
          </>
        ) : (
          <UserDropdown
            usuarioLogado={usuarioLogado}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
