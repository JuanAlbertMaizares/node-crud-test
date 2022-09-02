const { response, request } = require('express');
const bcryptjs = require('bcryptjs'); // libreria para encriptar datos

const Usuario = require('../models/usuario');

//el controlador usuarioGet
const usuariosGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const usuarios = await Usuario.find().skip(Number(desde)).limit(Number(limite));
    const total = await Usuario.countDocuments();
    // retorna datos como archivo json.
    res.json({total, usuarios});
}
// otro controlador
const usuariosPost = async(req, res = response) => {
    

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol});
    // verificar correo
    
    // encriptar
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    // save
    await usuario.save();

    res.json({
        usuario
    });
}
// controlador
const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // validar contra la bd
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}
// controlador
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}
// controlador
const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    const uid = req.uid;
    const usuarioDelete = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuario = await Usuario.findById(id);
    const usuarioAutenticado = req.usuario;
    //const user = await Usuario.findById(id);
    res.json({ usuario, usuarioAutenticado  });
}


// exportando controladores
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}