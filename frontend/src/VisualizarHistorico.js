import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import "./css/visualizarHistorico.css";

function VisualizarHistorico() {
  const { id } = useParams(); // ID do paciente vindo da URL
  const [historicos, setHistoricos] = useState([]);
  const [pacienteNome, setPacienteNome] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoricos = async () => {
      try {
        // Busca os históricos do paciente
        const responseHistoricos = await axios.get(
          `http://localhost:5000/historico/paciente/${id}`
        );
        setHistoricos(responseHistoricos.data);

        // Busca o nome do paciente
        const responsePaciente = await axios.get(
          `http://localhost:5000/pacientes/pacientes/${id}`
        );
        setPacienteNome(responsePaciente.data.nome);

        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar os dados:", err);
        setError("Erro ao buscar os dados. Por favor, tente novamente.");
        setLoading(false);
      }
    };

    fetchHistoricos();
  }, [id]);

  return (
    <div className="container">
      <h2>Histórico de {pacienteNome}</h2>

      {loading && <p>Carregando históricos...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Histórico</th>
            </tr>
          </thead>
          <tbody>
            {historicos.length > 0 ? (
              historicos.map((historico) => (
                <tr key={historico.id}>
                  <td>{formatDate(historico.data_consulta)}</td>
                  <td>{historico.historico}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Nenhum histórico encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês começa em 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default VisualizarHistorico;
