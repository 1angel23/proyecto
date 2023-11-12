// app.js

const express = require('express');
const app = express();
const port = 3001; // Puerto en el que se ejecutará la aplicación
const db = require('./db');

app.use(express.urlencoded({ extended: false }));

// Ruta para el formulario HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/registro.html');
});

// Ruta para manejar el envío del formulario
app.post('/guardar', (req, res) => {
    const { campo1, campo2 } = req.body;
  
    // Verifica si los campos requeridos están presentes
    if (!campo1 || !campo2) {
      return res.status(400).send("Los campos son requeridos");
    }
  
    // Define la consulta SQL para insertar los datos en la base de datos
    const insertQuery = "INSERT INTO datos (campo1, campo2) VALUES (?, ?)";
  
    // Ejecuta la consulta SQL con los datos del formulario
    db.query(insertQuery, [campo1, campo2], (err, results) => {
      if (err) {
        console.error("Error al guardar los datos:", err);
        return res.status(500).send("Error al guardar los datos en la base de datos");
      }
      
      // Los datos se han guardado exitosamente
      res.status(200).send("Datos guardados exitosamente");
    });
  });

app.listen(port, () => {
  console.log(`Aplicación en ejecución en http://localhost:${port}`);
});
