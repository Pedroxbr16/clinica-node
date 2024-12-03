import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importando SweetAlert2
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/TipoConsulta.css';

const TipoConsulta = () => {
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(''); // Novo campo valor
  const [tiposConsulta, setTiposConsulta] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  const fetchTiposConsulta = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/tipos_consulta/lista');
      setTiposConsulta(response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao buscar tipos de consulta.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTipoConsulta = async () => {
    const numericValor = parseFloat(valor).toFixed(2); // Converte para decimal com 2 casas decimais
  
    if (descricao.trim() === '' || isNaN(numericValor)) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Descrição e valor são obrigatórios, e o valor deve ser um número válido.',
      });
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/tipos_consulta/adiciona', {
        descricao,
        valor: numericValor, // Valor como decimal
      });
      setDescricao('');
      setValor('');
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
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = async (id, currentDescricao, currentValor) => {
    const { value: newDescricao } = await Swal.fire({
      title: 'Editar Tipo de Consulta',
      input: 'text',
      inputLabel: 'Nova descrição',
      inputValue: currentDescricao,
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
      const { value: newValor } = await Swal.fire({
        title: 'Editar Valor',
        input: 'text',
        inputLabel: 'Novo valor',
        inputValue: currentValor,
        showCancelButton: true,
        customClass: {
          popup: 'swal-modal',
          input: 'swal-input',
        },
        inputValidator: (value) => {
          if (!value || isNaN(parseFloat(value))) {
            return 'O valor deve ser numérico!';
          }
        },
      });

      if (newValor) {
        try {
          setLoading(true);
          await axios.put(`http://localhost:5000/tipos_consulta/${id}`, {
            descricao: newDescricao,
            valor: parseFloat(newValor),
          });
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
        } finally {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    fetchTiposConsulta();
  }, []);

  return (
    <div className="container tipo-consulta-container mt-5 p-4">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
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
      <div className="form-group">
        <label htmlFor="valor">Valor:</label>
        <input
          type="text"
          id="valor"
          className="form-control"
          placeholder="Digite o valor da consulta (Ex.: 150.00)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary w-100 my-3"
        onClick={handleAddTipoConsulta}
        disabled={loading}
      >
        {loading ? 'Carregando...' : 'Adicionar'}
      </button>

      <h3 className="text-center mb-3">Tipos de Consulta Existentes</h3>
      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        <div className="tipo-consulta-list table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th style={{ position: 'sticky', top: 0 }}>ID</th>
                <th style={{ position: 'sticky', top: 0 }}>Descrição</th>
                <th style={{ position: 'sticky', top: 0 }}>Valor</th>
                <th style={{ position: 'sticky', top: 0 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
  {tiposConsulta.length > 0 ? (
    tiposConsulta.map((tipo) => (
      <tr key={tipo.id}>
        <td>{tipo.id}</td>
        <td>{tipo.descricao}</td>
        <td>{Number(tipo.valor) ? Number(tipo.valor).toFixed(2) : 'N/A'}</td> {/* Conversão segura */}
        <td>
          <button
            className="btn btn-warning btn-sm mx-1"
            onClick={() => handleEdit(tipo.id, tipo.descricao, tipo.valor)}
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
      <td colSpan="4" className="text-center">
        Nenhum tipo de consulta encontrado.
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default TipoConsulta;
