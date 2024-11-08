// models/tipoConsultaModel.js
const connection = require('../config/database');

class TipoConsultaModel {

    // Método para criar um novo tipo de consulta
    static createTipoConsulta(descricao, callback) {
        connection.query(
            'INSERT INTO Tipos_Consulta (descricao) VALUES (?)',
            [descricao],
            (error, result) => {
                if (error) return callback(error, null);
                callback(null, result.insertId);
            }
        );
    }

    // Método para obter todos os tipos de consulta
    static getAllTiposConsulta(callback) {
        connection.query(
            'SELECT * FROM Tipos_Consulta',
            (error, rows) => {
                if (error) return callback(error, null);
                callback(null, rows);
            }
        );
    }

    // Método para obter um tipo de consulta pelo ID
    static getTipoConsultaById(id, callback) {
        connection.query(
            'SELECT * FROM Tipos_Consulta WHERE id = ?',
            [id],
            (error, rows) => {
                if (error) return callback(error, null);
                callback(null, rows[0]);
            }
        );
    }

    // Método para atualizar um tipo de consulta pelo ID
    static updateTipoConsulta(id, descricao, callback) {
        connection.query(
            'UPDATE Tipos_Consulta SET descricao = ? WHERE id = ?',
            [descricao, id],
            (error, result) => {
                if (error) return callback(error, null);
                callback(null, result.affectedRows > 0);
            }
        );
    }

    // Método para deletar um tipo de consulta pelo ID
    static deleteTipoConsulta(id, callback) {
        connection.query(
            'DELETE FROM Tipos_Consulta WHERE id = ?',
            [id],
            (error, result) => {
                if (error) return callback(error, null);
                callback(null, result.affectedRows > 0);
            }
        );
    }
}

module.exports = TipoConsultaModel;
