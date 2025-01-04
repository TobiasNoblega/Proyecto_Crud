const express = require('express');
const router = express.Router();
const conexion = require('./bbdd.js');
const crud = require('./crud.js');
const contacto = require('./models/contacto');

//Ruta inicial
router.get('/',(req,res)=>{
    res.render('index');
});

//Ruta login
router.get('/login',(req,res)=>{
    res.render('login');
});

// Ruta consultas
//router.get('/consultas', (req, res) => {
//    contacto.find({}, (err, registros) => {
//        if (err) {
//            console.error(err);
//            res.status(500).send('Error al obtener contactos');
//        } else {
//            res.render('consultas', { resultados: registros });
//        }
//    });
//});
router.get('/consultas', async (req, res) => {
    try {
        const contactos = await contacto.find({});
        res.render('consultas', { resultados: contactos });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener contactos');
    }
});

// Ruta modificar
router.get('/modificar/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await contacto.findById(id);
        if (!usuario) {
            return res.status(404).send('Contacto no encontrado');
        }
        res.render('modificar', { usuario });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener el contacto');
    }
});

router.post('/modificar/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, telefono, email, mensaje } = req.body;

    try {
        await contacto.updateOne({ _id: id }, { nombre, telefono, email, mensaje });
        res.render('index', { muestra: 'Datos modificados exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al modificar el contacto');
    }
});

// Ruta para eliminar
router.get('/eliminar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await contacto.deleteOne({ _id: id });
        res.render('index', { muestra: 'Contacto eliminado con éxito' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar el contacto');
    }
});

// Ruta para ordenar
router.get('/consultas/:ordena', async (req, res) => {
    const criterio = req.params.ordena;

    try {
        const registros = await contacto.find({}).sort({ [criterio]: 1 });
        res.render('consultas', { resultados: registros });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al ordenar los contactos');
    }
});

// Ruta para crear
router.post('/crear', async (req, res) => {
    const { nombre, telefono, email, mensaje } = req.body;

    try {
        const nuevoContacto = new contacto({ nombre, telefono, email, mensaje });
        await nuevoContacto.save();
        res.status(201).send('Contacto creado exitosamente');
    } catch (err) {
        console.error('Error al guardar el contacto:', err);
        res.status(500).send('Hubo un error al crear el contacto');
    }
});

// Ruta para actualizar desde formulario
router.post('/actualizar', async (req, res) => {
    const { nombre, telefono, email, mensaje, id } = req.body;

    try {
        await contacto.updateOne({ _id: id }, { nombre, telefono, email, mensaje });
        res.render('index', { muestra: 'Datos modificados exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el contacto');
    }
});

module.exports = router;
