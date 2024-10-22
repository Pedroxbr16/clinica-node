const express = require('express');
const pacienteController = require('../controllers/pacienteController');
const multer = require('multer');

const router = express.Router();

// Configuração do multer para armazenar imagens na pasta 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Diretório onde as fotos serão armazenadas
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nome do arquivo com timestamp
  }
});

const upload = multer({ storage: storage });

// Rota POST para criar paciente (com upload de foto)
router.post('/pacientes', upload.single('foto'), pacienteController.createPaciente);

module.exports = router;
