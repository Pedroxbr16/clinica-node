const express = require('express');
const usuarioController = require('../controllers/UserController');
const router = express.Router();

// Rota POST para criar um novo usuário
router.post('/usuarios', usuarioController.createUsuario);

// Rota GET para listar todos os usuários
router.get('/usuarios', usuarioController.getUsuarios);

module.exports = router;
