"use strict";

var mongoose = require('mongoose');

// esquema
var contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 45,
    trim: true
  },
  telefono: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 18,
    match: /^[0-9]+[-|\s]?[0-9]+[-|\s]?[0-9]+$/,
    trim: true
  },
  email: {
    type: String,
    required: true,
    maxlength: 25,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,25}$/,
    trim: true
  },
  mensaje: {
    type: String,
    maxlength: 140,
    trim: true
  }
}, {
  timestamps: true
});
var contacto = mongoose.model('contacto', contactoSchema);
module.exports = contacto;