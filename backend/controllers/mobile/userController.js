const userService = require('../../services/mobileUserService');
const asyncHandler = require('../../utils/asyncHandler');

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
  if (await userService.findByEmail(email)) return res.status(400).json({ message: 'E-mail já cadastrado.' });
  const user = await userService.create(req.body);
  res.status(201).json({ message: 'Usuário criado com sucesso!', userId: user.id });
});
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  const user = await userService.authenticate(email, password);
  if (!user) return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
  user.senha = undefined;
  user.password = undefined;
  res.json({ message: 'Login realizado com sucesso!', user });
});
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await userService.update(req.params.id, req.body);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
  res.json({ message: 'Usuário atualizado com sucesso!' });
});
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
  res.json(user);
});
