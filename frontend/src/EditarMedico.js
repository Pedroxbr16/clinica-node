import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import axios from 'axios';
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
    const fetchMedicoData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/medicos/medicos/${medicoId}`);
        const data = response.data.data || response.data;

        setUsuario(data.usuario || '');
        setCrm(data.crm || '');
        const formattedDate = data.data_nascimento ? data.data_nascimento.split('T')[0] : '';
        setDataNascimento(formattedDate);
        setEmail(data.email || '');
        setCelular(data.celular || '');
        setCpf(data.cpf || '');
        setCep(data.cep || '');
        setNumero(data.numero || '');
        setBairro(data.bairro || '');
        setCidade(data.cidade || '');
        setEstado(data.estado || '');

        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados do médico:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao carregar os dados do médico.',
        });
        setIsLoading(false);
      }
    };
    fetchMedicoData();
  }, [medicoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
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
      await axios.put(`http://localhost:5000/medicos/medicos/${medicoId}`, payload);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Médico atualizado com sucesso!',
        confirmButtonText: 'Ok',
      }).then(() => {
        navigate('/medicos');
      });
    } catch (error) {
      console.error('Erro ao atualizar médico:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao atualizar o médico. Por favor, tente novamente.',
      });
    }
  };

  const handleCepBlur = async () => {
    if (cep.length === 9) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data && !response.data.erro) {
          setBairro(response.data.bairro || '');
          setCidade(response.data.localidade || '');
          setEstado(response.data.uf || '');
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'CEP não encontrado.',
          });
        }
      } catch (error) {
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

  if (isLoading) {
    return <div className="text-center">Carregando dados do médico...</div>;
  }

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100">
      <div className="register-container bg-light p-4 shadow-sm rounded">
        {/* Título e Botão de Voltar na mesma linha */}
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
              <label htmlFor="usuario">Nome</label>
              <input
                type="text"
                id="usuario"
                className="form-control"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="crm">CRM</label>
              <input
                type="text"
                id="crm"
                className="form-control"
                value={crm}
                onChange={(e) => setCrm(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <input
                type="date"
                id="dataNascimento"
                className="form-control"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="celular">Celular</label>
              <InputMask
                mask="(99) 99999-9999"
                type="text"
                id="celular"
                className="form-control"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="cpf">CPF</label>
              <InputMask
                mask="999.999.999-99"
                type="text"
                id="cpf"
                className="form-control"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="cep">CEP</label>
              <InputMask
                mask="99999-999"
                type="text"
                id="cep"
                className="form-control"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={handleCepBlur}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="numero">Número</label>
              <input
                type="text"
                id="numero"
                className="form-control"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="bairro">Bairro</label>
              <input
                type="text"
                id="bairro"
                className="form-control"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                id="cidade"
                className="form-control"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
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
            Atualizar Médico
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditarMedico;
