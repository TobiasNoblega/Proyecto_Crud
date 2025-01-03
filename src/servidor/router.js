const express = require('express');
const router = express.Router();
const conexion = require('./bbdd.js');
const crud = require('./crud.js');

//Ruta inicial
router.get('/',(req,res)=>{
    res.render('index');
});

//Ruta login
router.get('/login',(req,res)=>{
    res.render('login');
});

// Ruta consultas
router.get('/consultas', (req, res) => {
    Contacto.find({}, (err, registros) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener contactos');
        } else {
            res.render('consultas', { resultados: registros });
        }
    });
});

// Ruta para modificar
router.get('/modificar/:id', (req, res) => {
    const id = req.params.id;

    // Buscar contacto por ID
    Contacto.findById(id, (err, contacto) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener el contacto');
        } else {
            res.render('modificar', { usuario: contacto });
        }
    });
});

router.post('/modificar/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, telefono, email, mensaje } = req.body;

    // Actualizar contacto con ID
    Contacto.updateOne(
        { _id: id }, // Filtro: busca por el ID
        { nombre, telefono, email, mensaje }, // Datos actualizados
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al modificar el contacto');
            } else {
                res.render('index', { muestra: 'Datos modificados exitosamente' });
            }
        }
    );
});

// Ruta para eliminar
router.get('/eliminar/:id', (req, res) => {
    const id = req.params.id;

    // Eliminar contacto por ID
    Contacto.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al eliminar el contacto');
        } else {
            res.render('index', { muestra: 'Contacto eliminado con éxito' });
        }
    });
});

// Ruta para ordenar
router.get('/consultas/:ordena', (req, res) => {
    const criterio = req.params.ordena;

    Contacto.find({})
        .sort({ [criterio]: 1 }) // Ordena según el criterio (1: ascendente, -1: descendente)
        .exec((err, registros) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al ordenar los contactos');
            } else {
                res.render('consultas', { resultados: registros });
            }
        });
});



router.post('/enviar', (req, res) => {
    const { nombre, telefono, email, mensaje } = req.body;

    const nuevoContacto = new Contacto({ nombre, telefono, email, mensaje });

    nuevoContacto.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al enviar el formulario');
        } else {
            res.render('index', { muestra: 'Formulario enviado exitosamente' });
        }
    });
});

router.post('/actualizar', (req, res) => {
    const { nombre, telefono, email, mensaje, id } = req.body;

    Contacto.updateOne(
        { _id: id },  // Filtrar por el ID del contacto
        { nombre, telefono, email, mensaje },  // Los nuevos valores
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al actualizar el contacto');
            } else {
                res.render('index', { muestra: 'Datos modificados exitosamente' });
            }
        }
    );
});

module.exports = router;
