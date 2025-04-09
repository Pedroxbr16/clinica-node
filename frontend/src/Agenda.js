import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './css/agenda.css';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);
Modal.setAppElement('#root');

const Agenda = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    title: '',
    start: '',
    end: '',
    paciente_id: '',
    medico_id: '',
    tipo_consulta_id: '',
    modalidade: '',
  });
  const [selectedMedico, setSelectedMedico] = useState('');

  const fetchConsultas = () => {
    const stored = localStorage.getItem('consultas');
    const consultasData = stored ? JSON.parse(stored) : [];
    const mappedEvents = consultasData.map((consulta) => ({
      title: consulta.titulo,
      start: new Date(consulta.inicio),
      end: new Date(consulta.fim),
      id: consulta.id,
      paciente_id: consulta.paciente_id,
      medico_id: consulta.medico_id,
      tipo_consulta_id: consulta.tipo_consulta_id,
      modalidade: consulta.modalidade,
    }));
    setEvents(mappedEvents);
    setFilteredEvents(mappedEvents);
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  useEffect(() => {
    if (selectedMedico) {
      const filtered = events.filter((event) => event.medico_id.toString() === selectedMedico);
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [selectedMedico, events]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEditedEvent({
      title: event.title,
      start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
      paciente_id: event.paciente_id,
      medico_id: event.medico_id,
      tipo_consulta_id: event.tipo_consulta_id,
      modalidade: event.modalidade,
    });
    setShowModal(true);
  };

  const saveToStorage = (newEvents) => {
    const formatted = newEvents.map(ev => ({
      ...ev,
      titulo: ev.title,
      inicio: ev.start,
      fim: ev.end,
    }));
    localStorage.setItem('consultas', JSON.stringify(formatted));
  };

  const handleDelete = () => {
    const updated = events.filter(ev => ev.id !== selectedEvent.id);
    setEvents(updated);
    setFilteredEvents(updated);
    saveToStorage(updated);
    setShowModal(false);
    Swal.fire('Sucesso', 'Consulta excluída.', 'success');
  };

  const handleEdit = () => {
    const updated = events.map(ev =>
      ev.id === selectedEvent.id
        ? { ...ev, ...editedEvent, start: new Date(editedEvent.start), end: new Date(editedEvent.end) }
        : ev
    );
    setEvents(updated);
    setFilteredEvents(updated);
    saveToStorage(updated);
    setShowModal(false);
    Swal.fire('Sucesso', 'Consulta atualizada.', 'success');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.modalidade === 'Online' ? '#ff7f7f' : '#007bff';
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <div className="calendar-container">
      <div className="filter-container">
        <label htmlFor="medico-filter">
          <strong>Filtrar por Médico:</strong>
        </label>
        <select
          id="medico-filter"
          value={selectedMedico}
          onChange={(e) => setSelectedMedico(e.target.value)}
          style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px' }}
        >
          <option value="">Todos</option>
          {[...new Set(events.map(ev => ev.medico_id))].map((id, index) => (
            <option key={index} value={id}>Médico {id}</option>
          ))}
        </select>
      </div>

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
          showMore: (total) => `+ ver mais (${total})`,
        }}
        onSelectEvent={handleEventClick}
        eventPropGetter={eventStyleGetter}
      />

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Evento"
        style={{
          content: {
            maxWidth: '400px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
          },
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Editar Evento</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
          }}
        >
          <input type="text" name="title" value={editedEvent.title} onChange={handleInputChange} required className="form-control mb-2" placeholder="Título" />
          <input type="datetime-local" name="start" value={editedEvent.start} onChange={handleInputChange} required className="form-control mb-2" />
          <input type="datetime-local" name="end" value={editedEvent.end} onChange={handleInputChange} required className="form-control mb-2" />
          <select name="modalidade" value={editedEvent.modalidade} onChange={handleInputChange} required className="form-control mb-2">
            <option value="">Selecione a modalidade</option>
            <option value="Online">Online</option>
            <option value="Presencial">Presencial</option>
          </select>
          <div className="d-flex justify-content-between mt-3">
            <button type="submit" className="btn btn-primary">Salvar</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Excluir</button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fechar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Agenda;