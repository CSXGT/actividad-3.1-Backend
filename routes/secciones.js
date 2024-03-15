const express = require('express');
const router = express.Router();
const seccionesController = require('../controllers/secciones.c');
const { verificarToken, verificarToken2 } = require('../middlewares/middleware');

// Rutas CRUD para secciones

// Mostrar todas las secciones
router.get('/', (req, res) => {
  seccionesController.Mostrar()
    .then(resp => {
      res.render('secciones', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Buscar una seccion por ID
router.get('/:id', (req, res) => {
  const idSecciones = req.params.id;
  seccionesController.Buscar(idSecciones)
    .then(resp => {
      res.render('secciones', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Ingresar una nueva seccion (utiliza la ruta verificarToken2 para poder utilizarla)
router.post('/', verificarToken2, (req, res) => {
  const nuevaSecciones = req.body;
  seccionesController.Ingresar(nuevaSecciones)
    .then(resp => {
      res.render('secciones', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Modificar una seccion (utiliza la ruta verificarToken2 para poder utilizarla)
router.put('/:id', verificarToken2, (req, res) => {
  const idSecciones = req.params.id;
  const nuevaInfoSecciones = req.body;
  seccionesController.Modificar(idSecciones, nuevaInfoSecciones)
    .then(resp => {
      res.render('secciones', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Eliminar una seccion (utiliza la ruta verificarToken2 para poder utilizarla)
router.delete('/:id', verificarToken2, (req, res) => {
  const idSecciones = req.params.id;
  seccionesController.Eliminar(idSecciones)
    .then(resp => {
      res.render('secciones', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});


module.exports = router;