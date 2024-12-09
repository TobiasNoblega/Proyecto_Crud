const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'cocina',
    user: 'root',
    password: 'root'
});

conexion.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log("conexion a la bbdd exitosa")
    }
});

module.exports = conexion;