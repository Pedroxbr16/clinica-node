import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function PreAgenda() {
  const [preAgendas, setPreAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('Pendente'); // Filtro por status
  const navigate = useNavigate();

  const fetchPreAgendas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pre-agendamentos/listar');
      console.log('Resposta da API de pré-agendas:', response.data.data);
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
    const { user_id, tipo_consulta_id } = preAgenda; // Adicionado tipo_consulta_id
    
    try {
      const userResponse = await axios.get(`http://localhost:5000/user/buscar/${user_id}`);
      console.log('Resposta do backend para /user/buscar:', userResponse.data);
  
      const userCpf = userResponse.data.cpf;
  
      // Verifica se o paciente existe
      try {
        const pacienteResponse = await axios.get(`http://localhost:5000/pacientes/pacientes/cpf/${userCpf}`);
        console.log('Paciente encontrado:', pacienteResponse.data);
  
        // Navegar para o CreateEventMB com os dados do paciente e o tipo de consulta
        console.log('Objeto preAgenda:', preAgenda);
        navigate('/createEventMB', {
          state: {
            paciente: pacienteResponse.data,
            preAgendaId: preAgenda.id,
            cpf: userCpf,
            dataDesejada: preAgenda.data_desejada,
            modalidade: preAgenda.modalidade,
            medicoId: preAgenda.medico_id || '',
            tipoConsultaId: tipo_consulta_id, // Adicionado o tipo de consulta
          },
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn('Paciente não encontrado. Exibindo modal de cadastro...');
          // Exibe alerta para cadastrar o paciente
          Swal.fire({
            title: 'Paciente não cadastrado',
            text: 'Deseja ir para a página de cadastro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, cadastrar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/cadastroMB', {
                state: {
                  preAgendaId: preAgenda.id,
                  nome: preAgenda.nome,
                  email: preAgenda.email,
                  telefone: preAgenda.telefone,
                  cpf: userCpf,
                },
              });
            }
          });
        } else {
          console.error('Erro ao verificar paciente:', error);
          Swal.fire({
            title: 'Erro',
            text: 'Não foi possível verificar as informações do paciente.',
            icon: 'error',
            confirmButtonText: 'Fechar',
          });
        }
      }
    } catch (error) {
      console.error('Erro ao confirmar pré-agenda:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Não foi possível buscar informações do usuário.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
    }
  };

  const handleCancelar = async (preAgendaId) => {
    try {
      await axios.put(`http://localhost:5000/pre-agendamentos/atualizar/${preAgendaId}`, {
        status: 'Cancelado',
      });
      Swal.fire({
        icon: 'success',
        title: 'Cancelado',
        text: 'Pré-agendamento cancelado com sucesso!',
        confirmButtonText: 'OK',
      });
      fetchPreAgendas(); // Atualiza a lista de pré-agendas
    } catch (error) {
      console.error('Erro ao cancelar pré-agenda:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Não foi possível cancelar a pré-agenda.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Carregando...</div>;
  }

  // Filtra as pré-agendas com base no status selecionado
  const filteredPreAgendas = preAgendas.filter((agenda) =>
    agenda.status.toLowerCase() === filterStatus.toLowerCase()
  );

  return (
    <div className="container mt-5 p-4">
      <h2 className="text-center mb-4">Pré-Agendas</h2>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)}>
          Voltar
        </button>
        <div className="d-flex align-items-center">
          <label htmlFor="filterStatus" className="me-2">
            Filtrar por status:
          </label>
          <select
            id="filterStatus"
            className="form-select form-select-sm"
            style={{ width: '200px' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Pendente">Pendente</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      {filteredPreAgendas.length === 0 ? (
        <p className="text-center">Nenhuma pré-agenda disponível com o status selecionado.</p>
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
              {filteredPreAgendas.map((preAgenda) => (
                <tr key={preAgenda.id}>
                  <td>{preAgenda.nome || 'Nome não informado'}</td>
                  <td>{preAgenda.telefone}</td>
                  <td>{preAgenda.modalidade}</td>
                  <td>{new Date(preAgenda.data_desejada).toLocaleString()}</td>
                  <td>{preAgenda.status}</td>
                  <td>
                    {preAgenda.status.toLowerCase() === 'pendente' && (
                      <>
                        <button
                          onClick={() => handleConfirmar(preAgenda)}
                          className="btn btn-primary btn-sm mx-1"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => handleCancelar(preAgenda.id)}
                          className="btn btn-danger btn-sm mx-1"
                        >
                          Cancelar
                        </button>
                      </>
                    )}
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
