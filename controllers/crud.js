//Invocamos a la conexion de la DB
const conexion = require('../database/db');
//GUARDAR un ESTUDIANTE
exports.save = (req, res) => {
    const dni = req.body.dni;
    const nombre = req.body.nombres;
    const fecha_nac = req.body.fecha_nac;
    const direccion = req.body.direccion;
    const pais = req.body.pais;
    const fecha_ingreso = req.body.fecha_ingreso
    const ciudad = req.body.ciudad;
    const numero_telefono = req.body.numero_telefono;
    const correo_electronico = req.body.correo_electronico;
    conexion.query('INSERT INTO estudiante SET ?', {
        dni: dni, nombre: nombre, fecha_nac: fecha_nac, direccion: direccion, pais: pais, fecha_ingreso: fecha_ingreso,
        ciudad: ciudad, numero_telefono: numero_telefono, correo_electronico: correo_electronico
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