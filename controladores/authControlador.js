const seqSync = require('../modelos/asociador');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mostrarLogin = (req,res) => {
  res.render('login',{title:"Inicio de Sesion"})
}

const loguearUsuario = async (req,res) => {
  const nombre = req.body.nombre;
  const contrasena = req.body.contrasena;
  try{
    const { Usuario, Paciente, Medico, Administrador } = await seqSync;
    const usuario = await Usuario.findOne({where:{nombre},include:[Paciente, Medico, Administrador]})
    bcrypt.compare(contrasena, usuario.contrasena, (err,result)=>{
      if(result){
        console.log("Contraseña correcta");
        jwt.sign({usuario}, 'clave_ultrasecreta', (err, token) => {
          if (err) {
            res.sendStatus(500);
          } else {
            console.log("Usuario iniciado");
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');
          }
        })
      }
      else console.log("Contraseña es incorrecta")
    })
  }catch(error){
    console.error(error);
    res.status(300).json({error})
  }
}

const mostrarRegistro = async (req,res) => {
  try{
    const { Especialidad } = await seqSync;
    const especialidades = await Especialidad.findAll();
    res.render('registro',{title:"Inicio de Sesion",especialidades});
  }catch(error){
    console.error(error);
    res.status(300).json({error})
  }
}

const registrarUsuario = async (req,res) => {
  const nombre = req.body.nombre;
  const email = req.body.email;
  const telefono = req.body.telefono;
  const contrasena = req.body.contrasena;
  const tipo = req.body.tipo;
  try{
    const { Usuario, Paciente, Medico, Administrador, Especialidad } = await seqSync;
    bcrypt.hash(contrasena,10,async(err,hash)=>{
      if(!err){
        const usuario = await Usuario.create({nombre,tipo,contrasena:hash,email,telefono});
        switch(tipo){
          case 'Paciente':
            const fechaDeNacimiento = req.body.fechaDeNacimiento;
            const historialMedico = req.body.historialMedico;
            const genero = req.body.genero;
            const paciente = await Paciente.create({fechaDeNacimiento,historialMedico,genero});
            await usuario.setPaciente(paciente);
            break;
          case 'Medico':
            const horaEntrada = req.body.horaEntrada;
            const horaSalida = req.body.horaSalida;
            const especialidadNombre = req.body.especialidad;
            const especialidad = await Especialidad.findOne({where:{nombre:especialidadNombre}});
            const medico = await Medico.create({horaEntrada,horaSalida});
            await medico.setEspecialidad(especialidad);
            await usuario.setMedico(medico);
            break;
          case 'Administrador':
            const departamento = req.body.departamento;
            const administrador = await Administrador.create({departamento});
            await usuario.setAdministrador(administrador)
            break;
        }
        jwt.sign({usuario}, 'clave_ultrasecreta', (err, token) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/')
          }
        })
      }
    })
  } catch(error){
    console.error(error)
    res.status(300).json(error)
  }

}

const cerrarSesion = (req,res) =>{
  res.clearCookie('token');
  res.redirect('/auth/iniciar-sesion');
}

module.exports = {
  mostrarLogin,
  loguearUsuario,
  mostrarRegistro,
  registrarUsuario,
  cerrarSesion
} 
