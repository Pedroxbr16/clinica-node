import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [funcao, setFuncao] = useState('');

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = usuarios.find((u) => String(u.id) === id);
    if (!user) {
      Swal.fire('Erro', 'Usuário não encontrado.', 'error');
      return;
    }

    setUsuario(user.usuario);
    setEmail(user.email);
    setFuncao(user.funcao);
    setSenha(''); // mantém senha em branco
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const updatedUsuarios = usuarios.map((u) => {
      if (String(u.id) === id) {
        return {
          ...u,
          usuario,
          email,
          funcao,
          senha: senha || u.senha, // mantém senha anterior se campo estiver em branco
        };
      }
      return u;
    });

    localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));

    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: 'Usuário atualizado com sucesso!',
    }).then(() => {
      navigate('/usuarios');
    });
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100">
      <div className="register-container bg-light p-4 shadow-sm rounded">
        <div className="d-flex align-items-center mb-4">
          <button className="btn btn-secondary btn-sm me-3" onClick={() => navigate(-1)}>
            Voltar
          </button>
          <h2 className="flex-grow-1 text-center mb-0">Editar Usuário</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              className="form-control"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Deixe em branco para manter a atual"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="funcao">Função</label>
            <select
              id="funcao"
              className="form-control"
              value={funcao}
              onChange={(e) => setFuncao(e.target.value)}
              required
            >
              <option value="" disabled>Selecione a função</option>
              <option value="medico">Médico</option>
              <option value="atendente">Atendente</option>
              <option value="adm">ADM</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
}

export default EditUsuario;
