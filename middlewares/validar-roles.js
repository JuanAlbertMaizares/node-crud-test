const {response} = require('express');


const esAdminRole = (req, res = response, next) => {
    // primera validacion
    if (!req.usuario) {// la prop nueva creada en el req por el anterior middle.
        return res.status(401).json({
            msg:"se quiere validar el role sin validar el token primero"
        });
    }
    // manejamos el middle 
    const {rol, nombre } = req.usuario;
    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg:"no es admin"
        });
    }
    next();
}
module.exports = {
    esAdminRole
}