const User = require('../../models/mobile/User');

// Criar um novo usuário
exports.createUser = (req, res) => {
  const { name, email, password } = req.body;

  console.log("Tentativa de criar usuário:", { name, email });

  User.findUserByEmail(email, (err, existingUser) => {
    if (err) {
      console.error("Erro ao verificar e-mail:", err);
      return res.status(500).json({ message: 'Erro ao verificar e-mail', error: err });
    }

    if (existingUser) {
      console.warn("E-mail já cadastrado:", email);
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    User.createUser(name, email, password, (err, results) => {
      if (err) {
        console.error("Erro ao criar usuário:", err);
        return res.status(500).json({ message: 'Erro ao criar usuário', error: err });
      }

      console.log("Usuário criado com sucesso! ID:", results.insertId);
      res.status(201).json({ message: 'Usuário criado com sucesso!', userId: results.insertId });
    });
  });
};

// Login do usuário
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  console.log("Tentativa de login:", { email });

  User.authenticateUser(email, password, (err, user) => {
    if (err) {
      console.error("Erro ao verificar credenciais:", err);
      return res.status(500).json({ message: 'Erro ao verificar credenciais', error: err });
    }

    if (!user) {
      console.warn("Credenciais inválidas para o e-mail:", email);
      return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }

    console.log("Login realizado com sucesso para o usuário:", user.id);
    res.status(200).json({ message: 'Login realizado com sucesso!', user });
  });
};

// Atualizar um usuário
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  console.log("Tentativa de atualizar usuário:", { userId, name, email });

  User.updateUser(userId, name, email, password, (err, results) => {
    if (err) {
      console.error("Erro ao atualizar usuário:", err);
      return res.status(500).json({ message: 'Erro ao atualizar usuário.', error: err });
    }

    if (results.affectedRows === 0) {
      console.warn("Usuário não encontrado para o ID:", userId);
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    console.log("Usuário atualizado com sucesso! ID:", userId);
    res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  });
};
