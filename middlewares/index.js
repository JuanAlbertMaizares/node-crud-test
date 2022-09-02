// ponemos en una constante lo que se trae de los archivos.
const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

// usando el operador ...
module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles
}