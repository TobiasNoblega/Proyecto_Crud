const conexion = require('./bbdd.js');

exports.enviar = (req,res)=>{
    const datos = req.body;
    const {nombre,telefono,email,mensaje} = datos;

    let muestra;
    const busca = `SELECT * FROM contacto WHERE telefono = '${telefono}';`;
    conexion.query(busca, (err,registros)=>{
        if(err){
            throw err;
        }else if(registros.length > 0){
            muestra = 'No puede volver a mandar el formulario';
            res.render('index', {muestra});
        }else{
            const insertar = `INSERT INTO contacto (nombre, telefono, email, mensaje) VALUES ('${nombre}','${telefono}','${email}','${mensaje}');`;
            conexion.query(insertar, (err)=>{
                if(err){
                    throw err;
                }else{
                    muestra = "Formulario enviado exitosamente";
                    res.render('index', {muestra});
                }
            })
        }
    });
}

exports.actualizar = (req,res) => {
    const datos = req.body;
    const {nombre,telefono,email,mensaje,id} = datos;
    let muestra;
    const modifica = `UPDATE contacto SET nombre = '${nombre}', telefono = '${telefono}', email = '${email}', mensaje = '${mensaje}' WHERE idcontacto = ${id};`;
    conexion.query(modifica, (err)=>{
        if(err){
            throw err
        }else{
            muestra = 'Datos modificados exitosamente'
            res.render('index',{muestra})
        };
    });
}