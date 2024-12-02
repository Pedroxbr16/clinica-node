import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MedicoList = () => {
  const navigate = useNavigate();
  const [medicos, setMedicos] = useState([]);

  // Função para buscar médicos
  const fetchMedicos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/medicos/medicos');
      const medicosData = Array.isArray(response.data.data) ? response.data.data : [];
      setMedicos(medicosData);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
    }
  };

  // Função para excluir médico
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este médico?')) {
      try {
        await axios.delete(`http://localhost:5000/medicos/${id}`);
        fetchMedicos();
        alert('Médico excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir médico:', error);
        alert('Erro ao excluir médico.');
      }
    }
  };

  // Função para redirecionar para a edição do médico
  const handleEdit = (id) => {
    navigate(`/medicos/editar/${id}`);
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  return (
    <div className="container medico-container mt-5 p-4">
      {/* Título acima dos botões */}
      <h3 className="text-center mb-4">Lista de Médicos</h3>

      {/* Botões de Voltar e Adicionar na mesma linha */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/register/medico')}
        >
          Adicionar Novo Médico
        </button>
      </div>

      <div className="medico-list table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th style={{ position: 'sticky', top: 0 }}>ID</th>
              <th style={{ position: 'sticky', top: 0 }}>Nome</th>
              <th style={{ position: 'sticky', top: 0 }}>CRM</th>
              <th style={{ position: 'sticky', top: 0 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {medicos.length > 0 ? (
              medicos.map((medico) => (
                <tr key={medico.id}>
                  <td>{medico.id}</td>
                  <td>{medico.usuario}</td>
                  <td>{medico.crm}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => handleEdit(medico.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => handleDelete(medico.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Nenhum médico encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicoList;