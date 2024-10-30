// routes/MedicoRoutes.js
const express = require('express');
const MedicoController = require('../controllers/medicoController');

const router = express.Router();

// Rota para criar um novo médico
router.post('/medicos', MedicoController.createMedico);

// Rota para listar todos os médicos
router.get('/medicos', MedicoController.getMedicos);

// Rota para buscar um médico por ID
router.get('/medicos/:id', MedicoController.getMedicoById);

// Rota para atualizar um médico
router.put('/medicos/:id', MedicoController.updateMedico);

// Rota para deletar um médico
router.delete('/medicos/:id', MedicoController.deleteMedico);

module.exports = router;
