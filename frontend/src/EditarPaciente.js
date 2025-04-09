import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';
import './css/CadastroPacientes.css';

function EditarPaciente() {
  const { id: pacienteId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
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

  const estadosBrasileiros = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

  useEffect(() => {
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const paciente = pacientes.find((p) => String(p.id) === pacienteId);

    if (!paciente) {
      Swal.fire('Erro', 'Paciente não encontrado.', 'error');
      return;
    }

    setFormData({ ...paciente });
    if (paciente.foto) {
      setFotoPreview(paciente.foto);
    }
  }, [pacienteId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, foto: reader.result }));
      setFotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const updatedPacientes = pacientes.map((p) =>
      String(p.id) === pacienteId ? { ...formData } : p
    );

    localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
    Swal.fire('Sucesso', 'Paciente atualizado com sucesso!', 'success').then(() => {
      navigate('/listagemPaciente');
    });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-secondary btn-sm" style={{ width: '80px' }} onClick={() => navigate(-1)}>
          Voltar
        </button>
        <h2 className="text-center flex-grow-1" style={{ marginLeft: '-80px' }}>Editar Paciente</h2>
      </div>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label>Nome:</label>
          <input type="text" name="nome" className="form-control" value={formData.nome} onChange={handleInputChange} required />
        </div>

        <div className="col-md-6">
          <label>Foto:</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
          {fotoPreview && (
            <div className="mt-2">
              <img src={fotoPreview} alt="Preview" className="img-thumbnail" style={{ maxHeight: '150px' }} />
            </div>
          )}
        </div>

        <div className="col-md-4">
          <label>CEP:</label>
          <InputMask mask="99999-999" className="form-control" name="cep" value={formData.cep} onChange={handleInputChange} />
        </div>

        <div className="col-md-4">
          <label>Número:</label>
          <input type="text" name="numero" className="form-control" value={formData.numero} onChange={handleInputChange} />
        </div>

        <div className="col-md-4">
          <label>Bairro:</label>
          <input type="text" name="bairro" className="form-control" value={formData.bairro} onChange={handleInputChange} />
        </div>

        <div className="col-md-6">
          <label>Cidade:</label>
          <input type="text" name="cidade" className="form-control" value={formData.cidade} onChange={handleInputChange} />
        </div>

        <div className="col-md-6">
          <label>Estado:</label>
          <select className="form-select" name="estado" value={formData.estado} onChange={handleInputChange}>
            <option value="">Selecione</option>
            {estadosBrasileiros.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label>CPF:</label>
          <InputMask mask="999.999.999-99" className="form-control" name="cpf" value={formData.cpf} onChange={handleInputChange} />
        </div>

        <div className="col-md-6">
          <label>CNPJ:</label>
          <InputMask mask="99.999.999/9999-99" className="form-control" name="cnpj" value={formData.cnpj} onChange={handleInputChange} />
        </div>

        <div className="col-md-6">
          <label>Data de Nascimento:</label>
          <input type="date" name="nascimento" className="form-control" value={formData.nascimento} onChange={handleInputChange} />
        </div>

        <div className="col-md-6">
          <label>Gênero:</label>
          <select name="genero" className="form-select" value={formData.genero} onChange={handleInputChange}>
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="col-md-6">
          <label>Email:</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange} />
        </div>

        <div className="col-md-6">
          <label>Telefone:</label>
          <InputMask mask="(99) 9999-9999" name="telefone" className="form-control" value={formData.telefone} onChange={handleInputChange} />
        </div>

        <div className="col-md-6">
          <label>Celular:</label>
          <InputMask mask="(99) 99999-9999" name="celular" className="form-control" value={formData.celular} onChange={handleInputChange} />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100 mt-3">Atualizar</button>
        </div>
      </form>
    </div>
  );
}

export default EditarPaciente;
