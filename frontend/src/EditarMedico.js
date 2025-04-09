import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditarMedico() {
  const { id: medicoId } = useParams();
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const medico = medicos.find((m) => String(m.id) === medicoId);

    if (!medico) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Médico não encontrado no localStorage.',
      });
      return;
    }

    setUsuario(medico.usuario || '');
    setCrm(medico.crm || '');
    setDataNascimento(medico.dataNascimento || '');
    setEmail(medico.email || '');
    setCelular(medico.celular || '');
    setCpf(medico.cpf || '');
    setCep(medico.cep || '');
    setNumero(medico.numero || '');
    setBairro(medico.bairro || '');
    setCidade(medico.cidade || '');
    setEstado(medico.estado || '');
    setIsLoading(false);
  }, [medicoId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMedico = {
      id: parseInt(medicoId),
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

    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const updatedMedicos = medicos.map((m) =>
      String(m.id) === medicoId ? updatedMedico : m
    );

    localStorage.setItem('medicos', JSON.stringify(updatedMedicos));

    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: 'Médico atualizado com sucesso!',
    }).then(() => navigate('/medicos'));
  };

  const handleCepBlur = async () => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setBairro(data.bairro || '');
          setCidade(data.localidade || '');
          setEstado(data.uf || '');
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'CEP não encontrado.',
          });
        }
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao buscar o CEP.',
        });
      }
    }
  };

  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ];

  if (isLoading) return <div className="text-center">Carregando dados do médico...</div>;

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100">
      <div className="register-container bg-light p-4 shadow-sm rounded">
        <div className="d-flex align-items-center mb-4">
          <button
            className="btn btn-secondary btn-sm me-3"
            style={{ width: '80px' }}
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>
          <h2 className="flex-grow-1 text-center mb-0">Editar Médico</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Nome</label>
              <input className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>CRM</label>
              <input className="form-control" value={crm} onChange={(e) => setCrm(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>Data de Nascimento</label>
              <input type="date" className="form-control" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>Celular</label>
              <InputMask mask="(99) 99999-9999" className="form-control" value={celular} onChange={(e) => setCelular(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>CPF</label>
              <InputMask mask="999.999.999-99" className="form-control" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>CEP</label>
              <InputMask mask="99999-999" className="form-control" value={cep} onChange={(e) => setCep(e.target.value)} onBlur={handleCepBlur} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>Número</label>
              <input className="form-control" value={numero} onChange={(e) => setNumero(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>Bairro</label>
              <input className="form-control" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>Cidade</label>
              <input className="form-control" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>Estado</label>
              <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)} required>
                <option value="">Selecione um Estado</option>
                {estadosBrasileiros.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100">Atualizar Médico</button>
        </form>
      </div>
    </div>
  );
}

export default EditarMedico;
