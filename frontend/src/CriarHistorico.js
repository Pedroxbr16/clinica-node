import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Importa o SweetAlert2
import './css/CriarHistorico.css'; // Caminho atualizado

const CriarHistorico = () => {
  const { id } = useParams(); // Obtém o ID do paciente da URL
  const [pacienteNome, setPacienteNome] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");
  const [historicoTexto, setHistoricoTexto] = useState("");

  useEffect(() => {
    // Define a data atual automaticamente no formato YYYY-MM-DD
    const hoje = new Date();
    const dataFormatada = hoje.toISOString().split("T")[0]; // Formato ISO 8601 (YYYY-MM-DD)
    setDataConsulta(dataFormatada);

    // Busca o nome do paciente pelo ID
    const fetchPacienteNome = async () => {
      try {
        const response = await fetch(`http://localhost:5000/pacientes/pacientes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPacienteNome(data.nome); // Define o nome do paciente
        } else {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Erro ao buscar o nome do paciente.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao conectar com o servidor.",
        });
      }
    };

    fetchPacienteNome();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const historico = {
      paciente_id: id, // Ainda usamos o ID para criar o histórico
      data_consulta: dataConsulta,
      historico: historicoTexto,
    };

    try {
      const response = await fetch("http://localhost:5000/historico/historicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(historico),
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          icon: "success",
          title: "Sucesso",
          text: `Histórico criado com sucesso! ID: ${result.id}`,
        });
        setHistoricoTexto(""); // Limpa o campo do histórico
      } else {
        const error = await response.json();
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: `Erro: ${error.error}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao conectar com o servidor.",
      });
    }
  };

  return (
    <div className="historico-container">
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

        <button type="submit">Criar Histórico</button>
      </form>
    </div>
  );
};

export default CriarHistorico;
