// models/tipoConsultaModel.js
const connection = require('../config/database');

class TipoConsultaModel {

    // Método para criar um novo tipo de consulta
    static createTipoConsulta(descricao, valor, callback) {
        const numericValor = parseFloat(valor); // Garante que o valor seja convertido para número
    
        if (typeof descricao !== 'string' || descricao.trim() === '') {
            return callback(new Error('Descrição inválida'), null);
        }
        if (isNaN(numericValor)) {
            return callback(new Error('Valor deve ser um número decimal válido'), null);
        }
    
        connection.query(
            'INSERT INTO Tipos_Consulta (descricao, valor) VALUES (?, ?)',
            [descricao, numericValor],
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
    static updateTipoConsulta(id, descricao, valor, callback) {
        const numericValor = parseFloat(valor); // Converte o valor para número
    
        // Validações
        if (!id || isNaN(parseInt(id))) {
            return callback(new Error('ID inválido'), null);
        }
        if (typeof descricao !== 'string' || descricao.trim() === '') {
            return callback(new Error('Descrição inválida'), null);
        }
        if (isNaN(numericValor)) {
            return callback(new Error('Valor deve ser um número decimal válido'), null);
        }
    
        // Executar a query SQL
        connection.query(
            'UPDATE Tipos_Consulta SET descricao = ?, valor = ? WHERE id = ?',
            [descricao, numericValor, id],
            (error, result) => {
                if (error) {
                    return callback(error, null); // Retorna o erro
                }
                callback(null, result.affectedRows > 0); // Retorna sucesso (true ou false)
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
