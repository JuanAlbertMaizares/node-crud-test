const mongoose = require('mongoose');
// simple try catch con intento al metodo connect de mongoose
// la f debe exportarse.
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify:false
        }
        );
        console.log('BBDD conectada');
    } catch (error) {
        throw new Error('Error en la conexión a la bd');
    }

}

module.exports = {
    dbConnection
}