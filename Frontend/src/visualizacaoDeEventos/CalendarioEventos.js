import React from 'react';
import { Calendar } from '@fullcalendar/react';

const CalendarioEventos = () => {
    return (
        <div>
            <Calendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                eventos={eventos} // passar os eventos do backend para este componente
            />
        </div>
    );
};

export default CalendarioEventos;