const bcrypt = require('bcrypt');
const saltRounds = 5; 
const db = require('../models/conexion');

class UsuariosController {
  // Mostrar usuarios
  Mostrar() {
    const sql = 'SELECT * FROM usuarios';

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

  // Buscar un usuario por correo
  Buscar(correo) {
    const sql = 'SELECT * FROM usuarios WHERE correo = ?';

    return new Promise((resolve, reject) => {
      db.query(sql, [correo], (err, result) => {
        if (err) {
          console.log('Error al buscar usuario por correo:', err);
          reject('Error interno del servidor');
        } else {
          resolve(result);
        }
      });
    });
  }

  // Modificar un usuario
  Modificar(id, nuevoUsuario) {
    const sql = 'UPDATE usuarios SET ? WHERE id = ?';

    return new Promise((resolve, reject) => {
      db.query(sql, [nuevoUsuario, id], (err, result) => {
        if (err) {
          console.log('Error al modificar usuario:', err);
          reject('Error interno del servidor');
        } else {
          resolve(result);
        } 
      });
    });
  }

  // Eliminar un usuario
  Eliminar(id) {
    const sql = 'DELETE FROM usuarios WHERE id = ?';

    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.log('Error al eliminar usuario:', err);
          reject('Error interno del servidor');
        } else {
          resolve(result);
        }
      });
    });
  }

    // Función para añadir un usuario y su autenticación
    async agregarUsuarioYAuth(usuario) {
      try {
          // Iniciar transacción
          await db.beginTransaction();

          // Insertar en la tabla usuarios
          const usuarioQuery = 'INSERT INTO usuarios SET ?';
          const usuarioResult = await db.query(usuarioQuery, { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol, activo: usuario.activo });

          // Verificar si la contraseña está presente
          if (usuario.password) {
              // Encriptar la contraseña con bcrypt
              const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);

              // Insertar en la tabla de autenticación correspondiente según el rol
              let authQuery;
              if (usuario.rol === 'Profesor') {
                  authQuery = 'INSERT INTO auth SET ?';
              } else if (usuario.rol === 'Director') {
                  authQuery = 'INSERT INTO auth2 SET ?';
              }

              if (authQuery) {
                  const authResult = await db.query(authQuery, { id: usuario.id, usuario: usuario.correo, password: hashedPassword });
              }
          }

          // Confirmar transacción
          await db.commit();

          return { success: true, message: 'Usuario añadido exitosamente' };
      } catch (error) {
          // Revertir transacción en caso de error
          await db.rollback();

          throw error;
      }
  }
}

const controller = new UsuariosController();
module.exports = controller;
