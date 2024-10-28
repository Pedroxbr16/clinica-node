import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/listagemPaciente.css';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null);     // Estado de erro

  useEffect(() => {
    // Função para buscar os pacientes
    const fetchPacientes = async () => {
      try {
        // Fazendo a requisição GET usando Axios
        const response = await axios.get('http://localhost:5000/pacientes/pacientes');
        setPacientes(response.data); // Atualiza o estado com os dados recebidos
        setLoading(false);           // Finaliza o carregamento
      } catch (err) {
        console.error('Erro ao buscar pacientes:', err);
        setError('Erro ao buscar pacientes. Por favor, tente novamente mais tarde.');
        setLoading(false);           // Finaliza o carregamento mesmo em caso de erro
      }
    };

    fetchPacientes();
  }, []); // O array vazio [] garante que o useEffect execute apenas uma vez após a montagem do componente

  // Filtrar os pacientes com base no termo de busca
  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Renderizar diferentes estados (carregando, erro, lista de pacientes)
  return (
    <div className="container">
      <h2>Pacientes Cadastrados</h2>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar paciente..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Estado de carregamento */}
      {loading && <p>Carregando pacientes...</p>}

      {/* Estado de erro */}
      {error && <p className="error">{error}</p>}

      {/* Tabela de pacientes */}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Celular</th>
              {/* Adicione mais colunas conforme necessário */}
            </tr>
          </thead>
          <tbody>
            {filteredPacientes.length > 0 ? (
              filteredPacientes.map((paciente) => (
                <tr key={paciente.id}> {/* Use um identificador único, como ID */}
                  <td>{paciente.nome}</td>
                  <td>{formatCPF(paciente.cpf)}</td> {/* Formatar CPF para melhor visualização */}
                  <td>{paciente.email}</td>
                  <td>{formatTelefone(paciente.celular)}</td>
                  {/* Adicione mais campos conforme necessário */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhum paciente encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Função para formatar CPF (opcional)
const formatCPF = (cpf) => {
  if (!cpf) return '';
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Função para formatar telefone/celular (opcional)
const formatTelefone = (telefone) => {
  if (!telefone) return '';
  // Exemplo para celular com 11 dígitos: (XX) XXXXX-XXXX
  return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export default Pacientes;