const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const usuario = require("../models/usuario");
const Usuario = require('../models/usuario');

const validarJWT = async(req= request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        // este metodo valida y devuelve el payload listos para usar.
        const {uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        
        // podemos leer el usuario logeado con el token para saber y mandar que usuario realizo la accion.
        const usuario = await Usuario.findById(uid);
        //
        if (!usuario) {
            return res.status(401).json({
                msg:"el usuario no existe en bbdd"
            })
        }
        // verificar que el usuario que acciona, este activo.
        if (!usuario.estado) {
            return res.status(401).json({
                msg:"el usuario logeado no esta en modo activo."
            })
        }
        // se puede colocar en la request una propiedad nueva en otros lugares que req puede ser accedido.
        req.usuario = usuario;

        
        
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no valido"
        })
    }

}
module.exports = {
    validarJWT
}