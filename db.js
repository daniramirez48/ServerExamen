    
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// Asegurar que la tabla tenga las columnas correctas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users2 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT,
    username TEXT,
    password TEXT
  )`);
});

module.exports = db;