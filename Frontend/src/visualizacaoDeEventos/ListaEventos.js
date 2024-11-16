import React from 'react';
import { Lista } from 'react-bulma-components';

const ListaEventos = ({ eventos }) => {
    return (
        <Lista>
            {eventos.map(evento => (
                <Lista.Item key={evento.id}>
                    <Lista.ItemIcon>
                        {/* Ícone do evento */}
                    </Lista.ItemIcon>
                    <Lista.ItemContent>
                        <Lista.ItemTitle>{evento.titulo}</Lista.ItemTitle>
                        <Lista.ItemSubtitle>{new Date(evento.dataInicio).toLocaleDateString()}</Lista.ItemSubtitle>
                    </Lista.ItemContent>
                </Lista.Item>
            ))}
        </Lista>
    );
};

export default ListaEventos;