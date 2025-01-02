const mongoose = require('mongoose');
require('dotenv').config();

// URI de conexión
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/proyectoReactBD';

// Conexión con la base de datos
mongoose.connect(uri)
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    process.exit(0); // Cierra el proceso de Node.js al confirmar la conexión
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1); // Cierra el proceso con un código de error
  });
