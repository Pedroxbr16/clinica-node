import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Certifique-se de que axios está instalado no projeto
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Login.css';

function Login({ onLogin }) {
    const [usuario, setUsuario] = useState(''); // Definindo o estado para 'usuario'
    const [senha, setSenha] = useState(''); // Definindo o estado para 'senha'
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null); // Definindo o estado para 'error'
    const [loading, setLoading] = useState(false); // Definindo o estado para 'loading'

    const navigate = useNavigate(); // Hook para navegação

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Limpa mensagens de erro anteriores
        setError(null);

        if (!usuario || !senha) {
            return setError('Por favor, preencha todos os campos.');
        }

        setLoading(true);

        try {
            // Log para verificar os dados enviados
            console.log('Dados enviados:', { usuario, senha });

            // Requisição ao backend
            const response = await axios.post('http://localhost:5000/api/login', { usuario, senha });

            // Log da resposta do servidor
            console.log('Resposta do servidor:', response.data);

            const { token, role } = response.data;

            // Salvar token e tipo de usuário no localStorage
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userType', role);
            localStorage.setItem('token', token);

            // Chamar a função onLogin e redirecionar com base no tipo de usuário
            onLogin();
            if (role === 'medico') navigate('/medico-home');
            else if (role === 'atendente') navigate('/atendente-home');
            else if (role === 'adm') navigate('/admin-home');
            else navigate('/');
        } catch (error) {
            console.error('Erro na requisição:', error);

            // Verificar a resposta do servidor para mostrar mensagens específicas
            if (error.response && error.response.status === 401) {
                setError('Usuário ou senha inválidos.');
            } else if (error.response && error.response.status === 400) {
                setError('Usuário e senha são obrigatórios.');
            } else {
                setError('Erro no servidor. Tente novamente mais tarde.');
            }
        } finally {
            setLoading(false);
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
                            onChange={(e) => { setUsuario(e.target.value); setError(null); }}
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
                                onChange={(e) => { setSenha(e.target.value); setError(null); }}
                                required
                            />
                            <span className="password-toggle position-absolute" onClick={toggleShowPassword}>
                                <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                            </span>
                        </div>
                    </div>

                    {error && <p className="text-danger">{error}</p>}

                    <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
