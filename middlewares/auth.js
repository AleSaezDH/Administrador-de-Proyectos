const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    // primero leo el token del header
    const token = req.header('x-auth-token');

    // despues verifico que exista y sino devuelvo un mensaje de error
    if (!token) {
        return res.status(401).json({msg: 'No tenes permiso para acceder aquí'});
    }

    try {
        const valorToken = jwt.verify(token, process.env.SECRETA);
        req.usuario = valorToken.usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg:'Token inválido'});
    }

}