import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './css/Login.css';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState(''); // Atualizando o nome do campo para "usuario"
  const [senha, setSenha] = useState(''); // Atualizando o nome do campo para "senha"
  const [userType, setUserType] = useState(''); // Estado para o tipo de usuário
  const [showPassword, setShowPassword] = useState(false); // Estado para controle de visibilidade da senha
  const [error, setError] = useState(null); // Estado para mensagens de erro

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario && senha && userType) {
      try {
        // Fazendo a requisição para o backend para autenticar o usuário
        const response = await axios.post('http://localhost:5000/api/login', {
          usuario,
          senha,
          userType
        });

        // Se a resposta for bem-sucedida, armazene os dados no localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', userType); 
        onLogin();

        // Redireciona com base no tipo de usuário
        if (userType === 'medico') {
          navigate('/dashboard-medico');
        } else if (userType === 'atendente') {
          navigate('/dashboard-atendente');
        } else if (userType === 'usuario') {
          navigate('/dashboard-adm');
        }
      } catch (error) {
        console.error('Erro ao autenticar:', error);
        setError('Erro de autenticação. Verifique suas credenciais.');
      }
    } else {
      setError('Por favor, preencha todos os campos.');
    }
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

          {/* Campo para selecionar o tipo de usuário */}
          <div className="form-group mb-3">
            <label htmlFor="userType">Tipo de Usuário</label>
            <select
              className="form-control"
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="">Selecione o tipo de usuário</option>
              <option value="medico">Médico</option>
              <option value="atendente">Atendente</option>
              <option value="usuario">ADM</option>
            </select>
          </div>

          {error && <p className="text-danger">{error}</p>}

          <button type="submit" className="btn btn-success w-100 mb-3">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
