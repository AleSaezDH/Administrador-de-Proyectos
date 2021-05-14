const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');
const {check} = require('express-validator');

// creo un usuario
// /api/usuarios
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Coloca un email válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6})
]
, usuarioController.crearUsuario);

module.exports = router;