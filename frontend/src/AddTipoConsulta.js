import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/TipoConsulta.css';

const TipoConsulta = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tiposConsulta, setTiposConsulta] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const storedTipos = localStorage.getItem('tiposConsulta');
    if (storedTipos) {
      setTiposConsulta(JSON.parse(storedTipos));
    }
  }, []);

  const salvarLocalStorage = (data) => {
    localStorage.setItem('tiposConsulta', JSON.stringify(data));
    setTiposConsulta(data);
  };

  const handleAddTipoConsulta = () => {
    const numericValor = parseFloat(valor).toFixed(2);

    if (!descricao.trim() || isNaN(numericValor)) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Descrição e valor são obrigatórios, e o valor deve ser numérico.',
      });
      return;
    }

    const novoTipo = {
      id: Date.now(),
      descricao,
      valor: numericValor,
    };

    const atualizados = [...tiposConsulta, novoTipo];
    salvarLocalStorage(atualizados);

    setDescricao('');
    setValor('');
    Swal.fire({
      icon: 'success',
      title: 'Adicionado!',
      text: 'Tipo de consulta cadastrado com sucesso.',
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const atualizados = tiposConsulta.filter((tipo) => tipo.id !== id);
        salvarLocalStorage(atualizados);
        Swal.fire('Excluído!', 'O tipo de consulta foi removido.', 'success');
      }
    });
  };

  const handleEdit = async (id, atualDescricao, atualValor) => {
    const { value: novaDescricao } = await Swal.fire({
      title: 'Editar Descrição',
      input: 'text',
      inputValue: atualDescricao,
      inputLabel: 'Nova descrição',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return 'A descrição é obrigatória!';
      },
    });

    if (novaDescricao) {
      const { value: novoValor } = await Swal.fire({
        title: 'Editar Valor',
        input: 'text',
        inputValue: atualValor,
        inputLabel: 'Novo valor',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value || isNaN(parseFloat(value))) {
            return 'Digite um valor numérico válido!';
          }
        },
      });

      if (novoValor) {
        const atualizados = tiposConsulta.map((tipo) =>
          tipo.id === id ? { ...tipo, descricao: novaDescricao, valor: parseFloat(novoValor).toFixed(2) } : tipo
        );
        salvarLocalStorage(atualizados);
        Swal.fire('Editado!', 'Tipo de consulta atualizado com sucesso.', 'success');
      }
    }
  };

  return (
    <div className="container tipo-consulta-container mt-5 p-4">
      <h2 className="text-center mb-4">Adicionar Tipo de Consulta</h2>

      <div className="form-group">
        <label>Descrição:</label>
        <input
          type="text"
          className="form-control"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Valor:</label>
        <input
          type="text"
          className="form-control"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-100 my-3" onClick={handleAddTipoConsulta}>
        Adicionar
      </button>

      <h3 className="text-center mb-3">Tipos de Consulta Existentes</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tiposConsulta.length > 0 ? (
              tiposConsulta.map((tipo) => (
                <tr key={tipo.id}>
                  <td>{tipo.id}</td>
                  <td>{tipo.descricao}</td>
                  <td>R$ {parseFloat(tipo.valor).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => handleEdit(tipo.id, tipo.descricao, tipo.valor)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => handleDelete(tipo.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">Nenhum tipo de consulta encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TipoConsulta;
