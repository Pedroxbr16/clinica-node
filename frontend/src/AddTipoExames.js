import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Exame = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [exames, setExames] = useState([]);

  const fetchExames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/exames/exames');
      setExames(response.data);
    } catch (error) {
      console.error('Erro ao buscar exames:', error);
    }
  };

  const handleAddExame = async () => {
    if (nome.trim() === '') {
      alert('O nome do exame é obrigatório.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/exames/exames', { nome });
      setNome('');
      fetchExames();
      alert('Exame adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar exame:', error);
      alert('Erro ao adicionar exame.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este exame?')) {
      try {
        await axios.delete(`http://localhost:5000/exames/exames/${id}`);
        fetchExames();
        alert('Exame excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir exame:', error);
        alert('Erro ao excluir exame.');
      }
    }
  };

  const handleEdit = async (id) => {
    const newNome = window.prompt('Digite o novo nome do exame:');
    if (newNome && newNome.trim() !== '') {
      try {
        await axios.put(`http://localhost:5000/exames/exames/${id}`, { nome: newNome });
        fetchExames();
        alert('Exame atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao editar exame:', error);
        alert('Erro ao editar exame.');
      }
    }
  };

  useEffect(() => {
    fetchExames();
  }, []);

  return (
    <div className="container exame-container mt-5 p-4">
      {/* Botão de Voltar */}
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>

      <h2 className="text-center mb-4">Adicionar Exame</h2>
      <div className="form-group">
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          className="form-control"
          placeholder="Digite o nome do exame"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary w-100 my-3"
        onClick={handleAddExame}
      >
        Adicionar
      </button>

      <h3 className="text-center mb-3">Exames Existentes</h3>
      <div className="exame-list table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th style={{ position: 'sticky', top: 0 }}>ID</th>
              <th style={{ position: 'sticky', top: 0 }}>Nome</th>
              <th style={{ position: 'sticky', top: 0 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {exames.length > 0 ? (
              exames.map((exame) => (
                <tr key={exame.id}>
                  <td>{exame.id}</td>
                  <td>{exame.nome}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => handleEdit(exame.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => handleDelete(exame.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  Nenhum exame encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Exame;
