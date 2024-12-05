import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Login from './Login';
import RegisterMedico from './RegisterMedico';
import RegisterUsuario from './RegisterUsuario';
import ListagemPacientes from './ListagemPacientes';
import CadastroPacientes from './CadastroPacientes';
import EditarPaciente from './EditarPaciente'; // Importando o componente de edição de paciente
import EditarMedico from './EditarMedico';
import EditarUsuario from './EditarUsuario';
import Agenda from './Agenda';
import CreateEvent from './CreateEvent';
import Config from './ConfigADM';
import PedidoExames from './PedidoExames';
import TiposConsulta from './AddTipoConsulta';
import HistoricoPaciente from './CriarHistorico';
import EditarHistorico from './historico';
import Medico from './ConfigMedicos';
import Usuario from './ConfigUsuario';
import AddTipoExame from './AddTipoExames';
import Historico from './historico';
import VisualizarHistorico from './VisualizarHistorico';
import PreAgenda from './PreAgenda'; // Atualize o caminho caso necessário
import CadastroMB from './CadastroPacientesMB';
import CreateEventMB from './CreateEventMB';
import Pagamentos from './Pagamentos';
import './css/App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedUserType = localStorage.getItem('userType');
    setIsAuthenticated(authStatus === 'true');
    setUserType(storedUserType);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    setUserType('');
    setIsAuthenticated(false);
  };

  // Verificar permissão para uma rota
  const hasPermission = (allowedRoles) => allowedRoles.includes(userType);

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <div className="content">
          <Routes>
            {/* Rota de Login */}
            <Route
              path="/login"
              element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
            />

            {/* Rotas acessíveis a todos os usuários autenticados */}
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/agenda"
              element={isAuthenticated ? <Agenda /> : <Navigate to="/login" />}
            />
            <Route
              path="/create-event"
              element={isAuthenticated ? <CreateEvent /> : <Navigate to="/login" />}
            />

            {/* Rotas para Admin */}
            {hasPermission(['adm']) && (
              <>
                <Route path="/listagemPaciente" element={<ListagemPacientes />} />
                <Route path="/cadastro" element={<CadastroPacientes />} />
                <Route path="/config" element={<Config />} />
                <Route path="/register/medico" element={<RegisterMedico />} />
                <Route path="/register/usuario" element={<RegisterUsuario />} />
                <Route path="/medicos" element={<Medico />} />
                <Route path="/usuarios" element={<Usuario />} />
                <Route path="/medicos/editar/:id" element={<EditarMedico />} />
                <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
                <Route path="/tipos-exame" element={<AddTipoExame />} />
                <Route path="/tipos-consulta" element={<TiposConsulta />} />
                <Route path="/pacientes/editar/:id" element={<EditarPaciente />} /> {/* Rota de edição de paciente */}
                {/* <Route path="/pagamentos" element={<Pagamentos />} /> */}
              </>
            )}

            {/* Rotas para Médicos */}
            {hasPermission(['adm', 'medico']) && (
              <>
                <Route path="/historico" element={<Historico />} />
                <Route path="/pedido-exames" element={<PedidoExames />} />
                <Route path="/pacientes/:id/historico" element={<HistoricoPaciente />} />
                <Route path="/pacientes/:id/editar-historico" element={<EditarHistorico />} />
                <Route path="/pacientes/:id/visualizar-historico" element={<VisualizarHistorico />} />
           
              </>
            )}

            {/* Rotas para Atendentes */}
            {hasPermission(['adm', 'atendente']) && (
              <>
                <Route path="/listagemPaciente" element={<ListagemPacientes />} />
                <Route path="/cadastro" element={<CadastroPacientes />} />
                <Route path="/pacientes/editar/:id" element={<EditarPaciente />} /> {/* Rota de edição de paciente */}
                <Route path="/pre-agenda" element={<PreAgenda />} />
                <Route path='/CadastroMB' element={<CadastroMB/>}/>
                <Route path='/CreateEventMB' element={<CreateEventMB/>}/>
                <Route path="/pagamentos" element={<Pagamentos />} />

              </>
            )}

            {/* Rotas genéricas */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Página inicial (Home)
function Home() {}

export default App;
