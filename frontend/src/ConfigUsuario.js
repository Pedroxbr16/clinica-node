import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Usuario = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = () => {
    const data = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      const novosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
      localStorage.setItem('usuarios', JSON.stringify(novosUsuarios));
      setUsuarios(novosUsuarios);
      alert('Usuário excluído com sucesso!');
    }
  };

  const handleEdit = (id) => {
    navigate(`/usuarios/editar/${id}`);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="container mt-5 p-4">
      <h2 className="text-center mb-4">Usuários Existentes</h2>

      <div className="d-flex justify-content-between mb-4">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
        <button
          className="btn btn-primary"
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
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => handleEdit(usuario.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => handleDelete(usuario.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuario;
