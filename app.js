const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors()); 
app.use('/', require('./router'));
app.use(express.static('public'));
app.use('/pdfs', express.static(path.join(__dirname, 'PDF_ECOMAS')));

// Configuración de certificado y clave
const certificatePath = '/etc/letsencrypt/live/ecomas.pe/fullchain.pem';
const privateKeyPath = '/etc/letsencrypt/live/ecomas.pe/privkey.pem';
const credentials = {
  key: fs.readFileSync(privateKeyPath),
  cert: fs.readFileSync(certificatePath),
};

// Crear servidor HTTPS
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(4000, () => {
  console.log('HTTPS SERVER Running in https://localhost:4000');
});
