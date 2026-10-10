const financeService = require('../services/financeService');
const asyncHandler = require('../utils/asyncHandler');

exports.dashboard = asyncHandler(async (req, res) => {
  const { month, year } = req.query;
  if (!month || !year || Number(month) < 1 || Number(month) > 12 || !Number.isInteger(Number(year))) {
    return res.status(400).json({ error: 'Mês e ano válidos são obrigatórios' });
  }
  res.json(await financeService.dashboard(month, year));
});
