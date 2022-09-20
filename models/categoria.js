const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    // cada campos del modelo con sus propiedades.
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});
// zona de reescritura de metodos
CategoriaSchema.methods.toJSON = function() {
    // esta linea mod lo que se retorna.
    const { __v, estado, ...data } = this.toObject();
    return data;
}
module.exports = model('Categoria', CategoriaSchema); 