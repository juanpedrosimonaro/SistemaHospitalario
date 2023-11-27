const seqSync = require('../modelos/asociador');

const mostrarOpciones = (req,res) => {
  res.render('gestionAdministrador',{title:"Gestion Administrador"})
}

const gestionPacientes = (req,res) => async {
  try{
    const { Paciente, Usuario } = await seqSync
    const pacientes = await Paciente.findAll({include:Usuario});
    res.render('gestionPacientes',{pacientes,title:"Gestion Pacientes"})
  }catch(error){
    console.error(error);
  }
}
//const ingresarPaciente = (req,res) => async {
//  const id = req.body.id;
//  const nombre = req.body.nombre;
//  const email = req.body.email;
//  const telefono = req.body.telefono;
//
//  try{
//    const { Paciente, Usuario } = await seqSync;
//    const usuario = await Usuario.create({id,nombre});
//    const pacientes = await Paciente.findAll({include:Usuario});
//    res.render('gestionPacientes',{pacientes,title:"Gestion Pacientes"});
//  }catch(error){
//    console.error(error);
//  }
//}
const editarPaciente = (req,res) => async {
  const id = Number(req.body.id);
  const nombre = req.body.nombre;
  const email = req.body.email;
  const telefono = req.body.telefono;

  const historialMedico = req.body.historialMedico;
  const fechaDeNacimiento = req.body.fechaDeNacimiento;
  const genero = req.body.genero;

  try{
    const { Paciente, Usuario } = await seqSync;
    const usuario = await Usuario.findByPk(id,{include:Paciente});
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.telefono = telefono;
    await usuario.save()
    const paciente = usuario.getPaciente();
    paciente.historialMedico = historialMedico;
    paciente.fechaDeNacimiento = fechaDeNacimiento;
    paciente.genero = genero;
    paciente.save()
  }catch(error){
    console.error(error);
  }
}
const eliminarPaciente = (req,res) => async {
  const id = Number(req.body.id);
  const {Paciente, Usuario} = await seqSync;
  const usuario = await Usuario.findByPk(id);
  const paciente = await usuario.getPaciente();
  paciente.destroy();
  usuario.destroy();
}

const gestionMedicos = (req,res) => async {
  try{
    const { Medico, Especialidad, Usuario } = await seqSync;
    const medicos = await Medico.findAll({include:[Usuario,Especialidad]});
    const especialidades = await Especialidad.findAll()
    res.render('gestionMedicos',{medicos, especialidades,title:"Gestion Medicos"})
  }catch(error){
    console.error(error);
  }
}
//const ingresarMedico = (req,res) => async {}
const editarMedico = (req,res) => async {
  const id = Number(req.body.id);
  const nombre = req.body.nombre;
  const email = req.body.email;
  const telefono = req.body.telefono;

  const horaEntrada = req.body.horaEntrada;
  const horaSalida = req.body.horaSalida;
  const especialidadId = req.body.especialidadId;

  try{
    const { Medico, Usuario } = await seqSync;
    const usuario = await Usuario.findByPk(id,{include:Medico});
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.telefono = telefono;
    await usuario.save()
    const medico = usuario.getMedico();
    const especialidad = await Especialidad.findByPk(especialidadId);
    medico.setEspecialidad(especialidad);
    medico.horaEntrada = horaEntrada;
    medico.horaSalida = horaSalida;
    medico.save();
  }catch(error){
    console.error(error);
  }
}
const eliminarMedico = (req,res) => async {
  const id = Number(req.body.id);
  try{
    const {Paciente, Usuario} = await seqSync;
    const usuario = await Usuario.findByPk(id);
    const medico = await usuario.getMedico();
    medico.destroy();
    usuario.destroy();
    res.status(200).json({eliminado:true});
  }catch(error){
    console.error(error);
  }
}

const gestionEspecialidades = (req,res) => async {
  try{
    const { Especialidad } = await seqSync;
    const especialidades = await Especialidad.findAll();
    res.render('gestionEspecialidades',{especialidades,title:"Gestion Especialidades"})
  }catch(error){
    console.error(error);
  }
}
const ingresarEspecialidad = (req,res) => async {
  const nombre = req.body.nombre;
  try{
    const { Especialidad } = await seqSync;
    const especialidad = await Especialidad.create({nombre});
    res.status(200).json({especialidad});
  }catch(error){
    console.error(error);
  }
}
const editarEspecialidad = (req,res) => async {
  const id = req.body.id;
  const nombre = req.body.nombre;
  try{
    const { Especialidad } = await seqSync;
    const especialidad = await Especialidad.findByPk(id);
    especialidad.nombre = nombre;
    especialidad.save()
    res.status(200).json({especialidad});
  }catch(error){
    console.error(error);
  }

}
const eliminarEspecialidad = (req,res) => async {
  const id = req.body.id;
  try{
    const { Especialidad } = await seqSync;
    const especialidad = await Especialidad.findByPk(id);
    especialidad.destroy();
    res.status(200).json({eliminado:true});
  }catch(error){
    console.error(error);
  }
}

const gestionSeguros = (req,res) => async {
  try{
    const { Seguro } = await seqSync;
    const especialidades = await Seguro.findAll();
    res.render('gestionSeguros',{especialidades,title:"Gestion Seguros"})
  }catch(error){
    console.error(error);
  }
}
const ingresarSeguro = (req,res) => async {
  const nombre = req.body.nombre;
  try{
    const { Seguro } = await seqSync;
    const seguro = await Seguro.create({nombre});
    res.status(200).json({seguro});
  }catch(error){
    console.error(error);
  }
}
const editarSeguro = (req,res) => async {
  const id = req.body.id;
  const nombre = req.body.nombre;
  try{
    const { Seguro } = await seqSync;
    const seguro = await Seguro.findByPk(id);
    seguro.nombre = nombre;
    seguro.save()
    res.status(200).json({seguro});
  }catch(error){
    console.error(error);
  }
}
const eliminarSeguro = (req,res) => async {
  const id = req.body.id;
  try{
    const { Seguro } = await seqSync;
    const seguro = await Seguro.findByPk(id);
    seguro.destroy();
    res.status(200).json({eliminado:true});
  }catch(error){
    console.error(error);
  }
}

module.exports = {
  gestionPacientes,
  ingresarPaciente,
  editarPaciente,
  eliminarPaciente,

  gestionMedicos,
  ingresarMedico,
  editarMedico,
  eliminarMedico,

  gestionEspecialidades,
  ingresarEspecialidad,
  editarEspecialidad,
  eliminarEspecialidad,

  gestionSeguros,
  ingresarSeguro,
  editarSeguro,
  eliminarSeguro
} 
