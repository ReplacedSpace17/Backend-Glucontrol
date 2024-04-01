const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

async function Login(req, res, data) {
  const { Email, Password } = data;

  try {
    const query = 'SELECT * FROM users WHERE "Email" = $1';
    const { rows } = await connection.query(query, [Email]);

    if (rows.length === 1) {
      // Usuario encontrado, verificar la contraseña
      const user = rows[0];
      if (user.Password === Password) {
        // Contraseña coincidente, inicio de sesión exitoso
        console.log("> Inicio de sesión: " +user.UID);
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
        return user.UID;
      } else {
        // Contraseña incorrecta
        console.log("> Autenticación fallida: ");
        res.status(401).json({ error: 'Error de autenticación: contraseña incorrecta' });
      }
    } else {
      console.log("> User (404)");
      // No se encontró el usuario
      res.status(404).json({ error: 'Error de autenticación: usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
}


module.exports = {
  Login
};
