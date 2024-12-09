const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config(); // Carrega as variáveis do .env
const connection = require('../config/database');


const pacienteRoutes = require('../routes/pacienteRoutes'); 
const medicoRoutes = require('../routes/medicoRoutes');
const atendenteRoutes = require('../routes/atendenteRoutes');
const authRoutes = require('../routes/authRoutes');
const consultaRoutes = require('../routes/consultaRoutes');
const tipoConsultaRoutes = require('../routes/tipoConsultaRoutes');
const historicoRoutes = require('../routes/historicoRoutes');
const Exames = require('../routes/ExameRoutes');
const users = require('../routes/mobile/usersRoutes');
const preAgendamentoRoutes = require('../routes/mobile/preAgendamentoRoutes');
const pagamentoRoutes = require('../routes/pagamentosRoutes');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuração do CORS
const corsOrigins = process.env.CORS_ORIGINS.split(','); // Divide as origens configuradas no .env
app.use(cors({
  origin: corsOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/pacientes', pacienteRoutes);
app.use('/medicos', medicoRoutes);
app.use('/atendente', atendenteRoutes);
app.use('/api', authRoutes);
app.use('/consultas', consultaRoutes);
app.use('/tipos_consulta', tipoConsultaRoutes);
app.use('/historico', historicoRoutes);
app.use('/exames', Exames);
app.use('/pagamentos', pagamentoRoutes);

// rotas do mobile
app.use('/user', users);
app.use('/pre-agendamentos', preAgendamentoRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Logger básico de requisições
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.get("/finance/dashboard", (req, res) => {
  const { month, year } = req.query;

  // Validação de entrada
  if (!month || !year) {
    return res.status(400).json({ error: "Mês e ano são obrigatórios" });
  }

  // Total da Receita
  connection.query(
    `SELECT SUM(tc.valor) AS total
     FROM consulta c
     JOIN tipos_consulta tc ON c.tipo_consulta_id = tc.id
     WHERE MONTH(c.inicio) = ? AND YEAR(c.inicio) = ?`,
    [month, year],
    (err, totalRevenueResult) => {
      if (err) {
        console.error("Erro ao buscar receita total:", err);
        return res.status(500).json({ error: "Erro ao buscar receita total" });
      }

      const totalRevenue = totalRevenueResult[0]?.total || 0;

      // Total de Consultas
      connection.query(
        `SELECT COUNT(*) AS total
         FROM consulta
         WHERE MONTH(inicio) = ? AND YEAR(inicio) = ?`,
        [month, year],
        (err, totalAppointmentsResult) => {
          if (err) {
            console.error("Erro ao buscar total de consultas:", err);
            return res.status(500).json({ error: "Erro ao buscar total de consultas" });
          }

          const totalAppointments = totalAppointmentsResult[0]?.total || 0;

          // Dados para Gráficos
          connection.query(
            `SELECT DAY(c.inicio) AS day, SUM(tc.valor) AS total
             FROM consulta c
             JOIN tipos_consulta tc ON c.tipo_consulta_id = tc.id
             WHERE MONTH(c.inicio) = ? AND YEAR(c.inicio) = ?
             GROUP BY DAY(c.inicio)`,
            [month, year],
            (err, revenueChartData) => {
              if (err) {
                console.error("Erro ao buscar dados para gráficos:", err);
                return res.status(500).json({ error: "Erro ao buscar dados para gráficos" });
              }

              const labels = revenueChartData.map((row) => `Dia ${row.day}`);
              const revenue = revenueChartData.map((row) => row.total);

              // Resposta final
              res.json({
                totalRevenue,
                totalAppointments,
                revenueChartData: revenue,
                labels,
              });
            }
          );
        }
      );
    }
  );
});

