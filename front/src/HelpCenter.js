import React from 'react';
import './HelpCenter.css';

const HelpCenter = () => {
  const faqs = [
    {
      pergunta: "O que é a Agenda Tech?",
      resposta: "A Agenda Tech é uma plataforma para acompanhar e organizar eventos tecnológicos.",
    },
    {
      pergunta: "Como faço para me cadastrar?",
      resposta: "Clique em 'Cadastre-se' no menu superior e preencha as informações solicitadas.",
    },
    {
      pergunta: "É necessário pagar para usar a Agenda Tech?",
      resposta: "Não, a plataforma é gratuita para uso.",
    },
    {
      pergunta: "Posso adicionar eventos?",
      resposta: "Sim, basta estar logado e acessar a opção 'Criar Evento' no menu do usuário.",
    },
    {
      pergunta: "Como posso editar um evento criado?",
      resposta: "No momento, só é possível editar eventos diretamente na página 'Meus Eventos'.",
    },
    {
      pergunta: "Como posso excluir um evento?",
      resposta: "Na página 'Meus Eventos', você pode excluir eventos que criou.",
    },
    {
      pergunta: "Posso filtrar os eventos disponíveis?",
      resposta: "Sim, use os filtros na página inicial para pesquisar por data, tipo e preço.",
    },
    {
      pergunta: "Os eventos têm limite de participantes?",
      resposta: "Depende do evento. Essa informação estará disponível na descrição do evento.",
    },
    {
      pergunta: "Posso compartilhar um evento com outras pessoas?",
      resposta: "Sim, cada evento possui um link que pode ser compartilhado diretamente.",
    },
    {
      pergunta: "O que fazer se minha dúvida não estiver listada aqui?",
      resposta: "Envie um email para agendatech@es2ufpi.com e entraremos em contato.",
    },
  ];

  return (
    <div className="help-center-container">
      <h1 className="help-center-title">Central de Ajuda</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{faq.pergunta}</h3>
            <p className="faq-answer">{faq.resposta}</p>
          </div>
        ))}
      </div>
      <p className="contact-info">
        Para sugestões ou dúvidas, entre em contato pelo email:{" "}
        <a href="mailto:agendatech@es2ufpi.com">agendatech@es2ufpi.com</a>
      </p>
    </div>
  );
};

export default HelpCenter;
