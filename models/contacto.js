// models/contacto.js
const mongoose = require('mongoose');

// Definir el esquema de contacto
const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  mensaje: {
    type: String,
    required: true
  }
});

// Crear el modelo a partir del esquema
const Contacto = mongoose.model('Contacto', contactoSchema);

module.exports = Contacto;
