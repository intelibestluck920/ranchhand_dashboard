const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rancher_db'
});

// Connect to MySQL server
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
        return;
    }
    console.log('Connected to MySQL server');

    // Create the database if it doesn't exist
    db.query('CREATE DATABASE IF NOT EXISTS Authentication', (err) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log('Database created (if not exists)');
    });
});

module.exports = db;