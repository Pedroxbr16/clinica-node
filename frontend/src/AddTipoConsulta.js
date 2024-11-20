import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importando SweetAlert2
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/TipoConsulta.css';

const TipoConsulta = () => {
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState('');
  const [tiposConsulta, setTiposConsulta] = useState([]);

  const fetchTiposConsulta = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tipos_consulta/lista');
      setTiposConsulta(response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao buscar tipos de consulta.',
      });
    }
  };

  const handleAddTipoConsulta = async () => {
    if (descricao.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'A descrição é obrigatória.',
      });
      return;
    }
    try {
      await axios.post('http://localhost:5000/tipos_consulta/adiciona', { descricao });
      setDescricao('');
      fetchTiposConsulta();
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Tipo de consulta adicionado com sucesso!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao adicionar tipo de consulta.',
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá desfazer esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/tipos_consulta/${id}`);
        fetchTiposConsulta();
        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          text: 'Tipo de consulta excluído com sucesso.',
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao excluir tipo de consulta.',
        });
      }
    }
  };

  const handleEdit = async (id) => {
    const { value: newDescricao } = await Swal.fire({
      title: 'Editar Tipo de Consulta',
      input: 'text',
      inputLabel: 'Nova descrição',
      inputValue: '',
      showCancelButton: true,
      customClass: {
        popup: 'swal-modal',
        input: 'swal-input',
      },
      inputValidator: (value) => {
        if (!value || value.trim() === '') {
          return 'A descrição é obrigatória!';
        }
      },
    });
    

    if (newDescricao) {
      try {
        await axios.put(`http://localhost:5000/tipos_consulta/${id}`, { descricao: newDescricao });
        fetchTiposConsulta();
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Tipo de consulta atualizado com sucesso!',
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao editar tipo de consulta.',
        });
      }
    }
  };

  useEffect(() => {
    fetchTiposConsulta();
  }, []);

  return (
    <div className="container tipo-consulta-container mt-5 p-4">
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>

      <h2 className="text-center mb-4">Adicionar Tipo de Consulta</h2>
      <div className="form-group">
        <label htmlFor="descricao">Descrição:</label>
        <input
          type="text"
          id="descricao"
          className="form-control"
          placeholder="Digite o tipo de consulta"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary w-100 my-3"
        onClick={handleAddTipoConsulta}
      >
        Adicionar
      </button>

      <h3 className="text-center mb-3">Tipos de Consulta Existentes</h3>
      <div className="tipo-consulta-list table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th style={{ position: 'sticky', top: 0 }}>ID</th>
              <th style={{ position: 'sticky', top: 0 }}>Descrição</th>
              <th style={{ position: 'sticky', top: 0 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tiposConsulta.length > 0 ? (
              tiposConsulta.map((tipo) => (
                <tr key={tipo.id}>
                  <td>{tipo.id}</td>
                  <td>{tipo.descricao}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => handleEdit(tipo.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => handleDelete(tipo.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  Nenhum tipo de consulta encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TipoConsulta;
