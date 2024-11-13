import React, { useState } from 'react';

const EventoForm = ({ evento, setEvento, handleSubmit }) => {
    const [titulo, setTitulo] = useState(evento.titulo || '');
    const [data, setData] = useState(evento.data || '');
    const [local, setLocal] = useState(evento.local || '');
    const [link, setLink] = useState(evento.link || '');
    const [descricao, setDescricao] = useState(evento.descricao || '');
    const [categoria, setCategoria] = useState(evento.categoria || '');

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="titulo">Título:</label>
                <input
                    type="text"
                    id="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="data">Data:</label>
                <input
                    type="date"
                    id="data"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="local">Local:</label>
                <input
                    type="text"
                    id="local"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="link">Link (se online):</label>
                <input
                    type="url"
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="descricao">Descrição:</label>
                <textarea
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label htmlFor="categoria">Categoria:</label>
                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                >
                    <option value="">Selecione uma categoria</option>
                    <option value="online">Online</option>
                    <option value="presencial">Presencial</option>
                </select>
            </div>
            <button type="submit">Salvar</button>
        </form>
    );
};

export default EventoForm;