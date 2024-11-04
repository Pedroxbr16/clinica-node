import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/listagemPaciente.css';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este paciente?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/pacientes/${id}`);
        setPacientes(prevPacientes => prevPacientes.filter(paciente => paciente.id !== id));
      } catch (err) {
        console.error('Erro ao excluir paciente:', err);
        setError('Erro ao excluir paciente. Por favor, tente novamente.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/pacientes/editar/${id}`); // Redireciona para a tela de edição com o ID do paciente
  };

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Pacientes Cadastrados</h2>

      <input
        type="text"
        placeholder="Buscar paciente..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {loading && <p>Carregando pacientes...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
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
            {filteredPacientes.length > 0 ? (
              filteredPacientes.map((paciente) => (
                <tr key={paciente.id}>
                  <td>{paciente.nome}</td>
                  <td>{formatCPF(paciente.cpf)}</td>
                  <td>{paciente.email}</td>
                  <td>{formatTelefone(paciente.celular)}</td>
                  <td>
                    <button onClick={() => handleEdit(paciente.id)} className="edit-button">Editar</button>
                    <button onClick={() => handleDelete(paciente.id)} className="delete-button">Excluir</button>
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
