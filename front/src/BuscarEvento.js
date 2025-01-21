import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './BuscarEvento.css';

const BuscarEvento = () => {
  const [resultados, setResultados] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const termoBusca = queryParams.get('nome');
    if (termoBusca) {
      buscarEventos(termoBusca);
    }
  }, [location.search]);

  const buscarEventos = async (termoBusca) => {
    try {
      const resposta = await fetch(`http://localhost:8000/api/listar_eventos_nome?nome=${termoBusca}`);
      const dados = await resposta.json();
  
      // Exibir apenas os eventos retornados pela API
      setResultados(dados.eventos || []);
    } catch (erro) {
      console.error('Erro ao buscar eventos:', erro);
      setResultados([]);
    }
  };
  
  return (
    <main>
      <section className="py-5 text-center container">
        <h1>Resultados da Busca</h1>
      </section>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {resultados.length > 0 ? (
              resultados.map((evento) => (
                <div className="col" key={evento.id}>
                  <div className="card shadow-sm evento-card">
                    {evento.imagem && (
                      <img
                        src={`http://localhost:8000${evento.imagem}`}
                        alt={evento.nome}
                        className="card-img-top"
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{evento.nome}</h5>
                      <p className="card-text">
                        <strong>Data:</strong> {evento.data || '---'}
                        <br />
                        <strong>Horário:</strong> {evento.horario || '---'}
                        <br />
                        <strong>Tipo:</strong> {evento.tipo || '---'}
                        <br />
                        <strong>Local:</strong> {evento.local || '---'}
                      </p>
                      <a
                        href={`/eventos/${evento.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary mt-2"
                      >
                        Saiba mais
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum evento encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BuscarEvento;