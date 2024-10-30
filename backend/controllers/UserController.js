const connection = require('../config/database');

// Função para criar um novo usuário
exports.createUsuario = async (req, res) => {
  try {
    const { nome, email, funcao, senha } = req.body;

    // Verifica se já existe um usuário com o mesmo e-mail ou nome
    const usuarioExistente = await Usuario.findOne({
      where: {
        [Op.or]: [{ email }, { nome }]
      }
    });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'E-mail ou nome já está em uso' });
    }

    // Cria o novo usuário
    const usuario = await Usuario.create({ nome, email, funcao, senha });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
};

// Função para listar todos os usuários
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários', error });
  }
};
