import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/PreAgenda.css';


function PreAgenda() {
  const [preAgendas, setPreAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Função para buscar as pré-agendas no backend
  const fetchPreAgendas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pre-agendamentos/listar');
      setPreAgendas(response.data.data); // Assuma que o backend retorna os dados na chave 'data'
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar pré-agendas:', error);
      setLoading(false);
    }
  };

  // Carregar as pré-agendas ao montar o componente
  useEffect(() => {
    fetchPreAgendas();
  }, []);

  // Função para iniciar o processo de confirmação
  const handleConfirmar = (preAgenda) => {
    // Passa as informações da pré-agenda para o cadastro
    navigate('/cadastroMB', {
      state: {
        userId: preAgenda.user_id,
        nome: preAgenda.nome,
        email: preAgenda.email,
        telefone: preAgenda.telefone,
        preAgendaId: preAgenda.id, // Envia o ID para criar a consulta no futuro
      },
    });
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="pre-agenda-container">
      <h1>Pré-Agendas</h1>
      {preAgendas.length === 0 ? (
        <p>Nenhuma pré-agenda disponível no momento.</p>
      ) : (
        <table className="pre-agenda-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Modalidade</th>
              <th>Data Desejada</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {preAgendas.map((preAgenda) => (
              <tr key={preAgenda.id}>
                <td>{preAgenda.nome || 'Nome não informado'}</td>
                <td>{preAgenda.telefone}</td>
                <td>{preAgenda.modalidade}</td>
                <td>{new Date(preAgenda.data_desejada).toLocaleString()}</td>
                <td>{preAgenda.status}</td>
                <td>
                  <button
                    onClick={() => handleConfirmar(preAgenda)}
                    className="btn-confirmar"
                  >
                    Confirmar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PreAgenda;
