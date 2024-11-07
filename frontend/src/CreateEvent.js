import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CreateEvent.css';

const CreateEvent = ({ types = [] }) => {
  const [event, setEvent] = useState({
    title: '',
    start: new Date().toISOString().slice(0, 16),
    end: new Date().toISOString().slice(0, 16),
    patient: '',
    doctor: '',
    type: '',
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // Função para buscar pacientes com base no termo de pesquisa
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pacientes/pacientes`);
      setPatients(response.data.map(patient => ({
        label: patient.nome,
        value: patient.id
      })));
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  };

// Função para buscar médicos com base no termo de pesquisa
const fetchDoctors = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/medicos/medicos`);
    const doctorsData = Array.isArray(response.data) ? response.data : [];
    setDoctors(doctorsData.map(doctor => ({
      label: doctor.nome,
      value: doctor.id
    })));
  } catch (error) {
    console.error('Erro ao buscar médicos:', error);
  }
};

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSelectChange = (selectedOption, action) => {
    setEvent({ ...event, [action.name]: selectedOption ? selectedOption.label : '' });
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
            placeholder="Adicione um título à consulta..."
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
          <Select
            name="patient"
            options={patients}
            value={patients.find(p => p.label === event.patient) || null}
            onChange={handleSelectChange}
            placeholder="Buscar paciente..."
            isClearable
            classNamePrefix="select"
            styles={{
              menu: (provided) => ({ ...provided, maxHeight: '150px', overflowY: 'auto' }),
            }}
          />
        </div>
        <div className="mb-3">
          <label>Médico:</label>
          <Select
            name="doctor"
            options={doctors}
            value={doctors.find(d => d.label === event.doctor) || null}
            onChange={handleSelectChange}
            placeholder="Buscar médico..."
            isClearable
            classNamePrefix="select"
            styles={{
              menu: (provided) => ({ ...provided, maxHeight: '150px', overflowY: 'auto' }),
            }}
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
