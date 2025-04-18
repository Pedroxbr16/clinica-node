import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProtectedLayout from "./ProtectedLayout";
import ProtectedRoute from './ProtectedRoute';
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
import Atestado from './Atestado';
import Receita from './Receita';
import MenuGuias from './Guias'
import Dash from './chart';
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

  {/* Rotas protegidas com layout */}
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <ProtectedLayout>
          <Home />
        </ProtectedLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/agenda"
    element={
      <ProtectedRoute>
        <ProtectedLayout>
          <Agenda />
        </ProtectedLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/create-event"
    element={
      <ProtectedRoute>
        <ProtectedLayout>
          <CreateEvent />
        </ProtectedLayout>
      </ProtectedRoute>
    }
  />

  {/* Admin */}
  {hasPermission(['adm']) && (
    <>
      <Route path="/listagemPaciente" element={<ProtectedRoute><ProtectedLayout><ListagemPacientes /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/cadastro" element={<ProtectedRoute><ProtectedLayout><CadastroPacientes /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/config" element={<ProtectedRoute><ProtectedLayout><Config /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/register/medico" element={<ProtectedRoute><ProtectedLayout><RegisterMedico /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/register/usuario" element={<ProtectedRoute><ProtectedLayout><RegisterUsuario /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/medicos" element={<ProtectedRoute><ProtectedLayout><Medico /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/usuarios" element={<ProtectedRoute><ProtectedLayout><Usuario /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/medicos/editar/:id" element={<ProtectedRoute><ProtectedLayout><EditarMedico /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/usuarios/editar/:id" element={<ProtectedRoute><ProtectedLayout><EditarUsuario /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/tipos-exame" element={<ProtectedRoute><ProtectedLayout><AddTipoExame /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/tipos-consulta" element={<ProtectedRoute><ProtectedLayout><TiposConsulta /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/pacientes/editar/:id" element={<ProtectedRoute><ProtectedLayout><EditarPaciente /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/Dash" element={<ProtectedRoute><ProtectedLayout><Dash /></ProtectedLayout></ProtectedRoute>} />
    </>
  )}

  {/* Médicos */}
  {hasPermission(['adm', 'medico']) && (
    <>
      <Route path="/historico" element={<ProtectedRoute><ProtectedLayout><Historico /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/pedido-exames" element={<ProtectedRoute><ProtectedLayout><PedidoExames /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/pacientes/:id/historico" element={<ProtectedRoute><ProtectedLayout><HistoricoPaciente /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/pacientes/:id/editar-historico" element={<ProtectedRoute><ProtectedLayout><EditarHistorico /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/pacientes/:id/visualizar-historico" element={<ProtectedRoute><ProtectedLayout><VisualizarHistorico /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/Atestado" element={<ProtectedRoute><ProtectedLayout><Atestado /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/Receita" element={<ProtectedRoute><ProtectedLayout><Receita /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/Guias" element={<ProtectedRoute><ProtectedLayout><MenuGuias /></ProtectedLayout></ProtectedRoute>} />
    </>
  )}

  {/* Atendentes */}
  {hasPermission(['adm', 'atendente']) && (
    <>
      <Route path="/listagemPaciente" element={<ProtectedRoute><ProtectedLayout><ListagemPacientes /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/cadastro" element={<ProtectedRoute><ProtectedLayout><CadastroPacientes /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/pacientes/editar/:id" element={<ProtectedRoute><ProtectedLayout><EditarPaciente /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/pre-agenda" element={<ProtectedRoute><ProtectedLayout><PreAgenda /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/CadastroMB" element={<ProtectedRoute><ProtectedLayout><CadastroMB /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/CreateEventMB" element={<ProtectedRoute><ProtectedLayout><CreateEventMB /></ProtectedLayout></ProtectedRoute>} />
      <Route path="/pagamentos" element={<ProtectedRoute><ProtectedLayout><Pagamentos /></ProtectedLayout></ProtectedRoute>} />
    </>
  )}

  {/* Fallback */}
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
