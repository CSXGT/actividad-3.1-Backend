const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.c');

// Rutas CRUD para usuarios

// Mostrar todos los usuarios
router.get('/', (req, res) => {
  usuariosController.Mostrar()
    .then(resp => {
      res.render('usuarios', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Buscar un usuario por correo
router.get('/:correo', (req, res) => {
  const correoUsuario = req.params.correo;
  usuariosController.Buscar(correoUsuario)
    .then(resp => {
      res.render('usuarios', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Añadir un nuevo usuario
router.post('/', async (req, res) => {
  const nuevoUsuario = req.body;
  try {
    const resp = await usuariosController.agregarUsuarioYAuth(nuevoUsuario);
    res.render('usuarios', { resp: resp });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Modificar un usuario
router.put('/:id', (req, res) => {
  const idUsuario = req.params.id;
  const nuevaInfoUsuario = req.body;
  usuariosController.Modificar(idUsuario, nuevaInfoUsuario)
    .then(resp => {
      res.render('usuarios', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
  const idUsuario = req.params.id;
  usuariosController.Eliminar(idUsuario)
    .then(resp => {
      res.render('usuarios', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
