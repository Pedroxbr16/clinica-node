import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';
import moment from 'moment-timezone'; // Importa o moment-timezone
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CreateEvent.css';

const CreateEventMB = () => {
  const location = useLocation();
  const { state } = location; // Dados enviados da pré-agenda

  const [event, setEvent] = useState({
    title: '',
    start: '', // Será ajustado para o fuso horário
    end: '',   // Será automaticamente 1 hora após o início
    patient: '',
    doctor: '',
    type: '',
    modalidade: '',
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função para formatar a data no formato compatível com o campo datetime-local
  const formatDateForInput = (dateString) => {
    const date = moment(dateString).tz("America/Sao_Paulo", true); // Ajusta para o fuso horário de São Paulo/Rio de Janeiro
    return date.format("YYYY-MM-DDTHH:mm"); // Formato para o input datetime-local
  };

  // Preenche o formulário com os dados da pré-agenda ao montar
  useEffect(() => {
    console.log('Dados recebidos do estado:', state); // Verificar os dados recebidos
    if (state) {
      const startDate = state.dataDesejada ? formatDateForInput(state.dataDesejada) : moment().tz("America/Sao_Paulo").format("YYYY-MM-DDTHH:mm");
      setEvent((prevEvent) => ({
        ...prevEvent,
        start: startDate,
        end: moment(startDate).add(1, 'hours').format("YYYY-MM-DDTHH:mm"), // Fim é 1 hora após o início
        patient: state.paciente?.id || '',
        doctor: state.medicoId || '',
        type: state.tipoConsultaId || '', // Preenchendo o tipo de consulta
        modalidade: state.modalidade || '',
      }));
    }
  }, [state]);

  // Busca os dados necessários (pacientes, médicos, tipos de consulta)
  const fetchData = async () => {
    try {
      const [patientsResponse, doctorsResponse, typesResponse] = await Promise.all([
        axios.get('http://localhost:5000/pacientes/pacientes'),
        axios.get('http://localhost:5000/medicos/medicos'),
        axios.get('http://localhost:5000/tipos_consulta/lista'),
      ]);
  
      setPatients(
        patientsResponse.data.map((patient) => ({
          label: patient.nome,
          value: patient.id,
        }))
      );
  
      const doctorsData = Array.isArray(doctorsResponse.data.data) ? doctorsResponse.data.data : [];
      setDoctors(
        doctorsData.map((doctor) => ({
          label: doctor.usuario, // Nome do médico
          value: doctor.id, // ID do médico
        }))
      );
  
      const typesData = Array.isArray(typesResponse.data) ? typesResponse.data : [];
      setTypes(
        typesData.map((type) => ({
          label: `${type.descricao} - R$ ${parseFloat(type.valor).toFixed(2)}`, // Exibe a descrição com o valor formatado
          value: type.id,
        }))
      );
  
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao buscar dados. Por favor, tente novamente.',
      });
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleSelectChange = (selectedOption, action) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [action.name]: selectedOption ? selectedOption.value : '',
    }));
  };

  const updatePreAgendaStatus = async (preAgendaId) => {
    try {
      await axios.put(`http://localhost:5000/pre-agendamentos/atualizar/${preAgendaId}`, {
        status: 'Concluído',
      });
      console.log(`Pré-agenda com ID ${preAgendaId} atualizada para "Concluído".`);
    } catch (error) {
      console.error('Erro ao atualizar status da pré-agenda:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao atualizar o status da pré-agenda. Por favor, verifique manualmente.',
      });
    }
  };

  const submitEvent = async () => {
    try {
      await axios.post('http://localhost:5000/consultas/adiciona', {
        titulo: event.title,
        inicio: event.start,
        fim: event.end,
        paciente_id: event.patient,
        medico_id: event.doctor,
        tipo_consulta_id: event.type, // Tipo de consulta
        modalidade: event.modalidade,
        pacienteEmail: state.paciente?.email, // Adicione o email do paciente
        pacienteNome: state.paciente?.nome, // Adicione o nome do paciente
    });

      // Atualizar o status da pré-agenda para "Concluído"
      if (state?.preAgendaId) {
        await updatePreAgendaStatus(state.preAgendaId);
      }

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

export default CreateEventMB;
