const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatoria']
    },
    img: {
        type: String, 
    },
    rol: {
        type: String,
        required: true,
        //enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    
});
// zona de reescritura de metodos
UsuarioSchema.methods.toJSON = function() {
    // esta linea mod lo que se retorna.
    const { __v, password, _id, ...usuario } = this.toObject();
    //esta linea muestra una nueva propiedad basada en otra.
    usuario.uid = _id;
    return usuario;
}
module.exports = model('Usuario', UsuarioSchema);