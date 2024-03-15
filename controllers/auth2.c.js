const db = require('../models/conexion');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secreto = process.env.SECRETO;

class Auth2Controller {
// Mostrar usuarios
  Mostrar() {
    const sql = 'SELECT * FROM auth2';

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.log('Error al obtener usuarios:', err);
          reject('Error interno del servidor');
        } else {
          resolve(result);
        }
      });
    });
  }

  // Generar token de acceso
  generarToken(usuario, password) {
    const sql = 'SELECT * FROM auth2 WHERE usuario = ?';

    return new Promise((resolve, reject) => {
      db.query(sql, [usuario], async (err, result) => {
        if (err) {
          console.log('Error al obtener usuario:', err);
          reject('Error interno del servidor');
        } else {
          if (result.length === 0) {
            reject('Usuario no encontrado');
          } else {
            const user = result[0];
            // Verificar contraseña
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
              reject('Contraseña incorrecta');
            } else {
              // Generar token
              const token = jwt.sign({ id: user.id, usuario: user.usuario }, secreto, { expiresIn: '1h' });
              resolve(token);
            }
          }
        }
      });
    });
  }
}

const authController = new Auth2Controller();
module.exports = authController;
