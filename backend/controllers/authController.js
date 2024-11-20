const connection = require('../config/database');

// Função de login
exports.login = (req, res) => {
    const { usuario, senha } = req.body;

    // Verificar se os campos estão preenchidos
    if (!usuario || !senha) {
        return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
    }

    // Consulta para buscar o usuário na tabela "atendentes"
    const sql = `SELECT * FROM atendente WHERE usuario = ? AND senha = ?`;

    connection.query(sql, [usuario, senha], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ error: 'Erro no servidor. Tente novamente mais tarde.' });
        }

        // Verificar se o usuário foi encontrado
        if (results.length === 0) {
            console.warn(`Usuário ou senha inválidos: ${usuario}`);
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const user = results[0];

        // Determinar o papel do usuário (role)
        const role = user.funcao || 'atendente'; // Define "atendente" como valor padrão, caso "funcao" seja NULL

        // Responder com sucesso
        console.info(`Login bem-sucedido: ${usuario} (${role})`);
        res.status(200).json({
            message: 'Login bem-sucedido',
            role
        });
    });
};
