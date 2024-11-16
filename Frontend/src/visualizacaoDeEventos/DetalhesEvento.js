import React from 'react';

const DetalhesEvento = ({ evento }) => {
    return (
        <div>
            <h2>{evento.titulo}</h2>
            <p>Data: {new Date(evento.dataInicio).toLocaleDateString()}</p>
            <p>Local: {evento.local}</p>
            <p>Descrição: {evento.descricao}</p>
        </div>
    );
};

export default DetalhesEvento;
