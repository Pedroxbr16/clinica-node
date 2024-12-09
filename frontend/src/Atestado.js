import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AtestadoMedico() {
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [medicoSelecionado, setMedicoSelecionado] = useState('');
  const [diasAfastamento, setDiasAfastamento] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    fetchMedicos();
    fetchPacientes();
  }, []);

  const fetchMedicos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/medicos/medicos');
      setMedicos(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
    }
  };

  const fetchPacientes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pacientes/pacientes');
      setPacientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Cabeçalho
    doc.setFontSize(12);
    doc.text("Centro Clínico EXEMPLO - RJ", 20, 20);
    doc.text("CNPJ: 11.111.111/0001-11", 20, 25);
    doc.text("Rua QUALQUER UMA NUMERO NINGUEM LIGA ANDAR 12", 20, 30);

    // Informações do Paciente e Médico
    doc.text(`Paciente: ${pacienteSelecionado}`, 20, 50);
    doc.text(`Médico: ${medicoSelecionado}`, 20, 55);
    doc.text(`Data do Atendimento: ${new Date().toLocaleDateString()}`, 20, 60);

    // Dias de afastamento
    doc.text(`Afastamento: ${diasAfastamento} dia(s)`, 20, 80);

    // Observações
    if (observacoes) {
      doc.text("Observações:", 20, 100);
      doc.text(observacoes, 20, 110, { maxWidth: 170 });
    }

    // Linha e assinatura
    const yPosition = 130;
    doc.line(20, yPosition, 120, yPosition); // Linha para assinatura
    doc.text("Assinatura / Carimbo do Médico", 20, yPosition + 10);

    doc.save(`Atestado_Medico_${pacienteSelecionado}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  return (
    <div className="container">
      <h2>Atestado Médico</h2>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-12">
          <label>Selecione o Paciente:</label>
          <select
            className="form-select"
            value={pacienteSelecionado}
            onChange={(e) => setPacienteSelecionado(e.target.value)}
            required
          >
            <option value="">Selecione um paciente</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.nome}>
                {paciente.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-12">
          <label>Selecione o Médico:</label>
          <select
            className="form-select"
            value={medicoSelecionado}
            onChange={(e) => setMedicoSelecionado(e.target.value)}
            required
          >
            <option value="">Selecione um médico</option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.usuario || medico.nome}>
                {medico.usuario || medico.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-12">
          <label>Dias de Afastamento:</label>
          <input
            type="number"
            className="form-control"
            value={diasAfastamento}
            onChange={(e) => setDiasAfastamento(e.target.value)}
            placeholder="Informe o número de dias de afastamento"
            required
          />
        </div>

        <div className="col-md-12">
          <label>Observações:</label>
          <textarea
            className="form-control"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows="4"
            placeholder="Adicione observações, se necessário..."
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Gerar Atestado Médico em PDF
          </button>
        </div>
      </form>
    </div>
  );
}

export default AtestadoMedico;
