const express = require('express');
const router = express.Router();
const materiasController = require('../controllers/materias.c');
const eventosController = require('../controllers/eventos.c');
const { verificarToken, verificarToken2 } = require('../middlewares/middleware');

// Rutas CRUD para materias

// Mostrar todas las materias
router.get('/', (req, res) => {
  materiasController.Mostrar()
    .then(resp => {
      res.render('materias', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Buscar una materia por ID
router.get('/:id', (req, res) => {
  const idMateria = req.params.id;
  materiasController.Buscar(idMateria)
    .then(resp => {
      res.render('materias', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Ingresar una nueva materia (utiliza la ruta verificarToken2 para poder utilizarla)
router.post('/', verificarToken2, (req, res) => {
  const nuevaMateria = req.body;
  materiasController.Ingresar(nuevaMateria)
    .then(resp => {
      res.render('materias', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Modificar una materia (utiliza la ruta verificarToken2 para poder utilizarla)
router.put('/:id', verificarToken2, (req, res) => {
  const idMateria = req.params.id;
  const nuevaInfomateria = req.body;
  materiasController.Modificar(idMateria, nuevaInfomateria)
    .then(resp => {
      res.render('materias', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Eliminar una materia (utiliza la ruta verificarToken2 para poder utilizarla)
router.delete('/:id', verificarToken2, (req, res) => {
  const idMateria = req.params.id;
  materiasController.Eliminar(idMateria)
    .then(resp => {
      res.render('materias', { resp: resp });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Obtener eventos de una materia para una fecha y la semana siguiente (utiliza la ruta verificarToken para poder utilizarla)
router.get('/materia/:idMateria/fecha/:fecha', verificarToken, async (req, res) => {
  try {
    const idMateria = req.params.idMateria;
    const fecha = req.params.fecha;

    const eventos = await eventosController.ObtenerEventos(idMateria, fecha);
    
    res.render('eventosMateriaFecha', { eventos: eventos, materiaId: idMateria, fecha: fecha });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;