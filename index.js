const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const authRutas = require('./rutas/authRutas');
const pacienteRutas = require('./rutas/pacienteRutas');
//const medicoRutas = require('./rutas/medicoRutas');
const administradorRutas = require('./rutas/administradorRutas');

// express app
const app = express();
app.set('views','./vistas');
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const verificarToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/auth/iniciar-sesion');
  }
  jwt.verify(token, 'clave_ultrasecreta', (err, decoded) => {
    if (err) {
      console.log
      return res.redirect('/auth/iniciar-sesion');
    }
    req.usuario = decoded.usuario;
    next();
  });
}
const verificarPaciente = (req, res, next) => {
  console.log("Verificando...")
  console.log(req.usuario)
  if(req.usuario && req.usuario.tipo == "Paciente"){
    next()
  }else{
    return res.status(403).send('Acceso denegado');
  }
}

const verificarMedico = (req, res, next) => {
  if(req.usuario && req.usuario.tipo == "Medico"){
    next()
  }else{
    return res.status(403).send('Acceso denegado');
  }
}

const verificarAdministrador = (req, res, next) => {
  if(req.usuario && req.usuario.tipo == "Administrador"){
    console.log("Verificado")
    next()
  }else{
    return res.status(403).send('Acceso denegado');
  }
}

// rutas
app.get('/',verificarToken, (req,res)=>{
  switch(req.usuario.tipo){
    case "Paciente":
      res.redirect('/paciente/')
      // res.render('gestionPaciente', {title:"Pagina Principal"});
      break;
    case "Medico":
      res.redirect('/medico/')
      //res.render('gestionMedico', {title:"Pagina Principal"});
      break;
    case "Administrador":
      console.log("Redirigiendo...")
      res.redirect('/administrador/')
      res.render('gestionAdministrador', {title:"Pagina Principal"});
      break;
    default:
      res.clearCookie(token);
  }
})
app.use('/auth',authRutas);
app.use('/paciente', verificarToken, verificarPaciente, pacienteRutas);
//app.use('/medico', verificarToken, verificarMedico, medicoRutas);
app.use('/administrador', verificarToken, verificarAdministrador, administradorRutas);


const server = app.listen(3000,()=>{
  console.log('Servidor iniciado en el puerto 3000')
})

module.exports = server;
