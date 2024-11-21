import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa o SweetAlert2
import 'bootstrap/dist/css/bootstrap.min.css';

function RegisterUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [funcao, setFuncao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { usuario, senha, email, funcao };
      const response = await axios.post('http://localhost:5000/atendente/atendente', payload);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado',
          text: 'Usuário cadastrado com sucesso!',
        }).then(() => navigate('/login')); // Redireciona para a página de login
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro no cadastro',
        text: 'Não foi possível registrar o usuário. Tente novamente.',
      });
    }
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100">
      <div className="register-container bg-light p-4 shadow-sm rounded">
        {/* Botão de Voltar */}
        <button
          className="btn btn-secondary mb-4"
          onClick={() => navigate(-1)} // Volta para a página anterior
        >
          Voltar
        </button>

        <h2 className="text-center mb-4">Registrar Usuário</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            {/* Usuário */}
            <div className="form-group">
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
          </div>

          <div className="form-row">
            {/* Senha */}
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                className="form-control"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            {/* Email */}
            <div className="form-group">
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
          </div>

          <div className="form-row">
            {/* Função */}
            <div className="form-group">
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
          </div>

          <button type="submit" className="btn btn-success w-100">Cadastrar Usuário</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUsuario;
