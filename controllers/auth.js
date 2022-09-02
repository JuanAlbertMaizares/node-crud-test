const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs'); // libreria para encriptar datos
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {
    const {correo, password} = req.body;

    try {
        // verificamos que el email exista
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Correo no son correctos'
            })
        }
        // validamos si esta activo
        if (!usuario.estado ) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado: false'
            });
        }
        // verificar password
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword ) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password erroneo'
            });
        }
        // generar el token jwt.
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"el servidor esta mal"
        });        
    }

}

module.exports = {
    login
}