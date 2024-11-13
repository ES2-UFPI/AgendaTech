mport React, { useState, useEffect } from 'react';

const BatePapoGeral = ({ mensagens }) => {
    const [novaMensagem, setNovaMensagem] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você implementaria a lógica para enviar a mensagem
    };

    return (
        <div className="bate-papo">
            <h2>Bate-Papo</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    placeholder="Digite sua mensagem..."
                />
                <button type="submit">Enviar</button>
            </form>
            <div className="mensagens">
                {/* Aqui você exibiria as mensagens */}
            </div>
        </div>
    );
};

export default BatePapoGeral;