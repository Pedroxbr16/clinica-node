import React, { useState } from 'react';
import axios from 'axios';

const PacienteForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
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
    foto: null, // Inicializar como null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      foto: e.target.files[0], // Lida com o upload de arquivo
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(); // Usar FormData para incluir arquivos
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/pacientes/pacientes', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Paciente cadastrado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar paciente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
      <input type="text" name="cep" placeholder="CEP" value={formData.cep} onChange={handleChange} required />
      <input type="text" name="numero" placeholder="Número" value={formData.numero} onChange={handleChange} required />
      <input type="text" name="bairro" placeholder="Bairro" value={formData.bairro} onChange={handleChange} required />
      <input type="text" name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} required />
      <input type="text" name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} required />
      <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required />
      <input type="text" name="cnpj" placeholder="CNPJ" value={formData.cnpj} onChange={handleChange} />
      <input type="date" name="nascimento" value={formData.nascimento} onChange={handleChange} required />
      <input type="text" name="genero" placeholder="Gênero" value={formData.genero} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} />
      <input type="text" name="celular" placeholder="Celular" value={formData.celular} onChange={handleChange} required />
      <input type="file" name="foto" onChange={handleFileChange} />

      <button type="submit">Cadastrar Paciente</button>
    </form>
  );
};

export default PacienteForm;
