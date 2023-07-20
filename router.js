const express = require('express');
const router = express.Router();
const conexion = require('./database/db');

router.get('/', (req, res) => {
  conexion.query('SELECT * FROM estudiante', (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('index.ejs', { results: results });
    }
  })
})

router.get('/create', (req, res) => {
  res.render('create');
})

router.get('/edit/:id_estudiantes', (req, res) => {
  const id = req.params.id_estudiantes;
  conexion.query('SELECT * FROM estudiantes WHERE id_estudiantes=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('edit.ejs', { estudiantes: results[0] });
    }
  });
});

router.get('/delete/:id_estudiantes', (req, res) => {
  const id = req.params.id_estudiante;
  conexion.query('DELETE FROM estudiantes WHERE id_estudiantes = ?', [id], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/estudiantes');
    }
  })
});


router.get(['/selection/:codigo_registro', '/search'], (req, res) => {
  const codigo_registro = req.params.codigo_registro;
  const busqueda_dni = req.query.busqueda_dni;
  const busqueda_nombres = req.query.busqueda_nombres;
  const busqueda_codigo = req.query.busqueda_codigo;
  let consulta;
  let busqueda;

  if (codigo_registro) {
    consulta = 'SELECT e.nombre, c.nombre_curso, c.instituciones, c.duracion, ce.fecha_emitido, c.horas FROM estudiante e INNER JOIN certificado ce ON e.id_estudiante = ce.id_estudiante INNER JOIN curso c ON ce.id_curso = c.id_curso WHERE ce.codigo_registro = ?;';
    busqueda = codigo_registro;
  } else if (busqueda_dni) {
    consulta = 'SELECT e.nombre, c.nombre_curso, c.instituciones, c.duracion, ce.fecha_emitido, ce.codigo_registro FROM estudiante e INNER JOIN certificado ce ON e.id_estudiante = ce.id_estudiante INNER JOIN curso c ON ce.id_curso = c.id_curso WHERE e.dni = ?;';
    busqueda = busqueda_dni;
  } else if (busqueda_nombres) {
    consulta = 'SELECT e.nombre, c.nombre_curso, c.instituciones, c.duracion, ce.fecha_emitido, ce.codigo_registro FROM estudiante e INNER JOIN certificado ce ON e.id_estudiante = ce.id_estudiante INNER JOIN curso c ON ce.id_curso = c.id_curso WHERE e.nombre = ?;';
    busqueda = busqueda_nombres;
  } else if (busqueda_codigo) {
    consulta = 'SELECT e.nombre, c.nombre_curso, c.instituciones, c.duracion, ce.fecha_emitido , c.horas FROM estudiante e INNER JOIN certificado ce ON e.id_estudiante = ce.id_estudiante INNER JOIN curso c ON ce.id_curso = c.id_curso WHERE ce.codigo_registro = ?;';
    busqueda = busqueda_codigo;
  } else {
    results = '';
    return res.render('search', [results]);
  }

  conexion.query(consulta, [busqueda], (error, results) => {
    if (error) {
      console.log(error);
      return res.render('search');
    } else {
      return res.render('search', { results });
    }
  });
});



const crud = require('./controllers/crud');
const { VarChar } = require('mssql');
const { restart } = require('nodemon');

router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;
