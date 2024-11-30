import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function PreAgenda() {
  const [preAgendas, setPreAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Função para buscar as pré-agendas no backend
  const fetchPreAgendas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pre-agendamentos/listar');
      setPreAgendas(response.data.data); // Assuma que o backend retorna os dados na chave 'data'
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar pré-agendas:', error);
      setLoading(false);
    }
  };

  // Carregar as pré-agendas ao montar o componente
  useEffect(() => {
    fetchPreAgendas();
  }, []);

  // Verifica se o paciente já está cadastrado
  const verificarPaciente = async (cpf) => {
    try {
      const response = await axios.get(`http://localhost:5000/pacientes/cpf/${cpf}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar paciente:', error);
      return { success: false };
    }
  };

  // Função para iniciar o processo de confirmação
  const handleConfirmar = async (preAgenda) => {
    const { cpf, user_id } = preAgenda;

    // Aqui, simulamos que o CPF está relacionado ao usuário na tabela `user`
    try {
      const userResponse = await axios.get(`http://localhost:5000/users/${user_id}`);
      const userCpf = userResponse.data.cpf; // Supondo que o backend retorna o CPF

      const result = await verificarPaciente(userCpf);

      if (result.success) {
        // Paciente encontrado, segue para criação do evento
        navigate('/createEvent', {
          state: {
            paciente: result.data,
            preAgendaId: preAgenda.id,
            cpf: userCpf,
          },
        });
      } else {
        // Paciente não encontrado, mostra SweetAlert
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
      }
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Não foi possível buscar o CPF do usuário.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      });
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Carregando...</div>;
  }

  // Filtrar as pré-agendas pelo status "pendente"
  const preAgendasPendentes = preAgendas.filter((agenda) => agenda.status.toLowerCase() === 'pendente');

  return (
    <div className="container mt-5 p-4">
      <h2 className="text-center mb-4">Pré-Agendas Pendentes</h2>

      {/* Botão Voltar */}
      <div className="d-flex justify-content-start mb-4">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate(-1)}
        >
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
