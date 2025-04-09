import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReceitaMedica() {
  const [medicamentos, setMedicamentos] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [medicoSelecionado, setMedicoSelecionado] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const storedMedicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const storedPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    setMedicos(storedMedicos);
    setPacientes(storedPacientes);
  }, []);

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

    // Medicamentos Prescritos
    doc.text("Medicamentos Prescritos:", 20, 80);
    doc.text(medicamentos, 20, 90, { maxWidth: 170 });

    // Observações
    if (observacoes) {
      doc.text("Observações:", 20, 120);
      doc.text(observacoes, 20, 130, { maxWidth: 170 });
    }

    // Linha e assinatura
    const yPosition = 150;
    doc.line(20, yPosition, 120, yPosition);
    doc.text("Assinatura / Carimbo do Médico", 20, yPosition + 10);

    doc.save(`Receita_Medica_${pacienteSelecionado}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  return (
    <div className="container">
      <h2>Receita Médica</h2>

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
          <label>Medicamentos:</label>
          <textarea
            className="form-control"
            value={medicamentos}
            onChange={(e) => setMedicamentos(e.target.value)}
            rows="4"
            placeholder="Descreva os medicamentos..."
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
            Gerar Receita Médica em PDF
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReceitaMedica;
