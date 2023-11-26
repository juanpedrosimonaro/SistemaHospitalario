const express = require('express');

// express app
const app = express();
app.set('views','./vistas');
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// rutas
app.get('/', (req,res)=>{
  res.render('index', {title:"Pagina Principal"});
})

const server = app.listen(3000,()=>{
  console.log('Servidor iniciado en el puerto 3000')
})

module.exports = server;