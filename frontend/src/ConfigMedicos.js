import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !senha) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios',
        text: 'Por favor, preencha todos os campos.',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', { usuario, senha });

      const { token, role } = response.data;

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', role);
      localStorage.setItem('token', token);

      Swal.fire({
        icon: 'success',
        title: 'Login bem-sucedido',
        text: 'Bem-vindo ao sistema!',
      }).then(() => {
        onLogin();
        if (role === 'medico') navigate('/medico-home');
        else if (role === 'atendente') navigate('/atendente-home');
        else if (role === 'adm') navigate('/admin-home');
        else navigate('/');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro no login',
        text: 'Usuário ou senha inválidos. Por favor, tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Clinica Corpart</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Usuário</label>
            <input
              type="text"
              className="form-control"
              id="usuario"
              placeholder="Insira seu usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="senha"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <span
                className="input-group-text"
                style={{ cursor: 'pointer' }}
                onClick={toggleShowPassword}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 mb-3"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
