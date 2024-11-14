import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Login from './Login';
import RegisterMedico from './RegisterMedico';
import RegisterUsuario from './RegisterUsuario';
import ListagemPacientes from './ListagemPacientes';
import CadastroPacientes from './CadastroPacientes';
import EditarPaciente from './EditarPaciente';
import EditarMedico from './EditarMedico';
import EditUsuario from './EditarUsuario';
import Agenda from './Agenda';
import CreateEvent from './CreateEvent';
import Config from './ConfigADM';
import PedidoExames from './PedidoExames';
import TiposConsulta from './AddTipoConsulta';
import HistoricoPaciente from './HistoricoPaciente';
import Medico from './ConfigMedicos';
import Usuario from './ConfigUsuario';
import AddTipoExame from './AddTipoExames';
import Historico from './historico'; // Importa o componente Historico
import './css/App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <div className="content">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
            <Route path="/register/medico" element={<RegisterMedico />} />
            <Route path="/register/usuario" element={<RegisterUsuario />} />

            {/* Rota inicial (Home) */}
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

            <Route path="/listagemPaciente" element={isAuthenticated ? <ListagemPacientes /> : <Navigate to="/login" />} />
            <Route path="/cadastro" element={isAuthenticated ? <CadastroPacientes /> : <Navigate to="/login" />} />
            <Route path="/agenda" element={isAuthenticated ? <Agenda /> : <Navigate to="/login" />} />
            <Route path="/create-event" element={isAuthenticated ? <CreateEvent /> : <Navigate to="/login" />} />
            <Route path="/config" element={isAuthenticated ? <Config /> : <Navigate to="/login" />} />
            <Route path="/pedido-exames" element={isAuthenticated ? <PedidoExames /> : <Navigate to="/login" />} />
            <Route path="/pacientes/editar/:id" element={isAuthenticated ? <EditarPaciente /> : <Navigate to="/login" />} />
            <Route path="/tipos-consulta" element={isAuthenticated ? <TiposConsulta /> : <Navigate to="/login" />} />

            {/* Nova Rota para Histórico de Pacientes */}
            <Route path="/historico" element={isAuthenticated ? <Historico /> : <Navigate to="/login" />} />

            {/* Nova Rota para Histórico do Paciente Específico */}
            <Route path="/pacientes/:id/historico" element={isAuthenticated ? <HistoricoPaciente /> : <Navigate to="/login" />} />

            {/* Rotas para Médicos e Usuários */}
            <Route path="/medicos" element={isAuthenticated ? <Medico /> : <Navigate to="/login" />} />
            <Route path="/usuarios" element={isAuthenticated ? <Usuario /> : <Navigate to="/login" />} />

            {/* Rota para Editar Médico */}
            <Route path="/medicos/editar/:id" element={isAuthenticated ? <EditarMedico /> : <Navigate to="/login" />} />

            {/* Rota para Editar Usuário */}
            <Route path="/usuarios/editar/:id" element={isAuthenticated ? <EditUsuario /> : <Navigate to="/login" />} />

            {/* Rota para AddTipoExame */}
            <Route path="/tipos-exame" element={isAuthenticated ? <AddTipoExame /> : <Navigate to="/login" />} />

            {/* Rota de redirecionamento padrão */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Página inicial (Home)
function Home() {
  
}

export default App;
