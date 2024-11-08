// routes/tipoConsultaRoutes.js
const express = require('express');
const router = express.Router();
const tipoConsultaController = require('../controllers/tipoConsultaController');

// Rota para criar um novo tipo de consulta
router.post('/adiciona', tipoConsultaController.createTipoConsulta);

// Rota para listar todos os tipos de consulta
router.get('/lista', tipoConsultaController.getTiposConsulta);

// Rota para obter um tipo de consulta por ID
router.get('/:id', tipoConsultaController.getTipoConsultaById);

// Rota para atualizar um tipo de consulta por ID
router.put('/:id', tipoConsultaController.updateTipoConsulta);

// Rota para deletar um tipo de consulta por ID
router.delete('/:id', tipoConsultaController.deleteTipoConsulta);

module.exports = router;
