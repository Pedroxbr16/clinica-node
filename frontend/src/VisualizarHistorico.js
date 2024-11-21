import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function VisualizarHistorico() {
  const { id } = useParams(); // ID do paciente vindo da URL
  const navigate = useNavigate(); // Hook para navegação
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

        // SweetAlert para exibir o erro
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao buscar os dados. Por favor, tente novamente.",
        });
      }
    };

    fetchHistoricos();
  }, [id]);

  const handleEdit = (historicoId) => {
    Swal.fire({
      title: "Editar Histórico",
      input: "textarea",
      inputLabel: "Atualize o histórico",
      inputPlaceholder: "Digite o novo histórico aqui...",
      inputAttributes: {
        "aria-label": "Atualize o histórico",
      },
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:5000/historico/historicos/${historicoId}`, {
            historico: result.value,
          });
          Swal.fire({
            icon: "success",
            title: "Sucesso",
            text: "Histórico atualizado com sucesso!",
          });
          // Atualiza a lista de históricos
          setHistoricos((prev) =>
            prev.map((h) =>
              h.id === historicoId ? { ...h, historico: result.value } : h
            )
          );
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Erro ao atualizar o histórico. Tente novamente.",
          });
        }
      }
    });
  };

  const handleDelete = (historicoId) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá desfazer esta ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/historico/historicos/${historicoId}`);
          Swal.fire({
            icon: "success",
            title: "Excluído",
            text: "Histórico excluído com sucesso!",
          });
          // Remove o histórico da lista
          setHistoricos((prev) => prev.filter((h) => h.id !== historicoId));
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Erro ao excluir o histórico. Tente novamente.",
          });
        }
      }
    });
  };

  return (
<div className="container">
  <div className="d-flex align-items-center justify-content-between mb-4">
    <button
      className="btn btn-secondary btn-sm"
      style={{
        width: "80px",
        height: "30px",
        fontSize: "12px",
      }}
      onClick={() => navigate(-1)} // Navega para a página anterior
    >
      Voltar
    </button>
    <h2 className="text-center mb-0" style={{ flex: 1 }}>
      Histórico de {pacienteNome}
    </h2>
  </div>

  {loading && <p>Carregando históricos...</p>}

  {!loading && !error && (
    <table
      className="table table-striped"
      style={{
        maxWidth: "90%",
        margin: "0 auto",
        borderRadius: "5px",
      }}
    >
      <thead>
        <tr>
          <th style={{ width: "15%" }}>Data</th>
          <th style={{ width: "65%" }}>Histórico</th>
          <th
            style={{
              width: "20%",
              textAlign: "center",
            }}
          >
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {historicos.length > 0 ? (
          historicos.map((historico) => (
            <tr key={historico.id}>
              <td>{formatDate(historico.data_consulta)}</td>
              <td>{historico.historico}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  className="btn btn-warning btn-sm me-2"
                  style={{
                    fontSize: "12px",
                    padding: "5px 10px",
                  }}
                  onClick={() => handleEdit(historico.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  style={{
                    fontSize: "12px",
                    padding: "5px 10px",
                  }}
                  onClick={() => handleDelete(historico.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>
              Nenhum histórico encontrado.
            </td>
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
