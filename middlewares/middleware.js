const jwt = require('jsonwebtoken');
const db = require('../models/conexion');
require('dotenv').config();
const secreto = process.env.SECRETO;

// Middleware para verificar el token
function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'Token no proporcionado' });
    }
  
    // El token debe tener el formato "Bearer <token>"
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Formato de token inválido' });
    }
  
    jwt.verify(tokenParts[1], secreto, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
      req.user = decoded;
      next();
    });
}

// Middleware para verificar el token contra la tabla auth2
function verificarToken2(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    // El token debe tener el formato "Bearer <token>"
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Formato de token inválido' });
    }

    jwt.verify(tokenParts[1], secreto, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // Consultar solo la tabla auth2
        const sql = 'SELECT * FROM auth2 WHERE id = ?'; // Usar ID como clave primaria para consistencia
        db.query(sql, [decoded.id], (err, result) => {
            if (err) {
                console.error('Error al verificar token:', err);
                return res.status(500).json({ message: 'Error interno del servidor' });
            }

            if (result.length === 0) {
                return res.status(401).json({ message: 'Token no encontrado' });
            }

            // Usuario encontrado en auth2, adjuntar al request y continuar
            req.user = decoded;
            next();
        });
    });
}

module.exports = { verificarToken, verificarToken2 };


