const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors()); 
app.use('/', require('./router'));
app.use(express.static('public'));

app.use('/pdfs', express.static(path.join(__dirname, 'PDF_ECOMAS')));

app.listen(4000, () => {
  app.on("listen",function(){
    console.log('SERVER Running in http://localhost:4000');
  })
});
