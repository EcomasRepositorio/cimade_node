const express = require('express');
const router = express.Router();
const conexion = require('./database/db');
const multer = require('multer');
const path = require('path');

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'PDF_ECOMAS/'); // The folder where PDFs will be saved on the server
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });


router.get("/students", (req, res) => {
  conexion.query("SELECT * FROM participantes", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.send({ results: results });
    }
  });
});

router.post('/students/save', upload.single('PDF'), async (req, res) => {
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

  const pdf = req.file ? req.file.filename : '';

  const codeQuery = "SELECT * FROM participantes WHERE Codigo = ?";
  conexion.query(codeQuery, [Codigo], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al consultar la base de datos" });
    }

    if (results.length > 0) {
      // Si el código ya existe, actualiza los datos del estudiante
      const updateQuery =
        "UPDATE participantes SET DNI = ?, Nombre = ?, ActividadAcademica = ?, Participacion = ?, Instituciones = ?, Horas = ?, Fecha = ?, pdf = ? WHERE Codigo = ?";
      conexion.query(
        updateQuery,
        [
          DNI,
          Nombre,
          ActividadAcademica,
          Participacion,
          Instituciones,
          Horas,
          Fecha,
          pdf,
          Codigo
        ],
        (error, result) => {
          if (error) {
            return res.status(500).json({
              error: "Error al actualizar el participante en la base de datos",
            });
          }
          return res
            .status(200)
            .json({ message: "Estudiante actualizado correctamente" });
        }
      );
    } else {
      // Si el código no existe, agrega un nuevo estudiante
      const newStudent = {
        DNI,
        Nombre,
        Codigo,
        ActividadAcademica,
        Participacion,
        Instituciones,
        Horas,
        Fecha,
        pdf
      };

      const insertQuery = "INSERT INTO participantes SET ?";
      conexion.query(insertQuery, newStudent, (error, result) => {
        if (error) {
          return res.status(500).json({
            error: "Error al guardar el participante en la base de datos",
          });
        }
        return res
          .status(200)
          .json({ message: "Estudiante guardado correctamente" });
      });
    }
  });
});


router.delete("/students/delete/:codigo",(req, res) => {
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

/* forms */

router.get("/forms", (req, res) => {
  conexion.query("SELECT * FROM formularios", (error, results) => {
    if (error) {
      throw error;
    } else {  
      res.send({ results: results });
    }
  });
});

router.use('/img', express.static('IMG_BANNER_ECOMAS'));


const storageImg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "IMG_BANNER_ECOMAS/"); // The folder where the images will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const uploadImg = multer({ storage: storageImg }); // Use storageImg instead of storage

router.post("/formulario/add", uploadImg.single("image"), (req, res) => {
  const { url } = req.body;
  const imageName = req.file ? req.file.filename : null; // Get the saved image name

  // Save the image name and link in the database
  const sql = "INSERT INTO `formularios` (`id`, `link`, `banner`) VALUES (NULL, ?, ?);";
  const values = [url, imageName];

  conexion.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error al guardar en la base de datos." });
    } else {
      const imageUrl = req.protocol + "://" + req.get("host") + "/img/" + imageName; // Construct the image URL
      res.json({ message: "Datos guardados con éxito.", imageUrl }); // Send the image URL in the response
    }
  });
});


module.exports = router;  
