
const { Router } = require('express');
// check es un middleware que evalua un parametro. Contiene submetodos capaces de analizar distontos
// tipos de parametros. Fija el resultado del analisis en 
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
        
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID Mongo valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut );

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener mas de 6 letras').isLength({min:6}),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( emailExiste ),
        //check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRoleValido ),
        validarCampos

    ], usuariosPost );

router.delete('/:id', [
    validarJWT, 
    //esAdminRole, // middle que valida que se el usuario ejecutante sea un ADMIN.
    tieneRole('VENTAS_ROLE', 'USER_ROLE'), // middle que valida si tiene algun rol al menos de la lista.
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );

 



module.exports = router;