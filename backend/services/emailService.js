const nodemailer = require('nodemailer');

const sendConsultaConfirmation = async ({ pacienteEmail, pacienteNome, consulta, tipoConsulta }) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_FROM) return false;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined,
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM, to: pacienteEmail, subject: 'Confirmação de Consulta',
    text: `Olá ${pacienteNome},\n\nSua consulta foi agendada com sucesso!\nTítulo: ${consulta.titulo}\nData: ${new Date(consulta.inicio).toLocaleDateString('pt-BR')}\nModalidade: ${consulta.modalidade}\nTipo de Consulta: ${tipoConsulta.descricao}\nValor: R$${tipoConsulta.valor.toFixed(2)}`,
  });
  return true;
};

module.exports = { sendConsultaConfirmation };
