const express = require('express');
const passport = require('passport');
const router = express.Router();
const conexion = require('./bbdd.js');
const crud = require('./crud.js');
const bcrypt = require('bcryptjs');
const Usuario = require('./models/Usuario.js');
const contacto = require('./models/contacto');

// Middlewares
router.use((req, res, next) => {
    res.locals.usuario = req.session?.usuario || null;
    res.locals.messages = [];
    res.locals.currentPath = req.path;
    next();
});

//Ruta inicial
router.get('/', (req, res) => {
    res.render('index');
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

// Ruta login
router.get('/login', (req, res) => {
    res.render('login', { error: null, currentPath: req.path });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ username });

        if (!usuario) {
            return res.render('login', {
                error: 'Usuario no encontrado',
                currentPath: req.path
            });
        }

        const esValido = await usuario.comparePassword(password);
        if (!esValido) {
            return res.render('login', {
                error: 'Contraseña incorrecta',
                currentPath: req.path
            });
        }

        req.session.usuario = { username: usuario.username };
        return res.redirect('/');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.render('login', {
            error: 'Error en el servidor. Inténtalo más tarde.',
            currentPath: req.path
        });
    }
});

// Ruta registro
router.get('/registro', (req, res) => {
    res.render('registro', { error: null, currentPath: req.path });
});

router.post('/registro', async (req, res) => {
    const { username, password } = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({ username });
        if (usuarioExistente) {
            return res.render('registro', { 
                error: 'El nombre de usuario ya está registrado', 
                currentPath: req.path 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = new Usuario({ username, password: hashedPassword });
        await nuevoUsuario.save();
        res.redirect('/login');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.render('registro', { 
            error: 'Error en el servidor. Inténtalo más tarde.', 
            currentPath: req.path 
        });
    }
});

// rutas protegidas por sesion
function verificarAutenticacion(req, res, next) {
    if (req.session && req.session.usuario) {
        return next();  
    } else {
        return res.redirect('/login'); 
    }
}
router.use(['/modificar/:email', '/eliminar', '/perfil'], verificarAutenticacion);

// Ruta para crear
router.post('/crear', async (req, res) => {
    const { nombre, telefono, email, mensaje } = req.body;

    try {
        const nuevoContacto = new contacto({ nombre, telefono, email, mensaje });
        await nuevoContacto.save();

        // Enviar mensaje de éxito al índice
        res.render('index', { muestra: 'Contacto creado exitosamente', currentPath: req.path });
    } catch (err) {
        console.error('Error al guardar el contacto:', err);
        
        // Enviar mensaje de error al índice
        res.render('index', { muestra: 'Hubo un error al crear el contacto', currentPath: req.path });
    }
});

// Ruta modificar
router.get('/modificar/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const contactoEncontrado = await contacto.findOne({ email });
        if (!contactoEncontrado) return res.status(404).send('No se encontró el contacto');

        res.render('editar', { contacto: contactoEncontrado });
    } catch (error) {
        console.error('Error al obtener contacto:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta guardar contacto modificado
router.post('/modificar', async (req, res) => {
    const { nombre, telefono, email, mensaje } = req.body;

    try {
        const contactoModificado = await contacto.findOneAndUpdate(
            { email },
            { nombre, telefono, mensaje },
            { new: true }
        );

        if (!contactoModificado) {
            return res.render('index', { muestra: 'Contacto no encontrado' });
        }

        res.render('index', { muestra: 'Contacto modificado exitosamente' });
    } catch (error) {
        console.error('Error al modificar el contacto:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para eliminar
router.post('/eliminar', async (req, res) => {
    const { email } = req.body;

    try {
        const resultado = await contacto.deleteOne({ email });

        if (resultado.deletedCount > 0) {
            res.render('index', { muestra: 'Contacto eliminado con éxito', currentPath: req.path });
        } else {
            res.render('index', { muestra: 'No se encontró un contacto con el email proporcionado', currentPath: req.path });
        }
    } catch (error) {
        console.error("Error al eliminar el contacto:", error);
        res.render('index', { muestra: 'Hubo un error al eliminar el contacto', currentPath: req.path });
    }
});

// Ruta para ordenar
router.get('/consultas/:ordena', async (req, res) => {
    const criterio = req.params.ordena;

    try {
        const contactos = await contacto.find({}).sort({ [criterio]: 1 });
        res.render('consultas', { resultados: contactos, usuario: req.session?.usuario || null, currentPath: req.path });
    } catch (error) {
        console.error("Error al ordenar los contactos:", error);
        res.status(500).send("Hubo un error al ordenar los contactos");
    }
});

// Ruta para actualizar
router.post('/actualizar', async (req, res) => {
    const { nombre, telefono, email, mensaje } = req.body;

    try {
        await contacto.updateOne({ email }, { nombre, telefono, mensaje });
        res.render('index', { muestra: 'Datos modificados exitosamente', currentPath: req.path });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el contacto');
    }
});


// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.redirect('/');
        }
        res.redirect('/');
    });
});


module.exports = router;
