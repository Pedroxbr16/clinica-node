const connection = require('../../config/database'); // Certifique-se de importar sua configuração de conexão corretamente

const PreAgendamentoModel = {
  // Criar um novo pré-agendamento
  create: (data, callback) => {
    const query = `
      INSERT INTO pre_agendamento (userId, doctorId, modalidade, date, phone)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [data.userId, data.doctorId, data.modalidade, data.date, data.phone];
    connection.query(query, values, callback);
  },

  // Listar todos os pré-agendamentos
  list: (callback) => {
    const query = `SELECT * FROM pre_agendamento`;
    connection.query(query, callback);
  },

  // Buscar um pré-agendamento por ID
  findById: (id, callback) => {
    const query = `SELECT * FROM pre_agendamento WHERE id = ?`;
    connection.query(query, [id], callback);
  },

  // Atualizar um pré-agendamento por ID
  update: (id, data, callback) => {
    const query = `
      UPDATE pre_agendamento
      SET userId = ?, doctorId = ?, modalidade = ?, date = ?, phone = ?
      WHERE id = ?
    `;
    const values = [data.userId, data.doctorId, data.modalidade, data.date, data.phone, id];
    connection.query(query, values, callback);
  },

  // Deletar um pré-agendamento por ID
  delete: (id, callback) => {
    const query = `DELETE FROM pre_agendamento WHERE id = ?`;
    connection.query(query, [id], callback);
  },
  
  findByUserId: (userId, callback) => {
    const query = `SELECT * FROM pre_agendamento WHERE userId = ?`;
    connection.query(query, [userId], callback);
  },


};




module.exports = PreAgendamentoModel;
