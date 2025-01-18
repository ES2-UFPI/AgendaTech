import React, { useState } from 'react';
import Chat from './Chat';
import './ChatButton.css';

const ChatButton = ({ usuarioLogado }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!usuarioLogado) return null;

  return (
    <div className="chat-wrapper">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="chat-toggle-button"
      >
        {isOpen ? 'Fechar Chat' : 'Chat Global'}
      </button>
      
      {isOpen && (
        <div className="chat-modal">
          <Chat username={usuarioLogado.username} />
        </div>
      )}
    </div>
  );
};

export default ChatButton;