const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
    obtenerCategorias, 
    obtenerCategoria, 
    actualizarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', obtenerCategorias);
//
router.get('/:id', [
    // check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre debe ser obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);
router.delete('/:id', (req, res)=>{
    res.json('delete');
});



module.exports = router;