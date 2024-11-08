// models/consultaModel.js
const db = require('../config/database');

class ConsultaModel {
    static async createConsulta({ titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id }) {
        const sql = `INSERT INTO Consulta (titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id) VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await db.execute(sql, [titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id]);
        return result.insertId;
    }

    static async getConsultas() {
        const sql = `
            SELECT c.*, p.nome as paciente, m.nome as medico, tc.descricao as tipo_consulta 
            FROM Consulta c
            JOIN Pacientes p ON c.paciente_id = p.id
            JOIN Medicos m ON c.medico_id = m.id
            JOIN Tipos_Consulta tc ON c.tipo_consulta_id = tc.id
        `;
        const [rows] = await db.execute(sql);
        return rows;
    }

    static async getConsultaById(id) {
        const sql = `
            SELECT c.*, p.nome as paciente, m.nome as medico, tc.descricao as tipo_consulta 
            FROM Consulta c
            JOIN Pacientes p ON c.paciente_id = p.id
            JOIN Medicos m ON c.medico_id = m.id
            JOIN Tipos_Consulta tc ON c.tipo_consulta_id = tc.id
            WHERE c.id = ?
        `;
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    }

    static async updateConsulta(id, { titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id }) {
        const sql = `
            UPDATE Consulta
            SET titulo = ?, inicio = ?, fim = ?, paciente_id = ?, medico_id = ?, tipo_consulta_id = ?
            WHERE id = ?
        `;
        const [result] = await db.execute(sql, [titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, id]);
        return result.affectedRows > 0;
    }

    static async deleteConsulta(id) {
        const sql = `DELETE FROM Consulta WHERE id = ?`;
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = ConsultaModel;
