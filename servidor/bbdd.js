const mongoose = require('mongoose');
require('dotenv').config(); // Carga las variables desde .env

// URI de conexión desde .env
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/proyectoreactBD';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

module.exports = mongoose;
