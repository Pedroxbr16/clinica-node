import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando Bootstrap
import './css/ConfigADM.css';

const ConfigADM = () => {
  const [types, setTypes] = useState(['Consulta Geral', 'Exame', 'Retorno']);
  const [newType, setNewType] = useState('');

  const handleAddType = () => {
    if (newType.trim()) {
      setTypes([...types, newType]);
      setNewType('');
    }
  };

  const handleRemoveType = (indexToRemove) => {
    setTypes(types.filter((_, index) => index !== indexToRemove)); // Remove o tipo de consulta
  };

  return (
    <div className="container config-adm-container mt-5">
      <h2 className="text-center mb-4">Gerenciar Tipos de Consulta</h2>
      
      <ul className="list-group mb-4">
        {types.map((type, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {type}
            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveType(index)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="input-group mb-3">
  <input
    type="text"
    className="form-control"
    value={newType}
    onChange={(e) => setNewType(e.target.value)}
    placeholder="Digite o novo tipo de consulta..."
  />
  <button onClick={handleAddType} className="btn btn-success">
    Adicionar
  </button>
</div>
    </div>
  );
};

export default ConfigADM;
