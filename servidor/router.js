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

//Ruta consultas
router.get('/consultas', (req,res)=>{
    const consulta = `SELECT * FROM contacto;`;
    conexion.query(consulta, (err, registros)=>{
        if(err){
            throw err;
        }else{
            res.render('consultas', {resultados: registros});
        }
    });
});

//ruta para modificar
router.get('/modificar/:id', (req,res)=>{
    const id = req.params.id;
    const busca = `SELECT * from contacto WHERE idcontacto = ${id};`;
    conexion.query(busca, (err,registro)=>{
        if(err){
            throw err;
        }else{
            res.render('modificar', {usuario: registro[0]})
        }
    });
})

//ruta para eliminar
router.get('/eliminar/:id', (req,res)=>{
    const id = req.params.id;
    let muestra;
    const borrar = `DELETE from contacto WHERE idcontacto = ${id};`;
    conexion.query(borrar, (err)=>{
        if(err){
            throw err;
        }else{
            muestra = `Contacto eliminado con exito`
            res.render('index', {muestra})
        }
    });
})

//ruta para ordenar por nombre
router.get('/consultas/:ordena', (req,res)=>{
    const criterio = req.params.ordena;
    const ordenada = `SELECT * from contacto ORDER BY ${criterio};`;
    conexion.query(ordenada,(err, registros)=>{
        if(err){
            throw err;
        }else{
            res.render('consultas', {resultados: registros});
        }

    })
});



router.post('/enviar', crud.enviar);
router.post('/actualizar', crud.actualizar);

module.exports = router;
