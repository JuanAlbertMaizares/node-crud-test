const mongoose = require('mongoose');

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