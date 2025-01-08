const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const Usuario = require('./models/Usuario'); 
const router = require('./router');

dotenv.config({ path: './env/.env' });
require('./passport');

const app = express();

// middlewares
app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: 'mongodb://localhost/tu_base_de_datos' }),
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.usuario = req.user || null;
    res.locals.currentPath = req.path;
    next();
});

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../views'));

app.use('/', router);

app.post('/registrar', async (req, res) => {
    const { nombre, usuario, email, password } = req.body;

    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const nuevoUsuario = new Usuario({
            nombre,
            usuario,
            email,
            password: hashedPassword,
        });
        await nuevoUsuario.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar usuario');
    }
});

// Servidor
const puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
    console.log(`El servidor local está en: http://localhost:${puerto}`);
});