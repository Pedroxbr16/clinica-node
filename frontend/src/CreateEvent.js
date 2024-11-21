import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2'; // Importa o SweetAlert2
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
  const [types, setTypes] = useState([]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pacientes/pacientes`);
      setPatients(
        response.data.map((patient) => ({
          label: patient.nome,
          value: patient.id,
        }))
      );
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao buscar pacientes. Por favor, tente novamente.',
      });
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/medicos/medicos`);
      const doctorsData = Array.isArray(response.data.data) ? response.data.data : [];
      setDoctors(
        doctorsData.map((doctor) => ({
          label: doctor.usuario,
          value: doctor.id,
        }))
      );
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao buscar médicos. Por favor, tente novamente.',
      });
    }
  };

  const fetchTiposConsulta = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tipos_consulta/lista');
      const tiposData = Array.isArray(response.data) ? response.data : [];
      setTypes(
        tiposData.map((tipo) => ({
          label: tipo.descricao,
          value: tipo.id,
        }))
      );
    } catch (error) {
      console.error('Erro ao buscar tipos de consulta:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao buscar tipos de consulta. Por favor, tente novamente.',
      });
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchTiposConsulta();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSelectChange = (selectedOption, action) => {
    setEvent({ ...event, [action.name]: selectedOption ? selectedOption.value : '' });
  };

  const submitEvent = async () => {
    try {
      await axios.post('http://localhost:5000/consultas/adiciona', {
        titulo: event.title,
        inicio: event.start,
        fim: event.end,
        paciente_id: event.patient,
        medico_id: event.doctor,
        tipo_consulta_id: event.type,
      });
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Consulta agendada com sucesso!',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Erro ao criar consulta:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Ocorreu um erro ao agendar a consulta. Tente novamente.',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitEvent();
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
            value={patients.find((p) => p.value === event.patient) || null}
            onChange={handleSelectChange}
            placeholder="Buscar paciente..."
            isClearable
            classNamePrefix="select"
          />
        </div>
        <div className="mb-3">
          <label>Médico:</label>
          <Select
            name="doctor"
            options={doctors}
            value={doctors.find((d) => d.value === event.doctor) || null}
            onChange={handleSelectChange}
            placeholder="Buscar médico..."
            isClearable
            classNamePrefix="select"
          />
        </div>
        <div className="mb-4">
          <label>Tipo de Consulta:</label>
          <Select
            name="type"
            options={types}
            value={types.find((t) => t.value === event.type) || null}
            onChange={handleSelectChange}
            placeholder="Selecione um Tipo de Consulta"
            isClearable
            classNamePrefix="select"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Agendar
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
