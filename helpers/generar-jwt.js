const jwt = require('jsonwebtoken');


const generarJWT = (uid = '' ) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        // el metodo firma, recibe 4 parametros.
        // payload, KEY, objeto con opciones y una f con lo que tiene que hacer
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