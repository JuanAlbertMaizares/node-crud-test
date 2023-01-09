

//const { MAX_ACCESS_BOUNDARY_RULES_COUNT } = require('google-auth-library/build/src/auth/downscopedclient');
const Categoria = require('./categoria');
const Role = require('./role');
const Server = require('./server');
const Usuario = require('./usuario');
const Producto = require('./producto');


module.exports = {
    Categoria,
    Role,
    Server,
    Usuario,
    Producto
}