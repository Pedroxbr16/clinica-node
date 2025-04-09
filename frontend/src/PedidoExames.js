import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import 'bootstrap/dist/css/bootstrap.min.css';

function PedidoExames() {
  const [exames, setExames] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [examesSelecionados, setExamesSelecionados] = useState([]);
  const [observacoes, setObservacoes] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [medicoSelecionado, setMedicoSelecionado] = useState('');

  useEffect(() => {
    const storedExames = JSON.parse(localStorage.getItem('exames')) || [];
    const storedMedicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const storedPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    setExames(storedExames);
    setMedicos(storedMedicos);
    setPacientes(storedPacientes);
  }, []);

  const handleExameChange = (e) => {
    const { value, checked } = e.target;
    setExamesSelecionados(prev =>
      checked ? [...prev, value] : prev.filter(exame => exame !== value)
    );
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("Centro Clínico EXEMPLO - RJ", 20, 20);
    doc.setFontSize(10);
    doc.text("CNPJ: 11.111.111/0001-11", 20, 25);
    doc.text("Rua QUALQUER UMA NUMERO NINGUEM LIGA ANDAR 12", 20, 30);

    doc.text(`Paciente: ${pacienteSelecionado}`, 20, 50);
    doc.text(`Médico: ${medicoSelecionado}`, 20, 55);
    doc.text(`Data do Atendimento: ${new Date().toLocaleDateString()}`, 20, 60);

    if (observacoes) {
      doc.text("Observações:", 20, 75);
      doc.text(observacoes, 20, 80);
    }

    doc.autoTable({
      startY: observacoes ? 90 : 75,
      head: [['Exame(s)']],
      body: examesSelecionados.map(exame => [exame]),
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      margin: { left: 20, right: 20 }
    });

    const yPosition = doc.lastAutoTable.finalY + 30;
    doc.line(20, yPosition, 120, yPosition);
    doc.text("Assinatura / Carimbo do Médico", 20, yPosition + 10);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, yPosition + 20);

    doc.save(`Guia_Exames_${pacienteSelecionado}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  return (
    <div className="container pedido-exames">
      <h2>Guia de Exames</h2>

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
            {pacientes.map(p => (
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
            {medicos.map(m => (
              <option key={m.id} value={m.usuario || m.nome}>
                {m.usuario || m.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-12">
          <h4>Exames Disponíveis:</h4>
          {exames.map(exame => (
            <div className="form-check" key={exame.id}>
              <input
                type="checkbox"
                className="form-check-input"
                value={exame.nome}
                id={`exame-${exame.id}`}
                checked={examesSelecionados.includes(exame.nome)}
                onChange={handleExameChange}
              />
              <label className="form-check-label" htmlFor={`exame-${exame.id}`}>
                {exame.nome}
              </label>
            </div>
          ))}
        </div>

        <div className="col-md-12">
          <label>Observações:</label>
          <textarea
            className="form-control"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows="4"
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Gerar Guia de Exame(s) em PDF
          </button>
        </div>
      </form>
    </div>
  );
}

export default PedidoExames;
