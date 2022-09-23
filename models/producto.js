const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
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
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    description: {type:String},
    disponible: {type:Boolean, default:true},
});
// zona de reescritura de metodos
ProductoSchema.methods.toJSON = function() {
    // esta linea mod lo que se retorna.
    const { __v, estado, ...data } = this.toObject();
    return data;
}
module.exports = model('Producto', ProductoSchema); 