import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MedicoList = () => {
  const navigate = useNavigate();
  const [medicos, setMedicos] = useState([]);

  // Busca os médicos no localStorage
  const fetchMedicos = () => {
    const data = JSON.parse(localStorage.getItem('medicos')) || [];
    setMedicos(data);
  };

  // Exclui médico pelo ID
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este médico?')) {
      const novosMedicos = medicos.filter((m) => m.id !== id);
      localStorage.setItem('medicos', JSON.stringify(novosMedicos));
      setMedicos(novosMedicos);
      alert('Médico excluído com sucesso!');
    }
  };

  const handleEdit = (id) => {
    navigate(`/medicos/editar/${id}`);
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  return (
    <div className="container medico-container mt-5 p-4">
      <h3 className="text-center mb-4">Lista de Médicos</h3>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)}>
          Voltar
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/register/medico')}>
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
                <td colSpan="4" className="text-center">Nenhum médico encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicoList;
