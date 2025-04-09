import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';

function AtestadoMedico() {
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [medicoSelecionado, setMedicoSelecionado] = useState('');
  const [diasAfastamento, setDiasAfastamento] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const storedMedicos = JSON.parse(localStorage.getItem('medicos')) || [
      { id: 1, nome: 'Dr. João Silva' },
      { id: 2, nome: 'Dra. Ana Maria' }
    ];

    const storedPacientes = JSON.parse(localStorage.getItem('pacientes')) || [
      { id: 1, nome: 'Carlos Souza' },
      { id: 2, nome: 'Maria Oliveira' }
    ];

    setMedicos(storedMedicos);
    setPacientes(storedPacientes);
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("Centro Clínico EXEMPLO - RJ", 20, 20);
    doc.text("CNPJ: 11.111.111/0001-11", 20, 25);
    doc.text("Rua QUALQUER UMA NUMERO NINGUEM LIGA ANDAR 12", 20, 30);

    doc.text(`Paciente: ${pacienteSelecionado}`, 20, 50);
    doc.text(`Médico: ${medicoSelecionado}`, 20, 55);
    doc.text(`Data do Atendimento: ${new Date().toLocaleDateString()}`, 20, 60);

    doc.text(`Afastamento: ${diasAfastamento} dia(s)`, 20, 80);

    if (observacoes) {
      doc.text("Observações:", 20, 100);
      doc.text(observacoes, 20, 110, { maxWidth: 170 });
    }

    const yPosition = 130;
    doc.line(20, yPosition, 120, yPosition);
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
            {pacientes.map((p) => (
              <option key={p.id} value={p.nome}>{p.nome}</option>
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
            {medicos.map((m) => (
              <option key={m.id} value={m.nome}>{m.nome}</option>
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
