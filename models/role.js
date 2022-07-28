const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    // cada campos del modelo con sus propiedades.
    rol: {
        type: String,
        required: [true, 'el rol es obligatorio']
    }
});

module.exports = model('Role', RoleSchema); 