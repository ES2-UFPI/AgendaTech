import React from 'react';

const ListaDeEventos = ({ eventos }) => {
    return (
        <div>
            <h2>Próximos Eventos</h2>
            <ul>
                {eventos.map(evento => (
                    <li key={evento._id}>{evento.titulo}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListaDeEventos;
