const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors()); 
app.use('/', require('./router'));
app.use(express.static('public'));

app.use('/pdfs', express.static(path.join(__dirname, 'PDF_ECOMAS')));


app.listen(8000, () => {
  console.log('SERVER Running in http://146.190.43.175:8000');
});
