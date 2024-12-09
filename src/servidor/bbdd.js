const mysql = require('mysql2');
require('dotenv').config({path: './env/.env'});

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

conexion.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log("conexion a la bbdd exitosa")
    }
});

module.exports = conexion;