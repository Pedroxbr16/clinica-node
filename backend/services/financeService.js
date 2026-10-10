const Consulta = require('../models/consultaModels');

const dashboard = async (month, year) => {
  const start = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  const end = new Date(Date.UTC(Number(year), Number(month), 1));
  const dados = await Consulta.aggregate([
    { $match: { inicio: { $gte: start, $lt: end } } },
    { $lookup: { from: 'tipoconsultas', localField: 'tipo_consulta_id', foreignField: '_id', as: 'tipo' } },
    { $unwind: { path: '$tipo', preserveNullAndEmptyArrays: true } },
    { $group: { _id: { $dayOfMonth: '$inicio' }, total: { $sum: { $ifNull: ['$tipo.valor', 0] } }, consultas: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  return {
    totalRevenue: dados.reduce((sum, item) => sum + item.total, 0),
    totalAppointments: dados.reduce((sum, item) => sum + item.consultas, 0),
    revenueChartData: dados.map((item) => item.total),
    labels: dados.map((item) => `Dia ${item._id}`),
  };
};

module.exports = { dashboard };
