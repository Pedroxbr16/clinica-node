import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';  
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './css/agenda.css'; 
import CreateEvent from './CreateEvent'; 

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const Agenda = () => {
  // Define o estado para armazenar os eventos
  const [events, setEvents] = useState([
  ]);

  // Estado para o médico selecionado no filtro
  const [selectedMedico, setSelectedMedico] = useState('');

  // Lista de médicos (pode ser obtida de um banco de dados ou API)
  const medicos = ['Dr. Silva', 'Dr. Souza', 'Dr. Oliveira'];

  // Função para filtrar eventos com base no médico selecionado
  const filteredEvents = selectedMedico
    ? events.filter(event => event.medico === selectedMedico)
    : events;

  return (
    <div className="calendar-container">
      {/* <div className="filter-container">
        <label htmlFor="medico-select">Filtrar por Médico: </label>
        <select
          id="medico-select"
          value={selectedMedico}
          onChange={(e) => setSelectedMedico(e.target.value)}
        >
          <option value="">Todos</option>
          {medicos.map(medico => (
            <option key={medico} value={medico}>{medico}</option>
          ))}
        </select>
      </div> */}

      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }} 
        views={['month', 'week', 'day']}
        defaultView="month"
        messages={{
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
          today: 'Hoje',
          previous: 'Anterior',
          next: 'Próximo',
          showMore: total => `+ ver mais (${total})`,
        }}
      />
    </div>
  );
};

export default Agenda;
