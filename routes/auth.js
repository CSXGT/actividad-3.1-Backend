const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.c');

// Rutas CRUD para autenticación

// Mostrar todos los usuarios
router.get('/', (req, res) => {
    authController.Mostrar()
      .then(resp => {
        res.render('auth', { resp: resp });
      })
      .catch(error => {
        res.status(500).send(error);
      });
  });

// Generar token de acceso
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  authController.generarToken(usuario, password)
    .then(token => {
      res.render('login', { token });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;