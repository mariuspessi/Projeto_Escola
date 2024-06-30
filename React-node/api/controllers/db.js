import mysql from 'mysql2'; // Import using ES modules

const connection = mysql.createConnection({
  host: 'mysql', // Nome do serviço MySQL no Docker Compose
  user: 'root',
  password: 'root',
  database: 'crud'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

export default connection; // Exportando apenas 'connection'CREATE DATABASE mydatabase;
