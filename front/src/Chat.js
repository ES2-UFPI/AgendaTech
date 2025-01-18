import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/chat/global/');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data]);
      scrollToBottom();
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const ws = new WebSocket('ws://localhost:8000/ws/chat/global/');
      ws.onopen = () => {
        ws.send(JSON.stringify({
          message: message,
          username: username
        }));
      };
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.username === username ? 'own-message' : ''}`}
          >
            <span className="username">{msg.username}: </span>
            <span className="message-content">{msg.message}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Chat;