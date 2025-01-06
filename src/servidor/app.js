const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const router = require('./router');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('dist'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/', require('./router'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.post('/registrar', async (req, res) => {
    const { nombre, usuario, email, password } = req.body;

    try {
        const nuevoUsuario = new Usuario({
            nombre,
            usuario,
            email,
            password,
        });
        await nuevoUsuario.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar usuario');
    }
});


// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../views'));

app.use('/',require('./router.js'));
app.use('/', router);

dotenv.config({path: './env/.env'});

const puerto = process.env.PORT || 3000;

app.listen(puerto,()=>{
    console.log(`el servidor local es: http://localhost:${puerto}`)
});