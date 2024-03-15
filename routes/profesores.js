const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesores.c');
const { verificarToken, verificarToken2 } = require('../middlewares/middleware');

// Rutas CRUD para profesores

// Mostrar todos los profesores
router.get('/', (req, res) => {
  profesoresController.Mostrar()
    .then(resp => {
      res.render('profesores', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Buscar un profesor por ID
router.get('/:id', (req, res) => {
  const idProfesores = req.params.id;
  profesoresController.Buscar(idProfesores)
    .then(resp => {
      res.render('profesores', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Ingresar un nuevo profesor (utiliza la ruta verificarToken2 para poder utilizarla)
router.post('/', verificarToken2, (req, res) => {
  const nuevoProfesor = req.body;
  profesoresController.Ingresar(nuevoProfesor)
    .then(resp => {
      res.render('profesores', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Modificar un profesor (utiliza la ruta verificarToken2 para poder utilizarla)
router.put('/:id', verificarToken2, (req, res) => {
  const idProfesores = req.params.id;
  const nuevaInfoProfesor = req.body;
  profesoresController.Modificar(idProfesores, nuevaInfoProfesor)
    .then(resp => {
      res.render('profesores', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Eliminar un profesor (utiliza la ruta verificarToken2 para poder utilizarla)
router.delete('/:id', verificarToken2, (req, res) => {
  const idProfesores = req.params.id;
  profesoresController.Eliminar(idProfesores)
    .then(resp => {
      res.render('profesores', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
