const Database = require('better-sqlite3');
const db = new Database('database.db', { verbose: console.log }); // Puedes agregar la opción 'verbose' para ver los logs

db.prepare(`
    CREATE TABLE IF NOT EXISTS userExamen (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        username TEXT UNIQUE,
        password TEXT
    )
`).run();

module.exports = db;
