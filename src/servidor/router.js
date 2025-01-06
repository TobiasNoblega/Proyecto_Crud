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

//ruta consultas
router.get('/consultas', async (req, res) => {
    try {
        const contactos = await contacto.find({});
        res.render('consultas', { resultados: contactos });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener contactos');
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

// Ruta modificar
router.post('/modificar', async (req, res) => {
    const { nombre, telefono, email, mensaje } = req.body;

    try {
        const contactoModificado = await contacto.findOneAndUpdate(
            { email }, // Filtro basado en email
            { nombre, telefono, mensaje }, // Campos a actualizar
            { new: true } // Retorna el contacto modificado
        );

        if (contactoModificado) {
            res.render('index', { muestra: 'Contacto modificado exitosamente' });
        } else {
            res.render('index', { muestra: 'No se encontró un contacto con el email proporcionado' });
        }
    } catch (error) {
        console.error("Error al modificar el contacto:", error);
        res.status(500).send("Hubo un error al modificar el contacto");
    }
});

// Ruta para eliminar
router.post('/eliminar', async (req, res) => {
    const { email } = req.body;

    try {
        const resultado = await contacto.deleteOne({ email });

        if (resultado.deletedCount > 0) {
            res.render('index', { muestra: 'Contacto eliminado con éxito' });
        } else {
            res.render('index', { muestra: 'No se encontró un contacto con el email proporcionado' });
        }
    } catch (error) {
        console.error("Error al eliminar el contacto:", error);
        res.status(500).send("Hubo un error al eliminar el contacto");
    }
});

// Ruta para ordenar
router.get('/consultas/:ordena', async (req, res) => {
    const criterio = req.params.ordena;

    try {
        const contactos = await contacto.find({}).sort({ [criterio]: 1 });
        res.render('consultas', { resultados: contactos });
    } catch (error) {
        console.error("Error al ordenar los contactos:", error);
        res.status(500).send("Hubo un error al ordenar los contactos");
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

// Ruta registro
router.get('/registro', (req, res) => {
    res.render('registro');
});

router.post('/registro', (req, res) => {
    const { usuario, password } = req.body;
    res.send('Usuario registrado correctamente');
});


module.exports = router;
