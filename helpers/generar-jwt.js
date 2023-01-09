const jwt = require('jsonwebtoken');    //imp modulo para impl JWT.

// mtd - F unica p/ obtener tokens
// p# id (uid) que esta en la bbdd, en el modelo del usuario.
const generarJWT = (uid = '' ) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        // el metodo firma-sign, recibe 4 parametros.
        // payload, KEY de , objeto con opciones y una f con lo que tiene que hacer
        // tanto por error o acierto.
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("no se pudo generar el token")
            }else{
                resolve(token);
            }
        })
    })
}
module.exports = {
    generarJWT
}