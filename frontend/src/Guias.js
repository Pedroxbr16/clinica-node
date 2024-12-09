import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Menu() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="container text-center mt-5">
      <h2>Menu de Navegação</h2>
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-primary mx-2"
          onClick={() => handleNavigation('/pedido-exames')}
        >
          Exames
        </button>
        <button
          className="btn btn-success mx-2"
          onClick={() => handleNavigation('/Atestado')}
        >
          Atestado
        </button>
        <button
          className="btn btn-warning mx-2"
          onClick={() => handleNavigation('/Receita')}
        >
          Receita
        </button>
      </div>
    </div>
  );
}

export default Menu;
