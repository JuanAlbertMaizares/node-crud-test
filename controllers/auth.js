const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs'); // libreria para encriptar datos
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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
const googleSignIn = async(req, res = response) => {
    const {id_token} = req.body;
    try {
        const {nombre, img, correo} = await googleVerify(id_token);
        let usuario = await Usuario.findOne({correo});
        if (!usuario) {
            //sino exste, lo creamos
            const data = {
                nombre,
                correo, 
                password: 'xd',
                img, 
                rol: 'USER_ROLE',
                google: true
            };
            usuario = new Usuario(data); 
            await usuario.save();
        }
        // si el estado del usuario en bd es falso
        let usuario2 = await Usuario.findOne({correo});
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'hable con el admin, el usuario esta bloqueado'
            });
        }
        // generamos el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }
}
module.exports = {
    login, googleSignIn
}