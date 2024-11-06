const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Rota para autenticação do usuário (medico, atendente, usuario)
router.post('/login', authController.login);

module.exports = router;
