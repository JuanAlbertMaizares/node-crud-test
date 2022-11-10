const path = require('path');
const fs = require('fs');
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
// note: Actualiza la imagen de un usuario, eliminando la anterior.
const actualizarImagen = async(req, res = response ) => {
    const {id, coleccion } = req. params;
    let modelo;
    // selecciona coleccion.
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
    // fin - selecciona coleccion.

    // limpiar imagenes previas
    if (modelo.img) {
        // eliminar imagen anterior.
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();
    res.json(modelo);
}
// note: Muestra la imagen del usuario.
const mostrarImagen = async(req, res = response) => {
    const {id, coleccion } = req. params;
    let modelo;
    // selecciona coleccion.
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
            
    }
    // fin - selecciona coleccion.

    // limpiar imagenes previas
    if (modelo.img) {
        // eliminar imagen anterior.
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    res.json({msg: 'falta el placeholder'});
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}