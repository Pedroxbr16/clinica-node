import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import 'bootstrap/dist/css/bootstrap.min.css';

function PedidoExames() {
  const [examesSelecionados, setExamesSelecionados] = useState([]);
  const [observacoes, setObservacoes] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');

  const pacientesDisponiveis = [
    'João Silva',
    'Maria Oliveira',
    'Pedro Santos',
    'Ana Souza',
    'Carlos Pereira'
  ];

  const examesDisponiveis = [
    'Hemograma Completo',
    'Raio-X',
    'Tomografia Computadorizada',
    'Ressonância Magnética',
    'Ultrassonografia',
    'Teste de Esforço',
    'Eletrocardiograma',
    'Glicemia de Jejum',
    'Colesterol Total',
    'Triglicerídeos'
  ];

  const handleExameChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setExamesSelecionados((prevExames) => [...prevExames, value]);
    } else {
      setExamesSelecionados((prevExames) =>
        prevExames.filter((exame) => exame !== value)
      );
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Cabeçalho
    doc.setFontSize(12);
    doc.text("Centro Clínico Duque de Caxias - RJ", 20, 20);
    doc.setFontSize(10);
    doc.text("CNPJ: 44.649.812/0206-78", 20, 25);
    doc.text("Rua Prof. José de Souza Herdy - 1216 - Box 310 3º Andar", 20, 30);

    // Informações do Paciente
    doc.text(`Paciente: ${pacienteSelecionado}`, 20, 50);
    doc.text(`Data do Atendimento: ${new Date().toLocaleDateString()}`, 20, 55);

    // Observações
    if (observacoes) {
      doc.text("Observações:", 20, 70);
      doc.text(observacoes, 20, 75);
    }

    // Tabela de Exames com `autotable`
    doc.autoTable({
      startY: observacoes ? 85 : 70,
      head: [['Exame']],
      body: examesSelecionados.map(exame => [exame]),
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      margin: { left: 20, right: 20 }
    });

    // Assinatura do Médico
    doc.text("Dr. (a) Nome do Médico", 20, doc.lastAutoTable.finalY + 20);
    doc.text("CRM: 52544253", 20, doc.lastAutoTable.finalY + 25);
    doc.text(`Data da Receita: ${new Date().toLocaleDateString()}`, 20, doc.lastAutoTable.finalY + 30);

    // Salvar PDF
    doc.save(`Pedido_Exames_${pacienteSelecionado}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  return (
    <div className="container pedido-exames">
      <h2>Pedido de Exames</h2>

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
            {pacientesDisponiveis.map((paciente, index) => (
              <option key={index} value={paciente}>
                {paciente}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-12">
          <h4>Exames Disponíveis:</h4>
          {examesDisponiveis.map((exame, index) => (
            <div className="form-check" key={index}>
              <input
                type="checkbox"
                className="form-check-input"
                value={exame}
                id={`exame-${index}`}
                checked={examesSelecionados.includes(exame)}
                onChange={handleExameChange}
              />
              <label className="form-check-label" htmlFor={`exame-${index}`}>
                {exame}
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
            Gerar Pedido de Exames em PDF
          </button>
        </div>
      </form>
    </div>
  );
}

export default PedidoExames;
