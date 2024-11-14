import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Modal from 'react-modal';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './css/agenda.css';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

Modal.setAppElement('#root'); // Define o appElement para o modal apenas uma vez

const Agenda = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ title: '', start: '', end: '', paciente_id: '', medico_id: '', tipo_consulta_id: '' });
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [tiposConsulta, setTiposConsulta] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState(''); // Estado para o filtro de médico

  // Função para buscar consultas
  const fetchConsultas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/consultas/lista');
      const consultasData = Array.isArray(response.data) ? response.data : [];
      const mappedEvents = consultasData.map(consulta => ({
        title: consulta.titulo,
        start: new Date(consulta.inicio),
        end: new Date(consulta.fim),
        id: consulta.id,
        paciente_id: consulta.paciente_id,
        medico_id: consulta.medico_id,
        tipo_consulta_id: consulta.tipo_consulta_id,
      }));
      setEvents(mappedEvents);
      setFilteredEvents(mappedEvents); // Inicialmente exibe todos os eventos
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    }
  };

  // Função para buscar lista de tipos de consulta
  const fetchTiposConsulta = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tipos_consulta/lista');
      const tiposData = Array.isArray(response.data) ? response.data : [];
      setTiposConsulta(tiposData.map(tipo => ({
        label: tipo.descricao,
        value: tipo.id
      })));
    } catch (error) {
      console.error('Erro ao buscar tipos de consulta:', error);
    }
  };

  // Função para buscar lista de pacientes
  const fetchPacientes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pacientes/pacientes');
      setPacientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  };

  // Função para buscar lista de médicos
  const fetchMedicos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/medicos/medicos');
      setMedicos(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
    }
  };

  // Chama as funções de busca ao carregar o componente
  useEffect(() => {
    fetchConsultas();
    fetchPacientes();
    fetchMedicos();
    fetchTiposConsulta();
  }, []);

  // Filtra os eventos com base no médico selecionado
  useEffect(() => {
    if (selectedMedico) {
      const filtered = events.filter(event => {
        console.log(`Comparing event.medico_id: ${event.medico_id} with selectedMedico: ${selectedMedico}`);
        return event.medico_id.toString() === selectedMedico; // Certifica-se de que ambos sejam strings para comparação
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events); // Se nenhum médico estiver selecionado, exibe todos os eventos
    }
  }, [selectedMedico, events]);

  // Manipulador para selecionar o evento
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEditedEvent({
      title: event.title,
      start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
      paciente_id: event.paciente_id,
      medico_id: event.medico_id,
      tipo_consulta_id: event.tipo_consulta_id,
    });
    setShowModal(true);
  };

  // Função para excluir o evento
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/consultas/${selectedEvent.id}`);
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setShowModal(false);
      alert('Consulta excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  };

  // Função para editar o evento
  const handleEdit = async () => {
    try {
      const updatedEvent = {
        titulo: editedEvent.title,
        inicio: new Date(editedEvent.start),
        fim: new Date(editedEvent.end),
        paciente_id: editedEvent.paciente_id,
        medico_id: editedEvent.medico_id,
        tipo_consulta_id: editedEvent.tipo_consulta_id,
      };
      const response = await axios.put(`http://localhost:5000/consultas/${selectedEvent.id}`, updatedEvent);
      
      if (response.status === 200) {
        setEvents(events.map(event => 
          event.id === selectedEvent.id ? { ...event, ...updatedEvent } : event
        ));
        setShowModal(false);
        alert('Alterações salvas com sucesso!');
      } else {
        console.error('Erro ao editar evento:', response.statusText);
        alert('Erro ao salvar as alterações. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao editar evento:', error);
      alert('Erro ao salvar as alterações. Tente novamente.');
    }
  };

  // Manipulador para alterações no formulário de edição
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  return (
    <div className="calendar-container">
      <div className="filter-container">
        <label htmlFor="medico-filter"><strong>Filtrar por Médico:</strong></label>
        <select
          id="medico-filter"
          value={selectedMedico}
          onChange={(e) => setSelectedMedico(e.target.value)}
          style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px' }}
        >
          <option value="">Todos</option>
          {medicos.map(medico => (
            <option key={medico.id} value={medico.id}>{medico.usuario}</option>
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
          showMore: total => `+ ver mais (${total})`,
        }}
        onSelectEvent={handleEventClick}
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
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }
        }}
      >
        {/* Conteúdo do Modal */}
        <h2 style={{ textAlign: 'center' }}>Editar Evento</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Título</strong></label>
            <input
              type="text"
              name="title"
              value={editedEvent.title}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Paciente</strong></label>
            <select
              name="paciente_id"
              value={editedEvent.paciente_id}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Selecione um paciente</option>
              {pacientes.map(paciente => (
                <option key={paciente.id} value={paciente.id}>
                  {paciente.nome}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Médico</strong></label>
            <select
              name="medico_id"
              value={editedEvent.medico_id}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Selecione um médico</option>
              {medicos.map(medico => (
                <option key={medico.id} value={medico.id}>
                  {medico.usuario}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Tipo de Consulta</strong></label>
            <select
              name="tipo_consulta_id"
              value={editedEvent.tipo_consulta_id}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Selecione um tipo de consulta</option>
              {tiposConsulta.map(tipo => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Data de Início</strong></label>
            <input
              type="datetime-local"
              name="start"
              value={editedEvent.start}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Data de Fim</strong></label>
            <input
              type="datetime-local"
              name="end"
              value={editedEvent.end}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', borderRadius: '4px', border: 'none' }}>Salvar Alterações</button>
            <button type="button" onClick={handleDelete} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px 15px', borderRadius: '4px', border: 'none' }}>Excluir</button>
            <button type="button" onClick={() => setShowModal(false)} style={{ backgroundColor: '#6c757d', color: '#fff', padding: '10px 15px', borderRadius: '4px', border: 'none' }}>Fechar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Agenda;
