// importa lector de vars de entorno.
require('dotenv').config();
// carga de clase que carga el server de Express
const Server = require('./models/server');

// instanciacion de clase que carga el server de Express
const server = new Server();


// ponemos al servidor a escuchar solicitudes 
server.listen();