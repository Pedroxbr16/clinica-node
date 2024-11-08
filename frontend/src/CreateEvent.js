import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CreateEvent.css';

const CreateEvent = () => {
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
  const [types, setTypes] = useState([]); // Estado para armazenar os tipos de consulta

  // Função para buscar os pacientes
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

  // Função para buscar os médicos
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/medicos/medicos`);
      const doctorsData = Array.isArray(response.data.data) ? response.data.data : [];
      setDoctors(doctorsData.map(doctor => ({
        label: doctor.usuario, // ou doctor.nome se preferir
        value: doctor.id
      })));
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
    }
  };

  // Função para buscar os tipos de consulta
  const fetchTiposConsulta = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tipos_consulta/lista');
      const tiposData = Array.isArray(response.data) ? response.data : [];
      setTypes(tiposData.map(tipo => ({
        label: tipo.descricao, // Nome do tipo de consulta
        value: tipo.id
      })));
    } catch (error) {
      console.error('Erro ao buscar tipos de consulta:', error);
    }
  };

  // UseEffect para carregar os dados ao montar o componente
  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchTiposConsulta(); // Chama a função de buscar tipos de consulta
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSelectChange = (selectedOption, action) => {
    setEvent({ ...event, [action.name]: selectedOption ? selectedOption.value : '' });
  };

  // Função para enviar o evento para o backend
  const submitEvent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/consultas/adiciona', {
        titulo: event.title,
        inicio: event.start,
        fim: event.end,
        paciente_id: event.patient,
        medico_id: event.doctor,
        tipo_consulta: event.type,
      });
      console.log('Evento criado com sucesso:', response.data);
      alert('Consulta agendada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar consulta:', error);
      alert('Ocorreu um erro ao agendar a consulta. Tente novamente.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitEvent(); // Chama a função de envio ao backend
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
            value={patients.find(p => p.value === event.patient) || null}
            onChange={handleSelectChange}
            placeholder="Buscar paciente..."
            isClearable
            classNamePrefix="select"
            styles={{
              menu: (provided) => ({
                ...provided,
                maxHeight: '150px', // Limita a altura do menu dropdown
                overflowY: 'auto',  // Adiciona scroll somente ao dropdown
              }),
            }}
          />
        </div>
        <div className="mb-3">
          <label>Médico:</label>
          <Select
            name="doctor"
            options={doctors}
            value={doctors.find(d => d.value === event.doctor) || null}
            onChange={handleSelectChange}
            placeholder="Buscar médico..."
            isClearable
            classNamePrefix="select"
            styles={{
              menu: (provided) => ({
                ...provided,
                maxHeight: '150px',
                overflowY: 'auto',
              }),
            }}
          />
        </div>
        <div className="mb-4">
          <label>Tipo de Consulta:</label>
          <Select
            name="type"
            options={types}
            value={types.find(t => t.value === event.type) || null}
            onChange={handleSelectChange}
            placeholder="Selecione um Tipo de Consulta"
            isClearable
            classNamePrefix="select"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Agendar</button>
      </form>
    </div>
  );
};

export default CreateEvent;
