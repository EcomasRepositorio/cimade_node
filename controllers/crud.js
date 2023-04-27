//Invocamos a la conexion de la DB
const conexion = require('../database/db');
//GUARDAR un ESTUDIANTE
exports.save = (req, res) => {
    const nombres = req.body.nombres;
    const apellidopat = req.body.apellidopat;
    const apellidomat = req.body.apellidomat;
    const dni = req.body.dni;
    const ciudad = req.body.ciudad;
    const telefono = req.body.telefono;
    const whatsapp = req.body.whatsapp;
    const correo = req.body.correo;
    conexion.query('INSERT INTO estudiantes SET ?', {
        nombres: nombres, apellidopat: apellidopat
        , apellidomat: apellidomat, dni: dni, ciudad: ciudad, telefono: telefono
        , whatsapp: whatsapp, correo: correo
    }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            //console.log(results);   
            res.redirect('/');
        }
    });
};
//ACTUALIZAR un ESTUDIANTE
exports.update = (req, res) => {
    const id_estudiantes = req.body.id_estudiantes;
    const nombres = req.body.nombres;
    const apellidopat = req.body.apellidopat;
    const apellidomat = req.body.apellidomat;
    const dni = req.body.dni;
    const ciudad = req.body.ciudad;
    const telefono = req.body.telefono;
    const whatsapp = req.body.whatsapp;
    const correo = req.body.correo;
    conexion.query('UPDATE estudiantes SET ? WHERE id_estudiantes = ?', [{
        nombres: nombres, apellidopat: apellidopat
        , apellidomat: apellidomat, dni: dni, ciudad: ciudad, telefono: telefono
        , whatsapp: whatsapp, correo: correo
    }, id_estudiantes], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/');
        }
    });
};

//GUARDAR un DIPLOMADOS
exports.save_diplomados = (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;
    const imagen = req.body.imagen;
    conexion.query('INSERT INTO diplomados SET ?', {
        nombre: nombre, descripcion: descripcion
        , fecha: fecha, imagen: imagen
    }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            //console.log(results);   
            res.redirect('/diplomados');
        }
    });
};

//EDITAR un DIPLOMADO
exports.update_diplomados =(req, res) => {
    const id_diplomados = req.body.id_diplomados;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;
    const imagen = req.body.imagen;
    conexion.query('UPDATE diplomados SET ? WHERE id_diplomados = ?', [{
        nombre: nombre, descripcion: descripcion
        , fecha: fecha, imagen: imagen
    }, id_diplomados], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/diplomados');
        }
    });
}