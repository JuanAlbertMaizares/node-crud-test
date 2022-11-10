const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require('../models');

// note: Funcion que se encarga de cargar archivos en nuestra app.
const cargarArchivo = async(req, res=response) => {
    // validamos que existan files para persistir.
    
    try {
        // imagenes
        const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
        // const nombre = await subirArchivo( req.files, undefined, 'textos' );
        res.json({ nombre });
    } catch (msg) {
        res.status(400).json({msg});
    }
}

const actualizarImagen = async(req, res = response ) => {
    const {id, coleccion } = req. params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo= await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo= await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
    
        default:
            return res.status(500).json({msg:'Validar esto'})
            break;
    }
    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();
    res.json(modelo);
}


module.exports = {
    cargarArchivo,
    actualizarImagen
}