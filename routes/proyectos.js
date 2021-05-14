const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');
const auth = require('../middlewares/auth');
const {check} = require('express-validator');


router.post('/', auth, [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
] , proyectosController.crearProyecto);

router.get('/', auth, proyectosController.obtenerProyectos);

router.put('/:id', [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
], auth, proyectosController.actualizarProyectos);

router.delete('/:id', auth, proyectosController.eliminarProyecto);

module.exports = router;