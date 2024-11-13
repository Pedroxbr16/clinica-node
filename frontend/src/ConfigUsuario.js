import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Usuario = () => {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/atendente/atendente');
      console.log(response.data);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setUsuarios([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await axios.delete(`http://localhost:5000/atendente/atendente/${id}`);
        fetchUsuarios();
        alert('Usuário excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        alert('Erro ao excluir usuário.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/usuarios/editar/${id}`); // Redireciona para a rota de edição de usuário
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="container mt-5 p-4">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>Voltar</button>

      <h2 className="text-center mb-4">Usuários Existentes</h2>

      {/* Botão para redirecionar para a página de registro de usuário */}
      <div className="form-group text-center">
        <button 
          className="btn btn-primary w-100 my-3" 
          onClick={() => navigate('/register/usuario')}
        >
          Adicionar Novo Usuário
        </button>
      </div>

      <h3 className="text-center mb-3">Usuários</h3>
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
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.usuario}</td>
                  <td>
                    <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEdit(usuario.id)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(usuario.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">Nenhum usuário encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuario;
