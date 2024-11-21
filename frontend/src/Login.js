import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa o SweetAlert2
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Login.css';

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

            // Salvar token e tipo de usuário no localStorage
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userType', role);
            localStorage.setItem('token', token);

            Swal.fire({
                icon: 'success',
                title: 'Login bem-sucedido',
                text: 'Bem-vindo ao sistema!',
            }).then(() => {
                onLogin();
                // Redirecionar com base no tipo de usuário
                if (role === 'medico') navigate('/medico-home');
                else if (role === 'atendente') navigate('/atendente-home');
                else if (role === 'adm') navigate('/admin-home');
                else navigate('/');
            });
        } catch (error) {
            console.error('Erro na requisição:', error);

            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciais inválidas',
                    text: 'Usuário ou senha incorretos.',
                });
            } else if (error.response && error.response.status === 400) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos obrigatórios',
                    text: 'Usuário e senha são obrigatórios.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro no servidor',
                    text: 'Ocorreu um erro no servidor. Tente novamente mais tarde.',
                });
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

                    <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
