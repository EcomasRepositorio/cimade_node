const express = require('express');
const router = express.Router();
const conexion = require('./database/db');
const multer = require('multer');
const path = require('path');
const pathModule = require('path');
const cron = require('node-cron');
const fs = require('fs');

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'PDF_CIMADE/'); // The folder where PDFs will be saved on the server
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });


router.get("/server/students", (req, res) => {
  conexion.query("SELECT * FROM participantes", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.send(results);
    }
  });
});


router.post('/server/students/save', upload.single('PDF'), async (req, res) => {
  const {
    DNI,
    Nombre,
    Codigo,
    ActividadAcademica,
    Participacion,
    Instituciones,
    Horas,
    Fecha,
  } = req.body;

  if (!Codigo) {
    return res.status(400).json({ error: "El campo 'Codigo' es obligatorio" });
  }

  const pdf = req.file ? req.file.filename : '';

  try {
    const existingStudent = await getStudentByCode(Codigo);

    if (existingStudent) {
      await updateStudent(existingStudent.id, {
        DNI,
        Nombre,
        ActividadAcademica,
        Participacion,
        Instituciones,
        Horas,
        Fecha,
        pdf,
      });
      return res.status(200).json({ message: "Estudiante actualizado correctamente" });
    } else {
      await saveStudent({
        DNI,
        Nombre,
        Codigo,
        ActividadAcademica,
        Participacion,
        Instituciones,
        Horas,
        Fecha,
        pdf,
      });
      return res.status(200).json({ message: "Estudiante guardado correctamente" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

//  estudiante por código
function getStudentByCode(code) {
  return new Promise((resolve, reject) => {
    const codeQuery = "SELECT * FROM participantes WHERE Codigo = ?";
    conexion.query(codeQuery, [code], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length > 0 ? results[0] : null);
      }
    });
  });
}

//actualizar un estudiante 
function updateStudent(id, data) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE participantes SET ? WHERE id = ?`;
    conexion.query(query, [data, id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// guardar  estudiante
function saveStudent(data) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO participantes SET ?`;
    conexion.query(query, data, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}



router.delete("/server/students/delete/:codigo",(req, res) => {
  const studentCodigo = req.params.codigo;
  const deleteQuery = "DELETE FROM participantes WHERE Codigo = ?";
  conexion.query(deleteQuery, [studentCodigo], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al eliminar el estudiante" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    res.json({ message: "Estudiante eliminado exitosamente" });
  });
});


module.exports = router;  
