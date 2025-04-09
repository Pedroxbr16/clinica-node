import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Login.css';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Usuários fixos (login local)
  const users = [
    {
      usuario: 'admin',
      senha: 'admin123',
      role: 'adm'
    }
  ];

  const handleSubmit = (e) => {
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

    const userFound = users.find(u => u.usuario === usuario && u.senha === senha);

    if (userFound) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', userFound.role);

      Swal.fire({
        icon: 'success',
        title: 'Login bem-sucedido',
        text: 'Bem-vindo ao sistema!',
      }).then(() => {
        onLogin();

        if (userFound.role === 'adm') navigate('/admin-home');
        else navigate('/');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Credenciais inválidas',
        text: 'Usuário ou senha incorretos.',
      });
    }

    setLoading(false);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="login-page d-flex justify-content-center align-items-center vh-100">
      <div className="login-container bg-light p-4 shadow-sm rounded">
        <h2 className="text-center mb-4">Clinica Corpart</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              className="form-control"
              id="usuario"
              placeholder="Insira seu usuário..."
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-group mb-3">
            <label htmlFor="senha">Senha</label>
            <div className="password-container position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="senha"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <span className="password-toggle position-absolute" onClick={toggleShowPassword}>
                <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 mb-2" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          {/* Dica de login */}
          <div className="text-center text-muted small">
            <i className="fas fa-info-circle me-1"></i>
            Dica - usuário: <strong>admin</strong> | senha: <strong>admin123</strong>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
