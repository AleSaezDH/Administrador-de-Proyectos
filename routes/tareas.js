const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');
const auth = require('../middlewares/auth');
const {check} = require('express-validator');

router.post('/', auth, [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
], tareasController.crearTarea);

router.get('/', auth, tareasController.obtenerTareas);

router.put('/:id', auth, tareasController.actualizarTareas);

router.delete('/:id', auth, tareasController.eliminarTarea);

module.exports = router;