import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [searchTermPatient, setSearchTermPatient] = useState('');
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [searchTermDoctor, setSearchTermDoctor] = useState('');
  const [showDoctorSuggestions, setShowDoctorSuggestions] = useState(false);

  // Função para buscar pacientes com base no termo de pesquisa
  const fetchPatients = async (search = '') => {
    try {
      const response = await axios.get(`http://localhost:5000/pacientes/pacientes?search=${search}`);
      setPatients(response.data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  };

  // Função para buscar médicos com base no termo de pesquisa
  const fetchDoctors = async (search = '') => {
    try {
      const response = await axios.get(`http://localhost:5000/medicos/medicos?search=${search}`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
    }
  };

  // useEffect para atualizar a lista de pacientes conforme o usuário digita
  useEffect(() => {
    if (searchTermPatient) {
      fetchPatients(searchTermPatient);
      setShowPatientSuggestions(true);
    } else {
      setPatients([]);
      setShowPatientSuggestions(false);
    }
  }, [searchTermPatient]);

  // useEffect para atualizar a lista de médicos conforme o usuário digita
  useEffect(() => {
    if (searchTermDoctor) {
      fetchDoctors(searchTermDoctor);
      setShowDoctorSuggestions(true);
    } else {
      setDoctors([]);
      setShowDoctorSuggestions(false);
    }
  }, [searchTermDoctor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handlePatientSearchChange = (e) => {
    setSearchTermPatient(e.target.value);
    setEvent({ ...event, patient: e.target.value });
  };

  const handleDoctorSearchChange = (e) => {
    setSearchTermDoctor(e.target.value);
    setEvent({ ...event, doctor: e.target.value });
  };

  const handlePatientSuggestionClick = (patientName) => {
    setEvent({ ...event, patient: patientName });
    setSearchTermPatient(patientName);
    setShowPatientSuggestions(false);
  };

  const handleDoctorSuggestionClick = (doctorName) => {
    setEvent({ ...event, doctor: doctorName });
    setSearchTermDoctor(doctorName);
    setShowDoctorSuggestions(false);
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
        <div className="mb-3 position-relative">
          <label>Paciente:</label>
          <input
            type="text"
            name="patient"
            className="form-control"
            placeholder="Buscar paciente..."
            value={searchTermPatient}
            onChange={handlePatientSearchChange}
            onFocus={() => setShowPatientSuggestions(true)}
            onBlur={() => setTimeout(() => setShowPatientSuggestions(false), 200)}
            required
          />
          {showPatientSuggestions && patients.length > 0 && (
            <ul className="list-group position-absolute w-100 mt-1">
              {patients.map((patient) => (
                <li
                  key={patient.id}
                  className="list-group-item list-group-item-action"
                  onMouseDown={() => handlePatientSuggestionClick(patient.nome)}
                >
                  {patient.nome}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-3 position-relative">
          <label>Médico:</label>
          <input
            type="text"
            name="doctor"
            className="form-control"
            placeholder="Buscar médico..."
            value={searchTermDoctor}
            onChange={handleDoctorSearchChange}
            onFocus={() => setShowDoctorSuggestions(true)}
            onBlur={() => setTimeout(() => setShowDoctorSuggestions(false), 200)}
            required
          />
          {showDoctorSuggestions && doctors.length > 0 && (
            <ul className="list-group position-absolute w-100 mt-1">
              {doctors.map((doctor) => (
                <li
                  key={doctor.id}
                  className="list-group-item list-group-item-action"
                  onMouseDown={() => handleDoctorSuggestionClick(doctor.nome)}
                >
                  {doctor.nome}
                </li>
              ))}
            </ul>
          )}
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
