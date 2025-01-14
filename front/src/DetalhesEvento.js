import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetalhesEventos.css';
import WhatsIcon from './assets/Whats.png';
import WishIcon from './assets/Wish.png'; // Importa a imagem de "Wish"

function DetalhesEvento({ usuarioLogado }) {
  const { id } = useParams(); // Obtém o ID do evento da URL
  const [evento, setEvento] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarEvento = async () => {
      try {
        const resposta = await fetch(`http://localhost:8000/api/detalhe_evento/?id=${id}`);
        if (!resposta.ok) {
          throw new Error('Erro ao carregar evento');
        }
        const dados = await resposta.json();
        setEvento(dados);
      } catch (erro) {
        console.error('Erro ao carregar evento:', erro);
        setEvento(null);
      } finally {
        setCarregando(false);
      }
    };

    carregarEvento();
  }, [id]);

  const adicionarListaDesejos = async () => {
    console.log('Usuário ID:', usuarioLogado.id); // Deve exibir o ID do usuário
    console.log('Evento ID:', id); // Deve exibir o ID do evento

    if (!usuarioLogado || !usuarioLogado.id) {
      alert('Erro: Usuário não está logado.');
      return;
    }

    try {
      const resposta = await fetch('http://localhost:8000/api/adicionar_a_lista/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: usuarioLogado.id,
          evento_id: id,
        }),
      });

      const dados = await resposta.json(); // Captura a resposta do backend
      console.log('Resposta do backend:', dados);

      if (!resposta.ok) {
        throw new Error(dados.error || 'Erro desconhecido');
      }

      alert('Evento adicionado à sua lista de desejos!');
    } catch (erro) {
      console.error('Erro ao adicionar à lista de desejos:', erro.message);
      alert('Não foi possível adicionar o evento à lista de desejos. Tente novamente.');
    }
  };

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (!evento) {
    return <p>Evento não encontrado.</p>;
  }

  return (
    <div className="detalhes-evento">
      {/* Card principal com efeito glass */}
      <div
        className="info-card"
        style={{
          backgroundImage: `url(http://localhost:8000${evento.imagem})`, // Imagem do evento atual como fundo
        }}
      >
        {/* Lado esquerdo: Nome, data, horário e local */}
        <div className="info-left">
          <h1>{evento.nome}</h1>
          <p><strong>Data:</strong> {evento.data}</p>
          <p><strong>Horário:</strong> {evento.horario}</p>
          <p><strong>Local:</strong> {evento.local}</p>
        </div>

        {/* Lado direito: Imagem do evento */}
        <div className="info-right">
          <img src={`http://localhost:8000${evento.imagem}`} alt={evento.nome} />
        </div>
      </div>

      {/* Botão Compartilhar */}
      <div className="compartilhar-container">
        <button
          className="btn-compartilhar"
          onClick={() => {
            const shareOptions = document.querySelector('.compartilhar-opcoes');
            shareOptions.classList.toggle('hidden');
          }}
        >
          Compartilhar
        </button>

        <div className="compartilhar-opcoes hidden">
          <a
            href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
              `Confira este evento: ${window.location.href}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <img src={WhatsIcon} alt="WhatsApp" className="whatsapp-icon" />
            Compartilhar no WhatsApp
          </a>
          <button
            className="btn-copiar"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copiado para a área de transferência!');
            }}
          >
            Copiar Link
          </button>
        </div>
      </div>

      {/* Informações adicionais */}
      <p className="descricao">{evento.descricao}</p>

      {/* Card da imagem maior */}
      <div className="imagem-card">
        <img
          src={`http://localhost:8000${evento.imagem}`}
          alt={evento.nome}
        />
      </div>

      {/* Adicionar à Lista de Desejos */}
      <div className="wish-container">
        <button
          className="wish-button"
          onClick={adicionarListaDesejos} // Função para adicionar à lista de desejos
        >
          <img
            src={WishIcon}
            alt="Adicionar à Lista de Desejos"
            className="wish-icon"
          />
          <span>Adicionar à Lista de Desejos</span>
        </button>
      </div>


      {evento.link && (
  <p className="link-evento">
    <strong>Link do Evento:</strong>{' '}
    <a href={evento.link} target="_blank" rel="noopener noreferrer">
      Acesse aqui
    </a>
  </p>
)}

      {evento.preco && <p className="preco">Preço: R$ {evento.preco}</p>}

      {/* Botão para compra de ingressos */}
      <button
        className="btn-comprar-ingressos"
        onClick={() => {
          window.open(`/tickets/${id}`, '_blank'); // Corrigido para usar :id no formato correto
        }}
      >
        Comprar Ingressos
      </button>
    </div>
  );
}

export default DetalhesEvento;
