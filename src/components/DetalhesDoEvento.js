import React from 'react';

const DetalhesDoEvento = ({ evento }) => {
    return (
        <div>
            <h2>{evento.titulo}</h2>
            <p>Data: {evento.data}</p>
            <p>Local: {evento.local || event.onlineLink}</p>
            <p>{evento.descricao}</p>
        </div>
    );
};

export default DetalhesDoEvento;