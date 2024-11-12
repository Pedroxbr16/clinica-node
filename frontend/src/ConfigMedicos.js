import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Medico = () => {
  const navigate = useNavigate();
  const [medicos, setMedicos] = useState([]);

  const fetchMedicos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/medicos/medicos');
      setMedicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este médico?')) {
      try {
        await axios.delete(`http://localhost:5000/medicos/medicos/${id}`);
        fetchMedicos();
        alert('Médico excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir médico:', error);
        alert('Erro ao excluir médico.');
      }
    }
  };

  const handleEdit = async (id) => {
    const newNome = window.prompt('Digite o novo nome do médico:');
    if (newNome && newNome.trim() !== '') {
      try {
        await axios.put(`http://localhost:5000/medicos/medicos/${id}`, { nome: newNome });
        fetchMedicos();
        alert('Médico atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao editar médico:', error);
        alert('Erro ao editar médico.');
      }
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  return (
    <div className="container mt-5 p-4">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>Voltar</button>

      <h2 className="text-center mb-4">Médicos Existentes</h2>
      <button
        className="btn btn-primary w-100 my-3"
        onClick={() => navigate('/register/medico')}
      >
        Adicionar Médico
      </button>

      <h3 className="text-center mb-3">Lista de Médicos</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {medicos.length > 0 ? (
              medicos.map((medico) => (
                <tr key={medico.id}>
                  <td>{medico.id}</td>
                  <td>{medico.nome}</td>
                  <td>
                    <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEdit(medico.id)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(medico.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">Nenhum médico encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medico;
