import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function VisualizarHistorico() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [historicos, setHistoricos] = useState([]);
  const [pacienteNome, setPacienteNome] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    const paciente = pacientes.find((p) => p.id.toString() === id);
    setPacienteNome(paciente?.nome || "Paciente não encontrado");

    const todosHistoricos = JSON.parse(localStorage.getItem("historicos")) || [];
    const historicosFiltrados = todosHistoricos.filter(
      (h) => h.paciente_id.toString() === id
    );
    setHistoricos(historicosFiltrados);
    setLoading(false);
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
    }).then((result) => {
      if (result.isConfirmed) {
        const atualizados = historicos.map((h) =>
          h.id === historicoId ? { ...h, historico: result.value } : h
        );
        setHistoricos(atualizados);
        localStorage.setItem("historicos", JSON.stringify(
          JSON.parse(localStorage.getItem("historicos")).map((h) =>
            h.id === historicoId ? { ...h, historico: result.value } : h
          )
        ));
        Swal.fire("Atualizado!", "Histórico atualizado com sucesso.", "success");
      }
    });
  };

  const handleDelete = (historicoId) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação é irreversível!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const atualizados = historicos.filter((h) => h.id !== historicoId);
        setHistoricos(atualizados);

        const todosHistoricos = JSON.parse(localStorage.getItem("historicos")) || [];
        const atualizadosGlobais = todosHistoricos.filter((h) => h.id !== historicoId);
        localStorage.setItem("historicos", JSON.stringify(atualizadosGlobais));

        Swal.fire("Excluído!", "Histórico removido com sucesso.", "success");
      }
    });
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <button
          className="btn btn-secondary btn-sm"
          style={{ width: "80px", height: "30px", fontSize: "12px" }}
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
        <h2 className="text-center mb-0" style={{ flex: 1 }}>
          Histórico de {pacienteNome}
        </h2>
      </div>

      {loading ? (
        <p>Carregando históricos...</p>
      ) : (
        <table className="table table-striped" style={{ maxWidth: "90%", margin: "0 auto", borderRadius: "5px" }}>
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Data</th>
              <th style={{ width: "65%" }}>Histórico</th>
              <th style={{ width: "20%", textAlign: "center" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {historicos.length > 0 ? (
              historicos.map((historico) => (
                <tr key={historico.id}>
                  <td>{formatDate(historico.data_consulta)}</td>
                  <td>{historico.historico}</td>
                  <td style={{ textAlign: "center" }}>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(historico.id)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(historico.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
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
  return date.toLocaleDateString("pt-BR");
};

export default VisualizarHistorico;
