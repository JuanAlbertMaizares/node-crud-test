const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs'); // libreria para encriptar datos
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

// mtd - Login para iniciar logeo en nuestro sitio

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
        // con el usuario existente y su id gneramos un token para esta session actual.
        // generarJWT retorna un token o un error.
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

// mtd -  Logeo hacia Google para obtener token y datos desde allí.

const googleSignIn = async(req, res = response) => {
    // recibe el token DE GOOGLE
    const {id_token} = req.body;
    try {
        // decodifica el token de google y saca los datos de ahi.
        const {nombre, img, correo} = await googleVerify(id_token);
        // con el correo buscamos un usuario de la BD con ese correo.
        let usuario = await Usuario.findOne({correo});
        // si el usuario ese, no existe, creamos uno con los datos extraidos del token de google.
        if (!usuario) {
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
        // existe pero el estado del usuario en bd es falso
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'hable con el admin, el usuario esta bloqueado'
            });
        }
        // con el usuario existente y su id gneramos un token para esta session actual.
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