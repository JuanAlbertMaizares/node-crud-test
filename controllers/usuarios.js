const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    // res.json({
    //     msg: 'get API - controlador',
    //     q,
    //     nombre,
    //     apikey,
    //     page, 
    //     limit
    // });
    const {limite = 5, desde = 0} = req.query;
    const usuarios = await Usuario.find().skip(Number(desde)).limit(Number(limite));
    const total = await Usuario.countDocuments();
    res.json({total, usuarios});
}

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

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    //const user = await Usuario.findById(id);
    res.json({ usuario });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}