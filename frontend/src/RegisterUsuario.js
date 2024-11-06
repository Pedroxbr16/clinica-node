// RegisterAtendente.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/RegisterMedico.css';

function RegisterAtendente() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [funcao, setFuncao] = useState('atendente'); // Função padrão definida como 'atendente'
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Endpoint fixo para todos os tipos de usuários
      const endpoint = '/atendente/atendente';
      
      // Payload inclui funcao como parte dos dados enviados
      const payload = { usuario, senha, email, funcao };
      
      console.log("Enviando dados:", payload); // Log para verificar o payload antes do envio

      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);

      if (response.status === 200 || response.status === 201) {
        setFeedback('Cadastro realizado com sucesso!');
        setTimeout(() => {
          setFeedback('');
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error); // Log de erro para depuração
      setFeedback(`Erro ao registrar o usuário.`);
    }
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100">
      <div className="register-container bg-light p-4 shadow-sm rounded">
        <h2 className="text-center mb-4">Registrar Usuário</h2>
        {feedback && <div className="alert alert-success" role="alert">{feedback}</div>}
        
        <form onSubmit={handleSubmit}>
          {/* Seleção de Função */}
          <div className="form-group mb-3">
            <label htmlFor="funcao">Função</label>
            <select id="funcao" className="form-select" value={funcao} onChange={(e) => setFuncao(e.target.value)} required>
              <option value="atendente">Atendente</option>
              <option value="medico">Médico</option>
            </select>
          </div>
          {/* Nome */}
          <div className="form-group mb-3">
            <label htmlFor="usuario">Usuário do sistema</label>
            <input type="text" id="usuario" className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
          </div>
          {/* Email */}
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          {/* Senha */}
          <div className="form-group mb-3">
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" className="form-control" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Cadastrar {funcao.charAt(0).toUpperCase() + funcao.slice(1)}</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterAtendente;
