import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2'; // Importa o SweetAlert2
import moment from 'moment-timezone'; // Importa o moment-timezone
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CreateEvent.css';

const CreateEvent = () => {
  const [event, setEvent] = useState({
    title: '',
    start: moment().tz("America/Sao_Paulo").format("YYYY-MM-DDTHH:mm"),
    end: moment().tz("America/Sao_Paulo").add(1, 'hours').format("YYYY-MM-DDTHH:mm"),
    patient: '',
    doctor: '',
    type: '',
    modalidade: '',
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pacientes/pacientes`);
      setPatients(
        response.data.map((patient) => ({
          label: patient.nome,
          value: patient.id,
          email: patient.email,
          nome: patient.nome,
        }))
      );
    } catch (error) {
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
      setDoctors(
        response.data.data.map((doctor) => ({
          label: doctor.usuario,
          value: doctor.id,
        }))
      );
    } catch (error) {
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
      setTypes(
        response.data.map((tipo) => ({
          label: `${tipo.descricao} - R$ ${parseFloat(tipo.valor).toFixed(2)}`,
          value: tipo.id,
        }))
      );
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao buscar tipos de consulta. Por favor, tente novamente.',
      });
    } finally {
      setIsLoading(false);
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
      const selectedPatient = patients.find((p) => p.value === event.patient);
      const pacienteEmail = selectedPatient?.email || '';
      const pacienteNome = selectedPatient?.nome || '';

      const payload = {
        titulo: event.title,
        inicio: event.start,
        fim: event.end,
        paciente_id: event.patient,
        medico_id: event.doctor,
        tipo_consulta_id: event.type,
        modalidade: event.modalidade,
        pacienteEmail,
        pacienteNome,
      };

      console.log('Enviando dados para criação de consulta:', payload);

      await axios.post('http://localhost:5000/consultas/adiciona', payload);

      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Consulta agendada com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao criar consulta:', error.response?.data || error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error.response?.data?.error || 'Erro ao agendar a consulta. Tente novamente.',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!event.patient) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Por favor, selecione um paciente.',
      });
      return;
    }
    if (!event.doctor) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Por favor, selecione um médico.',
      });
      return;
    }
    submitEvent();
  };

  if (isLoading) {
    return <div className="text-center mt-5">Carregando dados...</div>;
  }

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
        <div className="mb-3">
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
        <div className="mb-4">
          <label>Modalidade:</label>
          <Select
            name="modalidade"
            options={[{ label: 'Presencial', value: 'Presencial' }, { label: 'Online', value: 'Online' }]}
            value={event.modalidade ? { label: event.modalidade, value: event.modalidade } : null}
            onChange={(selectedOption) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                modalidade: selectedOption ? selectedOption.value : '',
              }))
            }
            placeholder="Selecione a modalidade"
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
