const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventos.c');
const { verificarToken, verificarToken2 } = require('../middlewares/middleware');

// Middleware de autenticación
router.use(verificarToken);

// Rutas CRUD para eventos

// Mostrar todas los eventos
router.get('/', (req, res) => {
    eventosController.Mostrar()
      .then(resp => {
        res.render('eventos', { resp: resp });
      })
      .catch(error => {
        res.status(500).send(error);
      });
  });

// Buscar un evento por ID
router.get('/:id', (req, res) => {
    const idEvento = req.params.id;
    eventosController.Buscar(idEvento)
      .then(resp => {
        res.render('eventos', { resp: resp });
      })
      .catch(error => {
        res.status(500).send(error);
      });
  });
  
  // Ingresar un nuevo evento
  router.post('/', (req, res) => {
    const nuevoEvento = req.body;
    eventosController.Ingresar(nuevoEvento)
      .then(resp => {
        res.render('eventos', { resp: resp });
      })
      .catch(error => {
        res.status(500).send(error);
      });
  });
  
  // Modificar un evento
  router.put('/:id', (req, res) => {
    const idEvento = req.params.id;
    const nuevaInfoEvento = req.body;
    eventosController.Modificar(idEvento, nuevaInfoEvento)
      .then(resp => {
        res.render('eventos', { resp: resp });
      })
      .catch(error => {
        res.status(500).send(error);
      });
  });
  
  // Eliminar un evento
  router.delete('/:id', (req, res) => {
    const idEvento = req.params.id;
    eventosController.Eliminar(idEvento)
      .then(resp => {
        res.render('eventos', { resp: resp });
      })
      .catch(error => {
        res.status(500).send(error);
      });
  });
  
  // Obtener eventos de una materia para una fecha y la semana siguiente
  router.get('/materias/:idMateria/:fecha', (req, res) => {
    const { idMateria, fecha } = req.params;
  
    eventosController.ObtenerEventos(idMateria, fecha)
      .then(eventos => {
        res.render('eventosMateria', { eventos });
      })
      .catch(error => {
        res.status(500).send(error);
      });
  }); 

module.exports = router;
