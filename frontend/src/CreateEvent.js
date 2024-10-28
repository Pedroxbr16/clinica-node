import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap importado
import './css/CreateEvent.css';

const CreateEvent = ({ types = [] }) => {
  const [event, setEvent] = useState({
    title: '',
    start: new Date().toISOString().slice(0, 16), // Formato para datetime-local
    end: new Date().toISOString().slice(0, 16),   // Formato para datetime-local
    patient: '',
    doctor: '',
    type: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Evento criado:', event);
    // Lógica para enviar o evento para o backend
  };

  return (
    <div className="container create-event-container mt-5">
      <h2 className="text-center mb-4">Nova Consulta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Título:</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Adicione um título a consulta..."
            value={event.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Início:</label>
            <input
              type="datetime-local"
              name="start"
              className="form-control"
              value={event.start}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Fim:</label>
            <input
              type="datetime-local"
              name="end"
              className="form-control"
              value={event.end}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label>Paciente:</label>
          <input
            type="text"
            name="patient"
            className="form-control"
            placeholder="Buscar paciente..."
            value={event.patient}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Médico:</label>
          <input
            type="text"
            name="doctor"
            className="form-control"
            placeholder="Buscar médico..."
            value={event.doctor}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label>Tipo de Consulta:</label>
          <select
            name="type"
            className="form-select"
            value={event.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione um Tipo de Consulta</option>
            {types.length > 0 ? (
              types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))
            ) : (
              <option value="">Nenhum tipo disponível</option>
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Agendar</button>
      </form>
    </div>
  );
};

export default CreateEvent;
