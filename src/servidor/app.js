const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.static('dist'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',require('./router.js'));

app.listen(3000,()=>{
    console.log("el servidor local es: http://localhost:3000")
});