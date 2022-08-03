const { validationResult } = require('express-validator');


// esta funcion funge como ultimo middleware
// para esto necesita tanto req y res, pero ademas el metodo next.
// usando validatorResult revisa los errores recopilados por check del mismo paquete.
// aca se puede decidir que hacer con la consulta si tuviera errores.

const validarCampos = ( req, res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty() ) {
        console.log("no entro al controlador");
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
}