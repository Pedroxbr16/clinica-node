// src/HistoricoPaciente.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function HistoricoPaciente() {
  const { id } = useParams(); // Obtém o ID do paciente da URL
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pacientes/${id}/historico`);
        setHistorico(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar histórico do paciente:', err);
        setError('Erro ao buscar histórico do paciente.');
        setLoading(false);
      }
    };
    
    fetchHistorico();
  }, [id]);

  if (loading) return <p>Carregando histórico...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container">
      <h2>Histórico do Paciente</h2>
      {historico.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((entry) => (
              <tr key={entry.id}>
                <td>{new Date(entry.data).toLocaleDateString()}</td>
                <td>{entry.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum histórico encontrado para este paciente.</p>
      )}
    </div>
  );
}

export default HistoricoPaciente;
