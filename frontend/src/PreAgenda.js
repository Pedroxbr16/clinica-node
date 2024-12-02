import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function PreAgenda() {
  const [preAgendas, setPreAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPreAgendas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pre-agendamentos/listar');
      console.log('Resposta da API de pré-agendas:', response.data.data); // Log para verificar os dados
      setPreAgendas(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar pré-agendas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreAgendas();
  }, []);

  const handleConfirmar = async (preAgenda) => {
    const { user_id } = preAgenda;

    try {
      const userResponse = await axios.get(`http://localhost:5000/user/buscar/${user_id}`);
      console.log('Resposta do backend para /user/buscar:', userResponse.data);

      const userCpf = userResponse.data.cpf;

      // Verifique se o paciente existe
      const pacienteResponse = await axios.get(`http://localhost:5000/pacientes/pacientes/cpf/${userCpf}`);
      console.log('Paciente encontrado:', pacienteResponse.data);

      // Navegar para o CreateEventMB com todos os dados necessários
      console.log('Objeto preAgenda:', preAgenda); // Log para verificar medico_id
      navigate('/createEventMB', {
        state: {
          paciente: pacienteResponse.data, // Dados do paciente
          preAgendaId: preAgenda.id,
          cpf: userCpf,
          dataDesejada: preAgenda.data_desejada, // Data desejada
          modalidade: preAgenda.modalidade, // Modalidade
          medicoId: preAgenda.medico_id || '', // Médico associado
        },
      });
      
    } catch (error) {
      console.error('Erro ao confirmar pré-agenda:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Não foi possível buscar informações da pré-agenda.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Carregando...</div>;
  }

  const preAgendasPendentes = preAgendas.filter((agenda) => agenda.status.toLowerCase() === 'pendente');

  return (
    <div className="container mt-5 p-4">
      <h2 className="text-center mb-4">Pré-Agendas Pendentes</h2>
      <div className="d-flex justify-content-start mb-4">
        <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>

      {preAgendasPendentes.length === 0 ? (
        <p className="text-center">Nenhuma pré-agenda pendente disponível no momento.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Celular</th>
                <th>Modalidade</th>
                <th>Data Desejada</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {preAgendasPendentes.map((preAgenda) => (
                <tr key={preAgenda.id}>
                  <td>{preAgenda.nome || 'Nome não informado'}</td>
                  <td>{preAgenda.telefone}</td>
                  <td>{preAgenda.modalidade}</td>
                  <td>{new Date(preAgenda.data_desejada).toLocaleString()}</td>
                  <td>{preAgenda.status}</td>
                  <td>
                    <button
                      onClick={() => handleConfirmar(preAgenda)}
                      className="btn btn-primary btn-sm mx-1"
                    >
                      Confirmar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PreAgenda;
