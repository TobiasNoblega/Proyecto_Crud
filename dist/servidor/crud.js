"use strict";

var conexion = require('./bbdd.js');

// este crud ya no sirve porque estaba diseñado para mysql
exports.enviar = function (req, res) {
  var datos = req.body;
  var nombre = datos.nombre,
    telefono = datos.telefono,
    email = datos.email,
    mensaje = datos.mensaje;
  var muestra;
  var busca = "SELECT * FROM contacto WHERE telefono = '".concat(telefono, "';");
  conexion.query(busca, function (err, registros) {
    if (err) {
      throw err;
    } else if (registros.length > 0) {
      muestra = 'No puede volver a mandar el formulario';
      res.render('index', {
        muestra: muestra
      });
    } else {
      var insertar = "INSERT INTO contacto (nombre, telefono, email, mensaje) VALUES ('".concat(nombre, "','").concat(telefono, "','").concat(email, "','").concat(mensaje, "');");
      conexion.query(insertar, function (err) {
        if (err) {
          throw err;
        } else {
          muestra = "Formulario enviado exitosamente";
          res.render('index', {
            muestra: muestra
          });
        }
      });
    }
  });
};
exports.actualizar = function (req, res) {
  var datos = req.body;
  var nombre = datos.nombre,
    telefono = datos.telefono,
    email = datos.email,
    mensaje = datos.mensaje,
    id = datos.id;
  var muestra;
  var modifica = "UPDATE contacto SET nombre = '".concat(nombre, "', telefono = '").concat(telefono, "', email = '").concat(email, "', mensaje = '").concat(mensaje, "' WHERE idcontacto = ").concat(id, ";");
  conexion.query(modifica, function (err) {
    if (err) {
      throw err;
    } else {
      muestra = 'Datos modificados exitosamente';
      res.render('index', {
        muestra: muestra
      });
    }
    ;
  });
};