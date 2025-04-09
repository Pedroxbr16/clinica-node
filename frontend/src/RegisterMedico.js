import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/RegisterMedico.css';

function RegisterMedico() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [crm, setCrm] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoMedico = {
      id: Date.now(),
      usuario,
      crm,
      dataNascimento,
      email,
      celular,
      cpf,
      cep,
      numero,
      bairro,
      cidade,
      estado,
    };

    const medicosSalvos = JSON.parse(localStorage.getItem('medicos')) || [];
    medicosSalvos.push(novoMedico);
    localStorage.setItem('medicos', JSON.stringify(medicosSalvos));

    Swal.fire({
      icon: 'success',
      title: 'Cadastro realizado',
      text: 'Médico cadastrado com sucesso!',
    }).then(() => navigate('/login'));
  };

  const handleCepBlur = async () => {
    if (cep.length === 9) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setBairro(data.bairro);
          setCidade(data.localidade);
          setEstado(data.uf);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'CEP não encontrado',
            text: 'Verifique o CEP informado e tente novamente.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao buscar CEP',
          text: 'Não foi possível buscar o CEP. Verifique sua conexão e tente novamente.',
        });
      }
    }
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100">
      <div className="register-container bg-light p-4 shadow-sm rounded">
        <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
          Voltar
        </button>

        <h2 className="text-center mb-4">Registrar Médico</h2>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>CRM</label>
              <input
                type="text"
                className="form-control"
                value={crm}
                onChange={(e) => setCrm(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Data de Nascimento</label>
              <input
                type="date"
                className="form-control"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Celular</label>
              <InputMask
                mask="(99) 99999-9999"
                className="form-control"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>CPF</label>
              <InputMask
                mask="999.999.999-99"
                className="form-control"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>CEP</label>
              <InputMask
                mask="99999-999"
                className="form-control"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={handleCepBlur}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Número</label>
              <input
                type="text"
                className="form-control"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Bairro</label>
              <input
                type="text"
                className="form-control"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Cidade</label>
              <input
                type="text"
                className="form-control"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Estado</label>
              <select
                className="form-select"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              >
                <option value="">Selecione um Estado</option>
                {estadosBrasileiros.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Cadastrar Médico
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterMedico;
