import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [funcao, setFuncao] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/atendente/atendente/${id}`);
        const data = response.data;
        setUsuario(data.usuario);
        setSenha(''); // Mantém a senha em branco para segurança
        setEmail(data.email);
        setFuncao(data.funcao);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        setFeedback('Erro ao carregar os dados do usuário.');
      }
    };
    fetchUsuario();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { usuario, senha, email, funcao };
      const response = await axios.put(`http://localhost:5000/atendente/atendente/${id}`, payload);

      if (response.status === 200) {
        setFeedback('Usuário atualizado com sucesso!');
        setTimeout(() => {
          setFeedback('');
          navigate('/usuarios');
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      setFeedback('Erro ao atualizar o usuário.');
    }
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100">
      <div className="register-container bg-light p-4 shadow-sm rounded">
        <button
          className="btn btn-secondary mb-4"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>

        <h2 className="text-center mb-4">Editar Usuário</h2>
        {feedback && <div className="alert alert-success" role="alert">{feedback}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
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
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                className="form-control"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
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

          <button type="submit" className="btn btn-success w-100">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
}

export default EditUsuario;
