const consultaService = require('../services/consultaService');
const emailService = require('../services/emailService');
const asyncHandler = require('../utils/asyncHandler');

const requiredFields = ['titulo', 'inicio', 'fim', 'paciente_id', 'medico_id', 'tipo_consulta_id', 'modalidade'];
const validConsulta = (data) => requiredFields.every((field) => data[field]);

exports.createConsulta = asyncHandler(async (req, res) => {
  if (!validConsulta(req.body)) return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  const tipoConsulta = await consultaService.findTipoConsulta(req.body.tipo_consulta_id);
  if (!tipoConsulta) return res.status(404).json({ error: 'Tipo de consulta não encontrado.' });

  const consulta = await consultaService.create(req.body);
  let emailSent = false;
  if (req.body.pacienteEmail && req.body.pacienteNome) {
    try {
      emailSent = await emailService.sendConsultaConfirmation({
        pacienteEmail: req.body.pacienteEmail, pacienteNome: req.body.pacienteNome, consulta, tipoConsulta,
      });
    } catch (error) {
      console.error('Consulta criada, mas o e-mail não foi enviado:', error.message);
    }
  }
  res.status(201).json({
    id: consulta.id,
    message: emailSent ? 'Consulta criada e e-mail enviado com sucesso!' : 'Consulta criada com sucesso!',
  });
});
exports.getConsultas = asyncHandler(async (_req, res) => res.json(await consultaService.list()));
exports.getConsultaById = asyncHandler(async (req, res) => {
  const consulta = await consultaService.findById(req.params.id);
  if (!consulta) return res.status(404).json({ message: 'Consulta não encontrada.' });
  res.json(consulta);
});
exports.updateConsulta = asyncHandler(async (req, res) => {
  if (!validConsulta(req.body)) return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  const consulta = await consultaService.update(req.params.id, req.body);
  if (!consulta) return res.status(404).json({ message: 'Consulta não encontrada.' });
  res.json({ message: 'Consulta atualizada com sucesso!' });
});
exports.deleteConsulta = asyncHandler(async (req, res) => {
  if (!await consultaService.remove(req.params.id)) return res.status(404).json({ message: 'Consulta não encontrada.' });
  res.json({ message: 'Consulta deletada com sucesso!' });
});
exports.getHorariosDisponiveis = asyncHandler(async (req, res) => {
  const { doctorId, date } = req.query;
  if (!doctorId || !date) return res.status(400).json({ error: 'Os parâmetros "doctorId" e "date" são obrigatórios.' });
  const ocupados = await consultaService.getHorariosOcupados(doctorId, date);
  const todos = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
  res.json({ data: todos.filter((horario) => !ocupados.includes(horario)) });
});
