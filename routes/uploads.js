const { Router } = require("express");
const { check } = require('express-validator');
const { validarCampos, validarArchivoSubir } = require('../middlewares')

const { cargarArchivo, actualizarImagen } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers/db-validators");

// note: 
const router = Router();
//endpoints
router.post('/', validarArchivoSubir, cargarArchivo);
router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagen);

module.exports = router;