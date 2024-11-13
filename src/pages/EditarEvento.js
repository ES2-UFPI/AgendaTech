import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarEvento = ({ eventoId }) => {
    const [evento, setEvento] = useState({});
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState('');
    const [local, setLocal] = useState('');
    const [link, setLink] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');

    useEffect(() => {
        carregarEvento(eventoId);
    }, [eventoId]);

    const carregarEvento = async (id) => {
        try {
            const response = await axios.get(`/api/eventos/${id}`);
            setEvento(response.data);
            setTitulo(response.data.titulo);
            setData(response.data.data);
            setLocal(response.data.local);
            setLink(response.data.link);
            setDescricao(response.data.descricao);
            setCategoria(response.data.categoria);
        } catch (error) {
            console.error('Erro ao carregar evento:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/eventos/${eventoId}`, {
                titulo,
                data,
                local,
                link,
                descricao,
                categoria
            });
            alert('Evento editado com sucesso!');
            // Limpar formulário após sucesso
            setTitulo('');
            setData('');
            setLocal('');
            setLink('');
            setDescricao('');
            setCategoria('');
        } catch (error) {
            console.error('Erro ao editar evento:', error);
            alert('Falha ao editar evento. Tente novamente.');
        }
    };

    return (
        <div className="editar-evento">
            <h2>Editar Evento</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Título do evento"
                    required
                />
                <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                />
                <input
                    type="text"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                    placeholder="Local do evento"
                />
                <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Link do evento (se online)"
                />
                <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descrição do evento"
                    required
                />
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                >
                    <option value="">Selecione uma categoria</option>
                    <option value="online">Online</option>
                    <option value="presencial">Presencial</option>
                </select>
                <button type="submit">Atualizar Evento</button>
            </form>
        </div>
    );
};

export default EditarEvento;