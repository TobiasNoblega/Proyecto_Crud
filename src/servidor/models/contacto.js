const mongoose = require('mongoose');

// esquema
const contactoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true },
    mensaje: { type: String, required: true }
});

const contacto = mongoose.model('contacto', contactoSchema);

module.exports = contacto;