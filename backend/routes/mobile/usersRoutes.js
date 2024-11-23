const express = require('express');
const router = express.Router();
const userController = require('../../controllers/mobile/userController'); // Certifique-se de que esse caminho está correto

// Rotas de usuários
router.post('/criar', userController.createUser); // Rota para criar um novo usuário
router.post('/login', userController.loginUser); // Rota para login de usuário
router.put('/atualizar/:id', userController.updateUser); // Rota para atualizar usuário

module.exports = router;
