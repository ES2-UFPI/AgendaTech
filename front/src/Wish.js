import React, { useEffect, useState } from 'react';
import styles from './Wish.module.css';

const Wish = ({ usuarioLogado }) => {
  const [desejos, setDesejos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarListaDesejos = async () => {
      setCarregando(true);
      try {
        const resposta = await fetch(
          `http://localhost:8000/api/listar_lista_desejos/?usuario_id=${usuarioLogado.id}&page=${paginaAtual}`
        );
        const dados = await resposta.json();

        setDesejos(dados.eventos || []);
        setTotalPaginas(dados.total_paginas || 1);
      } catch (erro) {
        console.error('Erro ao carregar lista de desejos:', erro);
        setDesejos([]);
      } finally {
        setCarregando(false);
      }
    };

    carregarListaDesejos();
  }, [paginaAtual, usuarioLogado]);

  const mudarPagina = (novaPagina) => {
    if (novaPagina > 0 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina);
    }
  };

  if (carregando) {
    return <p>Carregando lista de desejos...</p>;
  }

  if (desejos.length === 0) {
    return <p>Sua lista de desejos está vazia.</p>;
  }

  return (
    <main>
      <section className={styles.wishHeader}>
        <div className={styles.wishHeaderContent}>
          <h1 className={styles.wishTitle}>Minha Lista de Desejos</h1>
          <p className={styles.wishSubtitle}>
            Página {paginaAtual} de {totalPaginas}
          </p>
        </div>
      </section>

      <div className={styles.wishContainer}>
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {desejos.map((evento) => (
              <div className="col" key={evento.id}>
                <div className={styles.wishCard}>
                  <div
                    className={styles.wishCardImg}
                    style={{ backgroundImage: `url(http://localhost:8000${evento.imagem})` }}
                  ></div>
                  <div className={styles.wishCardBody}>
                    <h5 className={styles.wishCardTitle}>{evento.nome}</h5>
                    <p className={styles.wishCardDate}>
                      <strong>Data:</strong> {evento.data || '---'}
                    </p>
                    <a
                      href={`/eventos/${evento.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.wishCardBtn}
                    >
                      Saiba Mais
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() => mudarPagina(paginaAtual - 1)}
              disabled={paginaAtual === 1}
            >
              Anterior
            </button>
            <button
              className="btn btn-primary"
              onClick={() => mudarPagina(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas}
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wish;
