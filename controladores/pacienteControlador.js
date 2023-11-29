const seqSync = require('../modelos/asociador');
const jwt = require('jsonwebtoken');

const obtenerUsuario = (token) => {
  return  jwt.verify(token, 'clave_ultrasecreta', (err, decoded) => {
    if (err) {
      console.log
      return res.redirect('/auth/iniciar-sesion');
    }
    return decoded.usuario;
  });
}

const dashboard = async (req,res) =>{
  const PacienteId = req.usuario.Paciente.id;
  try{
    const { Cita, Receta, Paciente, Medico, Medicamento, Factura, Usuario } = await seqSync;
    const paciente = await Paciente.findByPk(PacienteId,{include:[{model:Cita,include:{model:Medico,include:Usuario}},{model:Receta,include:{model:Medico,include:Usuario}},Factura]});
    console.log(paciente,PacienteId)

    res.render('dashboardPaciente',{paciente,title:"Dashboard Paciente"});
  }catch(error){
    console.log(error)
  }
}

const mostrarFormularioCita = async (req,res) =>{
  try{
    const { Especialidad, Medico, Usuario, Cita } = await seqSync;
    const especialidades = await Especialidad.findAll({include: {model:Medico, include:[Usuario,Cita]}})
    res.render('formularioCita',{especialidades, title:"Formulario Cita"})
  }catch(error){
    console.log(error)
  }
}

const establecerCita = async (req,res) =>{
  const MedicoId = req.body.MedicoId;
  console.log(req.body.fecha);
  var [ anno, mes, dia ] = req.body.fecha.split('-').map(f=>Number(f));
  const hora = Number(req.body.hora.split(':')[0]);
  if(mes > 1) mes = mes - 1;
  else {
    mes = 12
    anno = anno - 1
  }
  const fecha = new Date(anno,mes,dia,hora,0,0);
  console.log(fecha);
  const motivo = req.body.motivo;
  const { Paciente } = obtenerUsuario(req.cookies.token);
  try{
    const { Cita } = await seqSync;
    const cita = await Cita.create({MedicoId,PacienteId:Paciente.id,fecha,motivo});
    res.redirect('/paciente/')
  }catch(error){
    console.log(error)
  }
}

const mostrarFactura = async (req,res) =>{
  const id = req.params.id
  const usuario = obtenerUsuario(req.cookies.token);
  try{
    const { Paciente, Factura } = await seqSync;
    const paciente = await Paciente.findByPk(usuario.Paciente.id);
    const facturasPaciente = await paciente.getFacturas();
    const factura = await Factura.findByPk(id);
    if(!facturasPaciente.map(paFa=>paFa.id).includes(factura.id)) throw new Error("La factura no le pertenece al paciente")
    res.render('mostrarFactura',{factura,title:"Factura"})
  }catch(error){
    console.log(error)
  }
}

const mostrarReceta = async (req,res) =>{
  const id = req.params.id
  const usuario = obtenerUsuario(req.cookies.token);
  try{
    const { Paciente, Receta, Medicamento, Medico } = await seqSync;
    const paciente = await Paciente.findByPk(usuario.Paciente.id);
    const pacienteRecetas = await paciente.getReceta();
    console.log(pacienteRecetas);
    const receta = await Receta.findByPk(id,{include:[Medicamento,Paciente,Medico]});
    console.log(receta)
    if(!pacienteRecetas.map(paRe=>paRe.id).includes(receta.id))throw new Error("La receta no le pertenece al paciente");
    res.render('mostrarReceta',{receta,title:"Receta"})

  }catch(error){
    console.log(error)
  }
}

module.exports = {
  dashboard,
  mostrarFormularioCita,
  establecerCita,
  mostrarFactura,
  mostrarReceta
} 
