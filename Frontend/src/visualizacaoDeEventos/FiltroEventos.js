import React from 'react';

const FiltroEventos = () => {
    const [tipoFiltro, setTipoFiltro] = React.useState('todos');

    const filtrarEventos = (eventos) => {
        switch (tipoFiltro) {
            case 'online':
                return eventos.filter(e => e.tipo === 'online');
            case 'presencial':
                return eventos.filter(e => e.tipo === 'presencial');
            default:
                return eventos;
        }
    };

    return (
        <>
            <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
                <option value="todos">Todos</option>
                <option value="online">Online</option>
                <option value="presencial">Presencial</option>
            </select>
            <ListaEventos eventos={filtrarEventos(eventos)} />
        </>
    );
};

export default FiltroEventos;