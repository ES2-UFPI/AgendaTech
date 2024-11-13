import React from 'react';

const DetalhesDoEvento = ({ evento }) => {
    return (
        <div className="detalhes-do-evento">
            <h2>{evento.titulo}</h2>
            <p>Data: {evento.data}</p>
            <p>Local: {evento.local}</p>
            {evento.link && <p>Link: {evento.link}</p>}
            <p>Categoria: {evento.categoria}</p>
            <p>{evento.descricao}</p>
        </div>
    );
};

export default DetalhesDoEvento;