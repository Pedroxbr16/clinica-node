import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './css/CriarHistorico.css';

const CriarHistorico = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pacienteNome, setPacienteNome] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");
  const [historicoTexto, setHistoricoTexto] = useState("");

  useEffect(() => {
    const hoje = new Date().toISOString().split("T")[0];
    setDataConsulta(hoje);

    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    const paciente = pacientes.find((p) => p.id.toString() === id);
    if (paciente) {
      setPacienteNome(paciente.nome);
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Paciente não encontrado no localStorage.",
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const historico = {
      id: Date.now(),
      paciente_id: id,
      paciente_nome: pacienteNome,
      data_consulta: dataConsulta,
      historico: historicoTexto,
    };

    const historicos = JSON.parse(localStorage.getItem("historicos")) || [];
    historicos.push(historico);
    localStorage.setItem("historicos", JSON.stringify(historicos));

    Swal.fire({
      icon: "success",
      title: "Sucesso",
      text: `Histórico salvo com sucesso!`,
    });

    setHistoricoTexto("");
  };

  return (
    <div className="historico-container">
      <div className="d-flex align-items-center mb-4">
        <button
          className="btn btn-secondary btn-sm me-3"
          style={{ width: '100px' }}
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
        <h2 className="mb-0">Criar Histórico de {pacienteNome}</h2>
      </div>

      <form onSubmit={handleSubmit} className="historico-form">
        <label htmlFor="pacienteNome">Nome do Paciente</label>
        <input
          type="text"
          id="pacienteNome"
          value={pacienteNome}
          readOnly
          className="readonly-input"
        />

        <label htmlFor="dataConsulta">Data da Consulta</label>
        <input
          type="date"
          id="dataConsulta"
          value={dataConsulta}
          readOnly
          className="readonly-input"
        />

        <label htmlFor="historicoTexto">Histórico</label>
        <textarea
          id="historicoTexto"
          value={historicoTexto}
          onChange={(e) => setHistoricoTexto(e.target.value)}
          rows="4"
          required
        ></textarea>

        <button type="submit" className="btn btn-primary w-100 mt-3">Criar Histórico</button>
      </form>
    </div>
  );
};

export default CriarHistorico;
