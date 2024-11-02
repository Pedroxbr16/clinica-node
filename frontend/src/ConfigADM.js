import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/ConfigADM.css';

const ConfigADM = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to navigate to the registration page
  const handleNavigateToRegister = () => {
    navigate('/register'); // Path to the Register page
  };

  return (
    <div className="container config-adm-container mt-5">
      <h2 className="text-center mb-4">Configurações de Administrador</h2>

      <button onClick={handleNavigateToRegister} className="btn btn-primary">
        Registrar Medico/Atendente
      </button>
    </div>
  );
};

export default ConfigADM;
