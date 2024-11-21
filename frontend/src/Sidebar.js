import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faCog, faVideo } from '@fortawesome/free-solid-svg-icons'; // Importando o ícone de videochamada
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Sidebar.css';

function Sidebar({ onLogout }) {
  const [showPatientsList, setShowPatientsList] = useState(false);
  const [showAppointmentsList, setShowAppointmentsList] = useState(false);
  const [showAdminList, setShowAdminList] = useState(false); 
  const navigate = useNavigate();

  const togglePatientsList = () => {
    setShowPatientsList(!showPatientsList);
  };

  const toggleAppointmentsList = () => {
    setShowAppointmentsList(!showAppointmentsList);
  };

  const toggleAdminList = () => {
    setShowAdminList(!showAdminList);
  };

  const handleLogoutClick = () => {
    onLogout(); // Chama a função de logout do App
    navigate('/login'); // Redireciona para a tela de login
  };

  return (
    <div className="sidebar">
      <h2><Link to="/" className="text-white text-decoration-none">Home</Link></h2>
      <ul className="nav flex-column">
<<<<<<< Updated upstream
        <li className="nav-item">
          <a href="#pacientes" className="nav-link text-white" onClick={togglePatientsList}>
            <FontAwesomeIcon icon={faUser} className="me-2" style={{ color: '#ffcc00' }} /> Pacientes
          </a>
          <ul className={`nested-list list-unstyled ${showPatientsList ? 'show' : ''}`}>
            <li><Link to="/listagemPaciente" className="text-white nav-link">Listagem</Link></li>
            <li><Link to="/cadastro" className="nav-link text-white">Cadastro</Link></li>
            <li><Link to="/pedido-exames" className="nav-link text-white">Exames</Link></li>
            <li><Link to="/Historico" className="nav-link text-white">Historicos</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <a href="#agendamentos" className="nav-link text-white" onClick={toggleAppointmentsList}>
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" style={{ color: '#28a745' }} /> Agendamentos
          </a>
          <ul className={`nested-list list-unstyled ${showAppointmentsList ? 'show' : ''}`}>
            <li><Link to="/agenda" className="nav-link text-white">Mostrar Agenda</Link></li>
            <li><Link to="/create-event" className="nav-link text-white">Criar Agendamento</Link></li>
            <li><Link to="/create-event" className="nav-link text-white">Pré-Agendamento</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <a href="#administracao" className="nav-link text-white" onClick={toggleAdminList}>
            <FontAwesomeIcon icon={faCog} className="me-2" style={{ color: '#343a40' }} /> Administração
          </a>
          <ul className={`nested-list list-unstyled ${showAdminList ? 'show' : ''}`}>
            <li><Link to="/config" className="nav-link text-white">Configurações</Link></li>
          </ul>
        </li>
=======
        {/* Menu de Pacientes */}
        {(userType === 'adm' || userType === 'medico' || userType === 'atendente') && (
          <li className="nav-item">
            <a href="#pacientes" className="nav-link text-white" onClick={togglePatientsList}>
              <FontAwesomeIcon icon={faUser} className="me-2" style={{ color: '#ffcc00' }} /> Pacientes
            </a>
            <ul className={`nested-list list-unstyled ${showPatientsList ? 'show' : ''}`}>
              {(userType === 'adm' || userType === 'atendente') && (
                <>
                  <li>
                    <Link to="/listagemPaciente" className="text-white nav-link">
                      Listagem
                    </Link>
                  </li>
                  <li>
                    <Link to="/cadastro" className="nav-link text-white">
                      Cadastro
                    </Link>
                  </li>
                </>
              )}
              {(userType === 'adm' || userType === 'medico') && (
                <>
                  <li>
                    <Link to="/pedido-exames" className="nav-link text-white">
                      Exames
                    </Link>
                  </li>
                  <li>
                    <Link to="/historico" className="nav-link text-white">
                      Históricos
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </li>
        )}

        {/* Menu de Agendamentos */}
        {(userType === 'adm' || userType === 'medico' || userType === 'atendente') && (
          <li className="nav-item">
            <a href="#agendamentos" className="nav-link text-white" onClick={toggleAppointmentsList}>
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" style={{ color: '#28a745' }} /> Agendamentos
            </a>
            <ul className={`nested-list list-unstyled ${showAppointmentsList ? 'show' : ''}`}>
              <li>
                <Link to="/agenda" className="nav-link text-white">
                  Mostrar Agenda
                </Link>
              </li>
              {(userType === 'adm' || userType === 'atendente') && (
                <li>
                  <Link to="/create-event" className="nav-link text-white">
                    Criar Agendamento
                  </Link>
                </li>
              )}
            </ul>
          </li>
        )}

        {/* Menu de Videochamada */}
        {(userType === 'adm' || userType === 'medico' || userType === 'atendente') && (
          <li className="nav-item">
            <Link to="/call/sala-12345" className="nav-link text-white">
              <FontAwesomeIcon icon={faVideo} className="me-2" style={{ color: '#007bff' }} /> Videochamada
            </Link>
          </li>
        )}

        {/* Menu de Administração */}
        {userType === 'adm' && (
          <li className="nav-item">
            <a href="#administracao" className="nav-link text-white" onClick={toggleAdminList}>
              <FontAwesomeIcon icon={faCog} className="me-2" style={{ color: '#343a40' }} /> Administração
            </a>
            <ul className={`nested-list list-unstyled ${showAdminList ? 'show' : ''}`}>
              <li>
                <Link to="/config" className="nav-link text-white">
                  Configurações
                </Link>
              </li>
            </ul>
          </li>
        )}
>>>>>>> Stashed changes
      </ul>
      <div className="sidebar-footer mt-auto">
        <button onClick={handleLogoutClick} className="logout-button">Deslogar</button>
      </div>
    </div>
  );
}

export default Sidebar;
