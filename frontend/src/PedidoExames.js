import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PedidoExames() {
  const [examesSelecionados, setExamesSelecionados] = useState([]);
  const [observacoes, setObservacoes] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');

  // Lista de pacientes (pode ser carregada de uma API ou banco de dados)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pacienteSelecionado) {
      setSubmitStatus('Erro: Nenhum paciente foi selecionado.');
      return;
    }
    if (examesSelecionados.length === 0) {
      setSubmitStatus('Erro: Nenhum exame foi selecionado.');
      return;
    }

    // Aqui você pode enviar o pedido para o servidor
    const pedido = {
      paciente: pacienteSelecionado,
      exames: examesSelecionados,
      observacoes: observacoes,
    };

    console.log('Pedido enviado:', pedido);
    setSubmitStatus('Pedido de exames enviado com sucesso!');
    resetForm();
  };

  const resetForm = () => {
    setExamesSelecionados([]);
    setObservacoes('');
    setPacienteSelecionado('');
  };

  return (
    <div className="container pedido-exames">
      <h2>Pedido de Exames</h2>

      {submitStatus && (
        <div
          className={`alert ${
            submitStatus.includes('sucesso') ? 'alert-success' : 'alert-danger'
          }`}
          role="alert"
        >
          {submitStatus}
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-3">
        
        {/* Combobox de Seleção de Paciente */}
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

        {/* Lista de Exames Disponíveis */}
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

        {/* Observações */}
        <div className="col-md-12">
          <label>Observações:</label>
          <textarea
            className="form-control"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows="4"
          />
        </div>

        {/* Botão de Enviar */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Enviar Pedido de Exames
          </button>
        </div>
      </form>
    </div>
  );
}

export default PedidoExames;
