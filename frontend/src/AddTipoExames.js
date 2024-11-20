import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importando SweetAlert2
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/TipoExame.css'; // Certifique-se de adicionar estilos específicos

const Exame = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [exames, setExames] = useState([]);

  const fetchExames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/exames/exames');
      setExames(response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao buscar exames.',
        customClass: {
          popup: 'swal-modal',
        },
      });
    }
  };

  const handleAddExame = async () => {
    if (nome.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'O nome do exame é obrigatório.',
        customClass: {
          popup: 'swal-modal',
        },
      });
      return;
    }
    try {
      await axios.post('http://localhost:5000/exames/exames', { nome });
      setNome('');
      fetchExames();
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Exame adicionado com sucesso!',
        customClass: {
          popup: 'swal-modal',
        },
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao adicionar exame.',
        customClass: {
          popup: 'swal-modal',
        },
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
      customClass: {
        popup: 'swal-modal',
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/exames/exames/${id}`);
        fetchExames();
        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          text: 'Exame excluído com sucesso.',
          customClass: {
            popup: 'swal-modal',
          },
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao excluir exame.',
          customClass: {
            popup: 'swal-modal',
          },
        });
      }
    }
  };

  const handleEdit = async (id) => {
    const { value: newNome } = await Swal.fire({
      title: 'Editar Exame',
      input: 'text',
      inputLabel: 'Novo nome do exame',
      inputValue: '',
      showCancelButton: true,
      customClass: {
        popup: 'swal-modal',
        input: 'swal-input',
      },
      inputValidator: (value) => {
        if (!value || value.trim() === '') {
          return 'O nome do exame é obrigatório!';
        }
      },
    });

    if (newNome) {
      try {
        await axios.put(`http://localhost:5000/exames/exames/${id}`, { nome: newNome });
        fetchExames();
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Exame atualizado com sucesso!',
          customClass: {
            popup: 'swal-modal',
          },
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao editar exame.',
          customClass: {
            popup: 'swal-modal',
          },
        });
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
