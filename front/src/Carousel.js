import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Carrossel = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        const resposta = await fetch('http://localhost:8000/api/listar_eventos?page=1');
        const dados = await resposta.json();
  
        // Filtrar e ordenar eventos pela data mais próxima
        const eventosOrdenados = (dados.eventos || [])
          .filter((evento) => new Date(evento.data) >= new Date()) // Filtra eventos com data futura ou atual
          .sort((a, b) => new Date(a.data) - new Date(b.data)) // Ordena por data mais próxima
  
          .slice(0, 3); // Pega os 3 primeiros eventos mais próximos
  
        setEventos(eventosOrdenados);
      } catch (erro) {
        console.error('Erro ao carregar eventos:', erro);
      }
    };
  
    carregarEventos();
  }, []);
  

  return (
    <div
      id="myCarousel"
      className="carousel slide mb-6"
      data-bs-ride="carousel"
      data-bs-interval="3000" // Controla o tempo entre slides
    >
      {/* Indicadores */}
      <div className="carousel-indicators">
        {eventos.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Slides do Carrossel */}
      <div className="carousel-inner">
        {eventos.map((evento, index) => (
          <div
            key={evento.id}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">
              {/* Imagem */}
              <div className="w-50 pe-3">
                <img
                  src={`http://localhost:8000${evento.imagem}`}
                  alt={evento.nome}
                  className="d-block w-100"
                  style={{
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
              </div>

              {/* Card com informações */}
              <div
                className="p-4"
                style={{
                  backgroundColor: '#f9f9f9',
                  color: '#000',
                  borderRadius: '10px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  maxWidth: '500px',
                }}
              >
                <h1>{evento.nome}</h1>
                <p className="opacity-75">{evento.descricao}</p>
                <p>
                  <strong>Data:</strong> {evento.data}
                  <br />
                  <strong>Horário:</strong> {evento.horario}
                  <br />
                  <strong>Local:</strong> {evento.local}
                  <br />
                  <strong>Tipo:</strong> {evento.tipo}
                </p>
                <p>
                  <a className="btn btn-lg btn-primary" href="#">
                    Saiba mais
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botões de navegação */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '50%', // Centraliza verticalmente
          transform: 'translateY(-50%)',
          left: '10px', // Ajusta a posição horizontal
        }}
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27white%27 viewBox=%270 0 16 16%27%3E%3Cpath d=%27M11.354 1.146a.5.5 0 0 1 0 .708L5.207 8l6.147 6.146a.5.5 0 0 1-.708.708l-6.5-6.5a.5.5 0 0 1 0-.708l6.5-6.5a.5.5 0 0 1 .708 0z%27/%3E%3C/svg%3E')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '20px',
            height: '20px',
          }}
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '50%', // Centraliza verticalmente
          transform: 'translateY(-50%)',
          right: '10px', // Ajusta a posição horizontal
        }}
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27white%27 viewBox=%270 0 16 16%27%3E%3Cpath d=%27M4.646 14.854a.5.5 0 0 1 0-.708L10.793 8 4.646 1.854a.5.5 0 1 1 .708-.708l6.5 6.5a.5.5 0 0 1 0 .708l-6.5 6.5a.5.5 0 0 1-.708 0z%27/%3E%3C/svg%3E')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '20px',
            height: '20px',
          }}
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carrossel;
