import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import './css/CadastroPacientes.css';

function EditarPaciente() {
  const { id: pacienteId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    foto: null,
    cep: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cpf: '',
    cnpj: '',
    nascimento: '',
    genero: '',
    email: '',
    telefone: '',
    celular: '',
  });
  const [fotoPreview, setFotoPreview] = useState(null);

  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ];

  useEffect(() => {
    const fetchPacienteData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pacientes/pacientes/${pacienteId}`);
        const dataNascimento = response.data.nascimento
          ? new Date(response.data.nascimento).toISOString().split('T')[0]
          : '';
  
        setFormData({
          ...response.data,
          nascimento: dataNascimento,
        });
  
        if (response.data.foto) {
          console.log('Foto recebida:', response.data.foto); // Verifica a string Base64
          setFotoPreview(`data:image/png;base64,${response.data.foto}`); // Altere para PNG ou outro formato, se necessário.

        }
      } catch (error) {
        console.error('Erro ao buscar dados do paciente:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao buscar dados do paciente.',
        });
      }
    };
    fetchPacienteData();
  }, [pacienteId]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, foto: file });
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.put(`http://localhost:5000/pacientes/pacientes/${pacienteId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Paciente atualizado com sucesso!',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/listagemPaciente');
      });
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao atualizar paciente. Por favor, tente novamente.',
      });
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-secondary btn-sm"
          style={{ width: '80px', height: '30px', fontSize: '12px' }}
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
        <h2 className="text-center flex-grow-1" style={{ marginLeft: '-80px' }}>
          Editar Paciente
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            className="form-control"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
  <label>Foto:</label>
  <div className="input-group">
    <input
      type="file"
      name="foto"
      className="form-control"
      onChange={handleFileChange}
      accept="image/png, image/jpeg, image/jpg"
    />
    {fotoPreview && (
      <div className="mt-2">
        <img
          src={fotoPreview}
          alt="Pré-visualização"
          className="img-thumbnail"
          style={{ maxHeight: '150px' }}
        />
      </div>
    )}
  </div>
</div>


        <div className="col-md-4">
          <label>CEP:</label>
          <InputMask
            mask="99999-999"
            type="text"
            name="cep"
            className="form-control"
            value={formData.cep}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label>Número:</label>
          <input
            type="text"
            name="numero"
            className="form-control"
            value={formData.numero}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label>Bairro:</label>
          <input
            type="text"
            name="bairro"
            className="form-control"
            value={formData.bairro}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label>Cidade:</label>
          <input
            type="text"
            name="cidade"
            className="form-control"
            value={formData.cidade}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label>Estado:</label>
          <select
            name="estado"
            className="form-select"
            value={formData.estado}
            onChange={handleInputChange}
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

        <div className="col-md-6">
          <label>CPF:</label>
          <InputMask
            mask="999.999.999-99"
            type="text"
            name="cpf"
            className="form-control"
            value={formData.cpf}
            onChange={handleInputChange}
            required={!formData.cnpj}
          />
        </div>

        <div className="col-md-6">
          <label>CNPJ:</label>
          <InputMask
            mask="99.999.999/9999-99"
            type="text"
            name="cnpj"
            className="form-control"
            value={formData.cnpj}
            onChange={handleInputChange}
            required={!formData.cpf}
          />
        </div>

        <div className="col-md-6">
          <label>Data de Nascimento:</label>
          <input
            type="date"
            name="nascimento"
            className="form-control"
            value={formData.nascimento}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label>Gênero:</label>
          <select
            name="genero"
            className="form-select"
            value={formData.genero}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione um Gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="col-md-6">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label>Telefone:</label>
          <InputMask
            mask="(99) 9999-9999"
            type="text"
            name="telefone"
            className="form-control"
            value={formData.telefone}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-6">
          <label>Celular:</label>
          <InputMask
            mask="(99) 99999-9999"
            type="text"
            name="celular"
            className="form-control"
            value={formData.celular}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarPaciente;
