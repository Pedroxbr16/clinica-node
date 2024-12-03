const connection = require('../../config/database');

const PreAgendamentoModel = {
  // Criar um novo pré-agendamento
  create(preAgendamento, callback) {
    const sql = `
      INSERT INTO pre_agendamento 
      (user_id, medico_id, tipo_consulta_id, email, telefone, modalidade, data_desejada, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const { userId, doctorId, tipoConsultaId, email, phone, modalidade, date } = preAgendamento;
    connection.query(
      sql,
      [userId, doctorId, tipoConsultaId, email, phone, modalidade, date, 'Pendente'],
      callback
    );
  },

  // Listar todos os pré-agendamentos
  list(callback) {
    const sql = `
      SELECT 
        pa.id, 
        pa.user_id, 
        u.name AS nome, 
        pa.medico_id, 
        m.usuario AS medico_nome, 
        pa.tipo_consulta_id,
        tc.descricao AS tipo_consulta,
        pa.email, 
        pa.telefone, 
        pa.modalidade, 
        pa.data_desejada, 
        pa.status 
      FROM 
        pre_agendamento pa
      LEFT JOIN users u ON pa.user_id = u.id
      LEFT JOIN medicos m ON pa.medico_id = m.id
      LEFT JOIN tipos_consulta tc ON pa.tipo_consulta_id = tc.id
    `;
    connection.query(sql, callback);
  },

  // Buscar um pré-agendamento por ID
  findById(id, callback) {
    const sql = `
      SELECT 
        pa.id, 
        pa.user_id, 
        u.name AS nome, 
        pa.medico_id, 
        m.usuario AS medico_nome, 
        pa.tipo_consulta_id,
        tc.descricao AS tipo_consulta,
        pa.email, 
        pa.telefone, 
        pa.modalidade, 
        pa.data_desejada, 
        pa.status 
      FROM 
        pre_agendamento pa
      LEFT JOIN users u ON pa.user_id = u.id
      LEFT JOIN medicos m ON pa.medico_id = m.id
      LEFT JOIN tipos_consulta tc ON pa.tipo_consulta_id = tc.id
      WHERE pa.id = ?
    `;
    connection.query(sql, [id], callback);
  },

  // Atualizar um pré-agendamento por ID (dinâmico)
  update(id, updateFields, callback) {
    const keys = Object.keys(updateFields);
    const values = Object.values(updateFields);

    // Gera o SQL dinamicamente com os campos enviados
    const fields = keys.map((key) => `${key} = ?`).join(', ');

    const sql = `
      UPDATE pre_agendamento 
      SET ${fields} 
      WHERE id = ?
    `;
    connection.query(sql, [...values, id], callback);
  },

  // Deletar um pré-agendamento por ID
  delete(id, callback) {
    const sql = 'DELETE FROM pre_agendamento WHERE id = ?';
    connection.query(sql, [id], callback);
  },

  // Buscar pré-agendamentos por usuário
  findByUserId(userId, callback) {
    const sql = `
      SELECT 
        pa.id, 
        pa.user_id, 
        u.name AS nome, 
        pa.medico_id, 
        m.usuario AS medico_nome, 
        pa.tipo_consulta_id,
        tc.descricao AS tipo_consulta,
        pa.email, 
        pa.telefone, 
        pa.modalidade, 
        pa.data_desejada, 
        pa.status 
      FROM 
        pre_agendamento pa
      LEFT JOIN users u ON pa.user_id = u.id
      LEFT JOIN medicos m ON pa.medico_id = m.id
      LEFT JOIN tipos_consulta tc ON pa.tipo_consulta_id = tc.id
      WHERE pa.user_id = ?
    `;
    connection.query(sql, [userId], callback);
  },
};

module.exports = PreAgendamentoModel;
