const xlsx = require('xlsx');
const conexion = require('./conexion'); // Importa el módulo de conexión a la base de datos MySQL

function importarEstudiantesDesdeExcel(nombreArchivo) {
  // Cargar el archivo Excel
  const workbook = xlsx.readFile(nombreArchivo);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convertir el contenido del archivo Excel en un objeto JSON
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // Recorrer el objeto JSON y agregar o actualizar cada estudiante en la base de datos
  jsonData.forEach((estudiante) => {
    // Verificar si el código del estudiante ya existe en la base de datos
    const query = "SELECT * FROM students WHERE codigo = ?";
    conexion.query(query, [estudiante.codigo], (error, results) => {
      if (error) {
        console.error("Error al consultar la base de datos:", error);
        return;
      }

      if (results.length > 0) {
        // El estudiante ya existe, entonces actualiza los datos
        const updateQuery = "UPDATE students SET ? WHERE codigo = ?";
        conexion.query(updateQuery, [estudiante, estudiante.codigo], (error, result) => {
          if (error) {
            console.error("Error al actualizar el estudiante en la base de datosxdxdxd:", error);
            return;
          }
          console.log("Estudiante actualizado correctamentexdxddx:", estudiante.codigo);
        });
      } else {
        // El estudiante no existe, así que lo inserta en la base de datos
        const insertQuery = "INSERT INTO students SET ?";
        conexion.query(insertQuery, estudiante, (error, result) => {
          if (error) {
            console.error("Error al guardar el estudiante en la base de datos:", error);
            return;
          }
          console.log("Estudiante insertado correctamente:", estudiante.codigo);
        });
      }
    });
  });
}

// Ejemplo de uso: importar estudiantes desde un archivo Excel llamado "estudiantes.xlsx"
importarEstudiantesDesdeExcel('estudiantes.xlsx');
