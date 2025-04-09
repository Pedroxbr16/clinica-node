import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/TipoExame.css';

const Exame = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [exames, setExames] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('exames');
    if (stored) setExames(JSON.parse(stored));
  }, []);

  const salvarLocalStorage = (data) => {
    localStorage.setItem('exames', JSON.stringify(data));
    setExames(data);
  };

  const handleAddExame = () => {
    if (nome.trim() === '') {
      return Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'O nome do exame é obrigatório.',
      });
    }

    const novoExame = {
      id: Date.now(),
      nome: nome.trim(),
    };

    const atualizados = [...exames, novoExame];
    salvarLocalStorage(atualizados);
    setNome('');

    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: 'Exame adicionado com sucesso!',
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá desfazer esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const atualizados = exames.filter((exame) => exame.id !== id);
        salvarLocalStorage(atualizados);
        Swal.fire('Excluído!', 'Exame excluído com sucesso.', 'success');
      }
    });
  };

  const handleEdit = async (id, nomeAtual) => {
    const { value: novoNome } = await Swal.fire({
      title: 'Editar Exame',
      input: 'text',
      inputLabel: 'Novo nome do exame',
      inputValue: nomeAtual,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value.trim() === '') return 'O nome do exame é obrigatório!';
      },
    });

    if (novoNome) {
      const atualizados = exames.map((exame) =>
        exame.id === id ? { ...exame, nome: novoNome.trim() } : exame
      );
      salvarLocalStorage(atualizados);
      Swal.fire('Atualizado!', 'Exame editado com sucesso.', 'success');
    }
  };

  return (
    <div className="container exame-container mt-5 p-4">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        Voltar
      </button>

      <h2 className="text-center mb-4">Adicionar Exame</h2>
      <div className="form-group">
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          className="form-control"
          placeholder="Digite o nome do exame"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-100 my-3" onClick={handleAddExame}>
        Adicionar
      </button>

      <h3 className="text-center mb-3">Exames Existentes</h3>
      <div className="exame-list table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {exames.length > 0 ? (
              exames.map((exame) => (
                <tr key={exame.id}>
                  <td>{exame.id}</td>
                  <td>{exame.nome}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => handleEdit(exame.id, exame.nome)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => handleDelete(exame.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">Nenhum exame encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Exame;
