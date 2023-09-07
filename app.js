const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors()); 
app.use('/', require('./router'));
app.use(express.static('public'));

app.use('/pdfs', express.static(path.join(__dirname, 'PDF_ECOMAS')));

app.get('/app/forms', (req, res) => {
  // Aquí puedes manejar la lógica para la ruta /app/forms
  // Por ejemplo, puedes devolver una respuesta JSON como en tu ejemplo
  const data = {
    results: [
      {
        id: 1,
        link: "hola.com",
        banner: "image-1692397621953-782067379.png"
      }
    ]
  };
  res.json(data);
});

app.listen(4000, () => {
  app.on("listen",function(){
    console.log('SERVER Running in http://localhost:4000');
  })
});
