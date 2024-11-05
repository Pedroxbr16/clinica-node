const express = require('express');
const pacienteController = require('../controllers/pacienteController');
const multer = require('multer');

const router = express.Router();

// Configuração do multer para armazenar imagens na pasta 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Rota POST para criar paciente (com upload de foto)
router.post('/pacientes', upload.single('foto'), pacienteController.createPaciente);

// Rota GET para listar pacientes
router.get('/pacientes', pacienteController.getPacientes);

// Rota DELETE para excluir um paciente pelo ID
router.delete('/:id', pacienteController.deletePaciente);

module.exports = router;