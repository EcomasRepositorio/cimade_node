const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/', (req, res) => {
    conexion.query('SELECT * FROM estudiantes', (error, results) => {
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
router.get('/diplomados', (req, res) => {
    //res.render('diplomados')
    conexion.query('SELECT * FROM diplomados', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('diplomados.ejs', { results: results })
        }
    })
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
    const id = req.params.id_estudiantes;
    conexion.query('DELETE FROM estudiantes WHERE id_estudiantes = ?', [id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/estudiantes');
        }
    })
});


router.get('/createDIPLO', (req, res) => {
    res.render('createDIPLO')
})

router.get('/editDIPLO/:id_diplomados', (req, res) => {
    const id = req.params.id_diplomados;
    conexion.query('SELECT * FROM diplomados WHERE id_diplomados=?', [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('editDIPLO.ejs', { diplomados: results[0] });

        }
    });
});
router.get('/delDiplo/:id_diplomados', (req, res) => {
    const id = req.params.id_diplomados;
    conexion.query('DELETE FROM diplomados WHERE id_diplomados =?', [id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/diplomados');
        }
    })
})
router.get('/especializacion',(req,res)=>{
    res.render('especializacion')
})





const crud = require('./controllers/crud');

router.post('/save', crud.save);
router.post('/update', crud.update);
//diplomados routes

router.post('/save_diplomados', crud.save_diplomados);
router.post('/update_diplomados', crud.update_diplomados);

module.exports = router;
