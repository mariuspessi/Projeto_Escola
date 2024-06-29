import mysql from 'mysql2';

// Criar o pool de conexões
export const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '1234',
    database: 'crud'
});

export const banco = (req, res, next) => {
    const sql = 'SELECT * FROM usuarios';
    db.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: err.message, status: 500, success: false });
        }
        
        connection.query(sql, (error, result, fields) => {
            connection.release(); // Libera a conexão de volta para o pool
            
            if (error) {
                return res.status(201).json({ message: error, status: 402, success: false });
            } else if (result.length > 0) {
                res.status(200).json({ message: "Land Lord List", status: 200, success: true, users: result });
            } else {
                res.status(200).json({ message: "No Record Found", status: 402, success: false, users: result });
            }
        });
    });
};
