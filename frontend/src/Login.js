import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando Bootstrap
import './css/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      localStorage.setItem('isAuthenticated', 'true');
      onLogin();
      navigate('/');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center vh-100">
      <div className="login-container bg-light p-4 shadow-sm rounded">
        <h2 className="text-center mb-4">P.E.M Tech</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Insira seu usuário..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group password-group mb-3">
            <label htmlFor="password">Senha</label>
            <div className="password-container position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="password-toggle position-absolute" onClick={toggleShowPassword}>
                <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-success w-100 mb-3">Entrar</button>
        </form>
        <button onClick={handleRegister} className="btn btn-primary w-100">
          Cadastra-se
        </button>
      </div>
    </div>
  );
}

export default Login;
