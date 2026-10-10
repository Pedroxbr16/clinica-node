const fakeData = {
  atendentes: [
    { usuario: 'admin', email: 'admin@clinica.test', funcao: 'Administrador', senha: 'admin123' },
    { usuario: 'recepcao', email: 'recepcao@clinica.test', funcao: 'Atendente', senha: 'recepcao123' },
  ],
  pacientes: [
    {
      nome: 'Maria da Silva', cpf: '12345678901', nascimento: new Date('1990-05-15'), genero: 'Feminino',
      email: 'maria.silva@example.test', telefone: '1133334444', celular: '11999990001',
      cep: '01001000', numero: '100', bairro: 'Sé', cidade: 'São Paulo', estado: 'SP',
    },
    {
      nome: 'João Pereira', cpf: '98765432100', nascimento: new Date('1985-11-23'), genero: 'Masculino',
      email: 'joao.pereira@example.test', telefone: '1144445555', celular: '11999990002',
      cep: '20040020', numero: '250', bairro: 'Centro', cidade: 'Rio de Janeiro', estado: 'RJ',
    },
  ],
  medicos: [
    {
      usuario: 'Dra. Ana Costa', crm: 'CRM-SP 123456', data_nascimento: new Date('1978-02-10'),
      email: 'ana.costa@clinica.test', celular: '11988880001', cpf: '11122233344',
      cep: '01415000', numero: '42', bairro: 'Jardins', cidade: 'São Paulo', estado: 'SP',
    },
    {
      usuario: 'Dr. Carlos Mendes', crm: 'CRM-SP 654321', data_nascimento: new Date('1975-09-30'),
      email: 'carlos.mendes@clinica.test', celular: '11988880002', cpf: '55566677788',
      cep: '04038001', numero: '700', bairro: 'Vila Mariana', cidade: 'São Paulo', estado: 'SP',
    },
  ],
  tiposConsulta: [
    { descricao: 'Consulta clínica', valor: 180 },
    { descricao: 'Retorno', valor: 100 },
    { descricao: 'Teleconsulta', valor: 150 },
  ],
  exames: [
    { nome: 'Hemograma completo' },
    { nome: 'Glicemia em jejum' },
    { nome: 'Colesterol total e frações' },
  ],
  mobileUser: {
    name: 'Cliente Mobile', email: 'cliente.mobile@example.test', password: 'cliente123',
    cpf: '33344455566', data_de_nascimento: new Date('1992-08-20'), genero: 'Não informado',
  },
};

module.exports = fakeData;
