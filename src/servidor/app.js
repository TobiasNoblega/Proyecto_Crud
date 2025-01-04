const express = require('express');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const router = require('./router');

const app = express();

app.use(express.static('dist'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/', require('./router'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.use('/',require('./router.js'));
app.use('/', router);

dotenv.config({path: './env/.env'});

const puerto = process.env.PORT || 3000;

app.listen(puerto,()=>{
    console.log(`el servidor local es: http://localhost:${puerto}`)
});