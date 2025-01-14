import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Estilos e bibliotecas
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

// Componentes locais
import About from './About';
import BuscarEvento from './BuscarEvento';
import Carrossel from './Carousel';
import CreateEvent from './CreateEvent';
import DeadLink from './DeadLink';
import DetalhesEvento from './DetalhesEvento';
import Eventos from './Eventos';
import Filter from './Filter';
import Footer from './Footer';
import HelpCenter from './HelpCenter';
import Ingressos from './Tickets';
import LoginUser from './LoginUser';
import MinhaConta from './MinhaConta';
import Navbar from './Navbar';
import RegisterUser from './RegisterUser';
import ThemeToggle from './ThemeToggle';
import UserList from './UserList';
import Wish from './Wish';


function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [filtro, setFiltro] = useState({});

  useEffect(() => {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      setUsuarioLogado(JSON.parse(usuario));
    }
  }, []);

  const handleLogin = (usuario) => {
    console.log('Dados do usuário no login:', usuario); // Log para verificar os dados recebidos
    setUsuarioLogado(usuario);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  };


  const handleLogout = () => {
    setUsuarioLogado(null);
    localStorage.removeItem('usuarioLogado');
  };

  const handleFilterChange = (novoFiltro) => {
    setFiltro(novoFiltro);
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          usuarioLogado={usuarioLogado}
          setUsuarioLogado={setUsuarioLogado}
          handleLogout={handleLogout}
        />

        {/* Espaçador */}
        <div style={{ marginBottom: '20px' }}></div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carrossel />
                <Eventos filtro={filtro} />
                <Filter onFilterChange={handleFilterChange} />
              </>
            }
          />
          <Route path="/create-event" element={<CreateEvent />} />

          <Route path="/eventos/:id" element={<DetalhesEvento usuarioLogado={usuarioLogado} />} />

          <Route
            path="/register"
            element={<RegisterUser setUsuarioLogado={handleLogin} />}
          />
          <Route path="/login" element={<LoginUser setUsuarioLogado={handleLogin} />} />
          <Route path="/usuarios" element={<UserList />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/minha-conta" element={<MinhaConta usuario={usuarioLogado} />} />
          <Route path="/buscar" element={<BuscarEvento />} />
          <Route path="/tickets/:id" element={<Ingressos />} />
          <Route path="/wish" element={<Wish usuarioLogado={usuarioLogado} />} />
          <Route path="*" element={<DeadLink />} />
        </Routes>

        <Footer />
        <ThemeToggle />
      </div>
    </Router>
  );

}

export default App;
