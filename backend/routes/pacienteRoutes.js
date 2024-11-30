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

// Rota GET para obter um paciente específico pelo ID
router.get('/pacientes/:id', pacienteController.getPacienteById);

// Rota GET para buscar um paciente específico pelo CPF
router.get('/pacientes/cpf/:cpf', pacienteController.getPacienteByCpf);

// Rota DELETE para excluir um paciente pelo ID
router.delete('/pacientes/:id', pacienteController.deletePaciente);

// Rota PUT para atualizar um paciente pelo ID (com upload de foto)
router.put('/pacientes/:id', upload.single('foto'), pacienteController.updatePaciente);

module.exports = router;
