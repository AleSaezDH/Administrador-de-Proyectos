const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

// /api/auth
router.post('/', [
    check('email', 'Coloca un email válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6})
], authController.autenticarUsuario);

router.get('/', auth, authController.usuarioAutenticado);

module.exports = router;