const express = require('express');
const cors = require('cors');
const http = require('http'); // Cambio de 'https' a 'http'
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors()); 
app.use('/', require('./router'));
app.use(express.static('public'));
app.use('/pdfs', express.static(path.join(__dirname, 'PDF_ECOMAS')));

// Crear servidor HTTP en lugar de HTTPS
const httpServer = http.createServer(app);

httpServer.listen(4000, () => {
  console.log('HTTP SERVER Running in http://localhost:4000'); // Actualización del mensaje
});
