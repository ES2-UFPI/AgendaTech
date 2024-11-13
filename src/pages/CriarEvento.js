import React, { useState } from 'react';
import { criarEvento } from '../services/api';

const CriarEvento = () => {
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState('');
    const [local, setLocal] = useState('');
    const [linkOnline, setLinkOnline] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await criarEvento({
            titulo,
            data,
            local,
            linkOnline,
            descricao,
            tipo: local ? 'presencial' : 'online'
        });
        // Limpar formulário após submissão
        setTitulo('');
        setData('');
        setLocal('');
        setLinkOnline('');
        setDescricao('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título do evento"
            />
            <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
            />
            <input
                type="text"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Local (se presencial)"
            />
            <input
                type="url"
                value={linkOnline}
                onChange={(e) => setLinkOnline(e.target.value)}
                placeholder="Link do evento online"
            />
            <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição do evento"
            />
            <button type="submit">Criar Evento</button>
        </form>
    );
};

export default CriarEvento;