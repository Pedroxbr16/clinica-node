import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
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

  const fetchLocalData = () => {
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const tipos = JSON.parse(localStorage.getItem('tipos_consulta')) || [];

    setPatients(
      pacientes.map((p) => ({
        label: p.nome,
        value: p.id,
        email: p.email,
        nome: p.nome,
      }))
    );

    setDoctors(
      medicos.map((d) => ({
        label: d.usuario,
        value: d.id,
      }))
    );

    setTypes(
      tipos.map((t) => ({
        label: `${t.descricao} - R$ ${parseFloat(t.valor).toFixed(2)}`,
        value: t.id,
      }))
    );

    setIsLoading(false);
  };

  useEffect(() => {
    fetchLocalData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSelectChange = (selectedOption, action) => {
    setEvent({ ...event, [action.name]: selectedOption ? selectedOption.value : '' });
  };

  const submitEvent = () => {
    const selectedPatient = patients.find((p) => p.value === event.patient);
    const pacienteEmail = selectedPatient?.email || '';
    const pacienteNome = selectedPatient?.nome || '';

    const payload = {
      id: Date.now(),
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

    const stored = JSON.parse(localStorage.getItem('consultas')) || [];
    stored.push(payload);
    localStorage.setItem('consultas', JSON.stringify(stored));

    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: 'Consulta agendada com sucesso!',
    });

    setEvent({
      title: '',
      start: moment().tz("America/Sao_Paulo").format("YYYY-MM-DDTHH:mm"),
      end: moment().tz("America/Sao_Paulo").add(1, 'hours').format("YYYY-MM-DDTHH:mm"),
      patient: '',
      doctor: '',
      type: '',
      modalidade: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!event.patient || !event.doctor || !event.type || !event.modalidade) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios',
        text: 'Preencha todos os campos antes de agendar.',
      });
      return;
    }

    submitEvent();
  };

  if (isLoading) return <div className="text-center mt-5">Carregando dados...</div>;

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
          />
        </div>

        <div className="mb-4">
          <label>Modalidade:</label>
          <Select
            name="modalidade"
            options={[
              { label: 'Presencial', value: 'Presencial' },
              { label: 'Online', value: 'Online' },
            ]}
            value={event.modalidade ? { label: event.modalidade, value: event.modalidade } : null}
            onChange={(selectedOption) =>
              setEvent((prev) => ({
                ...prev,
                modalidade: selectedOption ? selectedOption.value : '',
              }))
            }
            placeholder="Selecione a modalidade"
            isClearable
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
