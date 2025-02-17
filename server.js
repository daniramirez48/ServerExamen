const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./database'); 
const app = express();
const saltRounds = 10; 
// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/userExamen', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    db.get('SELECT * FROM userExamen WHERE username = ? OR email = ?', [username, email], async (err, row) => {
      if (err) {
        console.log('Datos recibidos:', { name, username, email, password });
        console.error('Error al buscar el usuario:', err);
        return res.status(500).json({ error: 'Error al buscar el usuario' });
      }

      if (row) {
        return res.status(400).json({ error: 'El usuario ya está registrado' });
      }

      try {
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        db.run(
          'INSERT INTO userExamen (name, username, email, password) VALUES (?, ?, ?, ?)',
          [name, username, email, hashedPassword],
          (err) => {
            if (err) {
              console.error('Error al crear el usuario:', err);
              return res.status(500).json({ error: 'Error al crear el usuario' });
            }
            console.log('Usuario creado:', username);
            res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
          }
        );
      } catch (hashError) {
        console.error('Error al encriptar la contraseña:', hashError);
        return res.status(500).json({ error: 'Error al encriptar la contraseña' });
      }
    });

  } catch (error) {
    console.error('Error inesperado en el servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
