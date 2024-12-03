import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/listagemPaciente.css';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const patientsPerPage = 4; // Número de pacientes por página

  const navigate = useNavigate(); // Hook para redirecionamento

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pacientes/pacientes');
        setPacientes(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar pacientes:', err);
        setError('Erro ao buscar pacientes. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/pacientes/${id}`);
          setPacientes((prevPacientes) =>
            prevPacientes.filter((paciente) => paciente.id !== id)
          );
          Swal.fire('Excluído!', 'Paciente foi excluído com sucesso.', 'success');
        } catch (err) {
          console.error('Erro ao excluir paciente:', err);
          Swal.fire('Erro!', 'Erro ao excluir paciente. Por favor, tente novamente.', 'error');
        }
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/pacientes/editar/${id}`); // Redireciona para a tela de edição com o ID do paciente
  };

  // Função de filtro aprimorada
  const filteredPacientes = pacientes.filter((paciente) => {
    const searchLower = searchTerm.toLowerCase();

    // Verifica nome, CPF e e-mail
    const nome = paciente.nome.toLowerCase();
    const cpf = paciente.cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    const email = paciente.email.toLowerCase();

    return (
      nome.includes(searchLower) || 
      cpf.includes(searchLower.replace(/\D/g, '')) || // Remover caracteres não numéricos para CPF
      email.includes(searchLower)
    );
  });

  // Paginação
  const totalPages = Math.ceil(filteredPacientes.length / patientsPerPage);
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPacientes.slice(indexOfFirstPatient, indexOfLastPatient);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleFirstPage = () => {
    setCurrentPage(1); // Vai para a primeira página
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages); // Vai para a última página
  };

  return (
    <div className="container">
      <h2>Pacientes Cadastrados</h2>

      <input
        type="text"
        placeholder="Buscar por nome, CPF ou e-mail..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {loading && <p>Carregando pacientes...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Celular</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.length > 0 ? (
                currentPatients.map((paciente) => (
                  <tr key={paciente.id}>
                    <td>{paciente.nome}</td>
                    <td>{formatCPF(paciente.cpf)}</td>
                    <td>{paciente.email}</td>
                    <td>{formatTelefone(paciente.celular)}</td>
                    <td>
                      <button onClick={() => handleEdit(paciente.id)} className="edit-button">
                        Editar
                      </button>
                      <button onClick={() => handleDelete(paciente.id)} className="delete-button">
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Nenhum paciente encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Paginação */}
          <div className="pagination">
            <button onClick={handleFirstPage} disabled={currentPage === 1}>
              Primeira
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Próxima
            </button>
            <button onClick={handleLastPage} disabled={currentPage === totalPages}>
              Última
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const formatCPF = (cpf) => {
  if (!cpf) return '';
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formatTelefone = (telefone) => {
  if (!telefone) return '';
  return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export default Pacientes;
