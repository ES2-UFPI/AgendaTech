import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserDropdown.css';
import wishIcon from './assets/user-wish.png';
import createEventIcon from './assets/create-event.png';
import helpIcon from './assets/help.png';
import logoutIcon from './assets/logout.png';
import profileIcon from './assets/profile.png';

const UserDropdown = ({ usuarioLogado, handleLogout }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Fecha o menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!usuarioLogado) {
    return null; // Se o usuário não estiver logado, não exibe o dropdown
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <a
        href="#"
        className="d-block link-body-emphasis text-decoration-none"
        onClick={(e) => {
          e.preventDefault(); // Previne o comportamento padrão
          toggleDropdown();
        }}
        aria-expanded={isDropdownVisible}
      >
        <img
          src={usuarioLogado.imagem ? `http://localhost:8000${usuarioLogado.imagem}` : '/assets/user-icon.png'}
          alt={usuarioLogado.nome || 'Usuário'}
          width="42"
          height="42"
          className="rounded-circle"
        />
      </a>
      <ul className={`dropdown-menu text-small shadow ${isDropdownVisible ? 'show' : ''}`}>
        <li>
          <Link className="dropdown-item create-event" to="/create-event">
            <img src={createEventIcon} alt="Criar Evento" />
            <span>Criar Evento</span>
          </Link>
        </li>
        <li>
          <a className="dropdown-item wish" href="/wish">
            <img src={wishIcon} alt="Lista de Desejos" />
            <span>Lista de desejos</span>
          </a>
        </li>
        <li>
          <Link className="dropdown-item profile" to="/minha-conta">
            <img src={profileIcon} alt="Minha Conta" />
            <span>Minha Conta</span>
          </Link>
        </li>
        <li>
          <Link className="dropdown-item help" to="/help">
            <img src={helpIcon} alt="Central de Ajuda" />
            <span>Central de ajuda</span>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item logout" href="#" onClick={handleLogout}>
            <img src={logoutIcon} alt="Sair" />
            <span>Sair</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;