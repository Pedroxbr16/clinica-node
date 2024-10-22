const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'pjusto',
  password: '1234',
  database: 'clinica'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

module.exports = connection;
