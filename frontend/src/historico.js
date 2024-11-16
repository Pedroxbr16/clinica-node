import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/historico.css';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 4;

  const navigate = useNavigate();

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

  const handleViewHistory = (id) => {
    navigate(`/pacientes/${id}/historico/novo`);
  };

  const handleCreateHistory = (id) => {
    navigate(`/pacientes/${id}/historico`);
  };

  const filteredPacientes = pacientes.filter((paciente) => {
    const searchLower = searchTerm.toLowerCase();
    return paciente.nome.toLowerCase().includes(searchLower);
  });

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
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="container">
      <h2>Histórico dos Pacientes</h2>

      <input
        type="text"
        placeholder="Buscar por nome..."
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
                <th>Data de Nascimento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.length > 0 ? (
                currentPatients.map((paciente) => (
                  <tr key={paciente.id}>
                    <td>{paciente.nome}</td>
                    <td>{formatDate(paciente.nascimento)}</td>
                    <td>
                      <button
                        onClick={() => handleViewHistory(paciente.id)}
                        className="view-history-button"
                      >
                        Visualizar Histórico
                      </button>
                      <button
                        onClick={() => handleCreateHistory(paciente.id)}
                        className="create-history-button"
                      >
                        Criar Histórico
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Nenhum paciente encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={handleFirstPage} disabled={currentPage === 1}>
              Primeira
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
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

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default Pacientes;
