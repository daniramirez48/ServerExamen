const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// // Configuración de la base de datos SQLite
// const db = new sqlite3.Database('./database.db', err => {
//     if (err) {
//         console.error('Error al conectar a SQLite:', err);
//     } else {
//         console.log('Conectado a SQLite');
//         // Crear tabla de usuarios si no existe
//         db.run(`
//             CREATE TABLE IF NOT EXISTS users (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 username TEXT UNIQUE,
//                 password TEXT
//             )
//         `);
//     }
// });

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta de registro
app.post('/registro', async (req, res) => {
    try {
        const {name, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            'INSERT INTO userUrko (username, password) VALUES (?, ?)',
            [username, hashedPassword],
            function(err) {
                if (err) {
                    return res.status(400).send('Usuario ya existe');
                }
                res.status(201).send('Usuario registrado');
            }
        );
        
    } catch (error) {
        res.status(500).send('Error en el registro');
    }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});