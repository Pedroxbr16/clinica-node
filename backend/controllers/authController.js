const connection = require('../config/database');
const bcrypt = require('bcryptjs');

// Função de login
exports.login = (req, res) => {
  const { usuario, senha, userType } = req.body;

  // Selecionar a tabela correta com base no tipo de usuário
  let tableName;
  if (userType === 'medico') {
    tableName = 'medicos';
  } else if (userType === 'atendente') {
    tableName = 'atendente';
  } else if (userType === 'usuario') {
    tableName = 'usuarios';
  } else {
    return res.status(400).json({ error: 'Tipo de usuário inválido' });
  }

  // Consulta para buscar o usuário na tabela correta
  const query = `SELECT * FROM ${tableName} WHERE usuario = ?`;
  connection.query(query, [usuario], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    }

    // Verificar se o usuário foi encontrado
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const user = results[0];

    // Verificar a senha usando bcrypt (caso as senhas estejam armazenadas com hash)
    bcrypt.compare(senha, user.senha, (err, isMatch) => {
      if (err) {
        console.error('Erro ao verificar a senha:', err);
        return res.status(500).json({ error: 'Erro ao verificar a senha' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      // Retornar o tipo de usuário em caso de sucesso
      res.status(200).json({ message: 'Login bem-sucedido', userType });
    });
  });
};
