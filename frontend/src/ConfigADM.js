import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/ConfigADM.css';

const ConfigADM = () => {
  const navigate = useNavigate();

  // Função para navegar até a página de registro de usuário
  const handleNavigateToRegister = () => {
    navigate('/register/usuario');
  };

  // Função para navegar até a página de registro de médico
  const handleNavigateToRegisterMedico = () => {
    navigate('/register/medico');
  };

  // Função para navegar até a página de tipos de consulta
  const handleNavigateToTiposConsulta = () => {
    navigate('/tipos-consulta');
  };

  return (
    <div className="container config-adm-container mt-5">
      <h2 className="text-center mb-4">Configurações de Administrador</h2>

      <button onClick={handleNavigateToRegister} className="btn btn-primary btn-block">
       Usuários
      </button>
      
      <button onClick={handleNavigateToRegisterMedico} className="btn btn-primary btn-block">
         Médicos
      </button>

      <button onClick={handleNavigateToTiposConsulta} className="btn btn-primary btn-block">
        Tipos de Consulta
      </button>
    </div>
  );
};

export default ConfigADM;
