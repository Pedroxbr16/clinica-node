import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Modal from 'react-modal'; // Para criar o modal
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './css/agenda.css';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const Agenda = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Função para buscar consultas
  const fetchConsultas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/consultas/lista');
      const consultasData = Array.isArray(response.data) ? response.data : [];
      setEvents(consultasData.map(consulta => ({
        title: consulta.titulo,
        start: new Date(consulta.inicio),
        end: new Date(consulta.fim),
        id: consulta.id // Supondo que você tenha um id único
      })));
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    }
  };

  // Chama as funções de busca ao carregar o componente
  useEffect(() => {
    fetchConsultas();
  }, []);

  // Manipulador para selecionar o evento
  const handleEventClick = (event) => {
    setSelectedEvent(event); // Armazena o evento selecionado
    setShowModal(true); // Exibe o modal
  };

  // Função para excluir o evento
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/consultas/${selectedEvent.id}`);
      setEvents(events.filter(event => event.id !== selectedEvent.id)); // Remove o evento da lista
      setShowModal(false); // Fecha o modal
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  };

  // Função para editar o evento
  const handleEdit = () => {
    // Aqui você pode implementar a lógica para editar o evento
    alert('Função de edição ainda não implementada.');
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
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
        onSelectEvent={handleEventClick} // Chamando a função quando o evento é clicado
      />

      {/* Modal para editar ou excluir o evento */}
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} contentLabel="Evento">
        <h2>Evento: {selectedEvent && selectedEvent.title}</h2>
        <p>Data: {selectedEvent && selectedEvent.start.toString()}</p>

        <button onClick={handleEdit}>Editar</button>
        <button onClick={handleDelete}>Excluir</button>
        <button onClick={() => setShowModal(false)}>Fechar</button>
      </Modal>
    </div>
  );
};

export default Agenda;
