import React, { useState } from 'react';

const BatePapoGeral = () => {
    const [mensagens, setMensagens] = useState([]);

    const enviarMensagem = (mensagem) => {
        // Implementar lógica de envio de mensagem
        setMensagens(prevMensagens => [...prevMensagens, mensagem]);
    };

    return (
        <div>
            <h2>Bate-Papo Geral</h2>
            <ul>
                {mensagens.map(mensagem => (
                    <li key={mensagem}>{mensagem}</li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Digite sua mensagem"
                onChange={(e) => enviarMensagem(e.target.value)}
            />
        </div>
    );
};

export default BatePapoGeral;