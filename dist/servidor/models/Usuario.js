"use strict";

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var UsuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//UsuarioSchema.pre('save', async function (next) {
//    if (!this.isModified('password')) return next();
//    const salt = await bcrypt.genSalt(10);
//    this.password = await bcrypt.hash(this.password, salt);
//    next();
//});

UsuarioSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
module.exports = mongoose.model('Usuario', UsuarioSchema);