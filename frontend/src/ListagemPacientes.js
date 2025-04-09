import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './css/listagemPaciente.css';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 4;

  const navigate = useNavigate();

  useEffect(() => {
    const storedPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    setPacientes(storedPacientes);
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedPacientes = pacientes.filter((paciente) => paciente.id !== id);
        setPacientes(updatedPacientes);
        localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
        Swal.fire('Excluído!', 'Paciente foi excluído com sucesso.', 'success');
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/pacientes/editar/${id}`);
  };

  const filteredPacientes = pacientes.filter((paciente) => {
    const searchLower = searchTerm.toLowerCase();
    const nome = paciente.nome?.toLowerCase() || '';
    const cpf = paciente.cpf?.replace(/\D/g, '') || '';
    const email = paciente.email?.toLowerCase() || '';
    return (
      nome.includes(searchLower) ||
      cpf.includes(searchLower.replace(/\D/g, '')) ||
      email.includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredPacientes.length / patientsPerPage);
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPacientes.slice(indexOfFirstPatient, indexOfLastPatient);

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

      {pacientes.length === 0 ? (
        <p>Nenhum paciente cadastrado.</p>
      ) : (
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

          <div className="pagination">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
              Primeira
            </button>
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
              Próxima
            </button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
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
