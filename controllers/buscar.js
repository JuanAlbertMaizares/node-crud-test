const {response} = require('express');
const {ObjectId} = require('mongoose').Types;
const {Usuario, Categoria, Producto } = require('../models');


const coleccionesPermintidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            result: (usuario) ? [usuario] : []
        })
    }
    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{nombre: regex  }, {correo: regex  }],
        $and: [{estado: true}]
    });

    res.json({
        results: usuarios
    });
}
const buscarCategorias = async(termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const usuario = await Categoria.findById(termino);
        return res.json({
            result: (categoria) ? [categoria] : []
        })
    }
    const regex = new RegExp(termino, 'i');
    const categorias = await Categoria.find({ nombre: regex, estado: true });

    res.json({
        results: categorias
    });
}
const buscarProductos = async(termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            result: (producto) ? [producto] : []
        })
    }
    const regex = new RegExp(termino, 'i');
    const productos = await Producto.find({nombre:regex, estado:true}).populate('categoria', 'nombre');

    res.json({
        results: productos
    });
}

const buscar = (req, res = response ) => {
    
    const { coleccion, termino } = req.params;
    if (!coleccionesPermintidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermintidas}`
        })
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se olvido hacer esta busqueda'
            })
    } 
    
}
 

module.exports = {
    buscar
}