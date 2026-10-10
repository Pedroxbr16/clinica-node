const atendenteService = require('../services/atendenteService');
const asyncHandler = require('../utils/asyncHandler');

exports.login = asyncHandler(async (req, res) => {
  const { usuario, senha } = req.body;
  if (!usuario || !senha) return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  const user = await atendenteService.authenticate(usuario, senha);
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
  res.json({ message: 'Login bem-sucedido', role: user.funcao || 'atendente' });
});
