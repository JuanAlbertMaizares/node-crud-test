const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
    // creamos una promesa para resolver aqui por reject o resolve y que lo capture el scope superior.
    return new Promise( ( resolve, reject) => {
        // tomamos el file de la consulta que nos llega.
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];
        // validar extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es valida. ${ extensionesValidas } si.`)
        }

        const nombreTemp = uuidv4() + '.' + extension; 
        // setear el lugar donde se guardaran los files    
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );
        // mover el file recibido al sitio seteado
        archivo.mv( uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve( nombreTemp );
        });
    });
}

module.exports = {
    subirArchivo
}