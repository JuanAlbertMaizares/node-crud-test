
const { Router } = require('express');
// check es un middleware que evalua un parametro. Contiene submetodos capaces de analizar distontos
// tipos de parametros. Fija el resultado del analisis en 
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener mas de 6 letras').isLength({min:6}),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( emailExiste ),
        //check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRoleValido ),
        validarCampos

    ], usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;