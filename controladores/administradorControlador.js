const seqSync = require('../modelos/asociador');

const mostrarOpciones = (req,res) => {
  res.render('gestionAdministrador',{title:"Gestion Administrador"})
}

const gestionPacientes = async (req,res) => {
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
const editarPaciente = async (req,res) =>{
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
const eliminarPaciente = async (req,res) => {
  const id = Number(req.body.id);
  const {Paciente, Usuario} = await seqSync;
  const usuario = await Usuario.findByPk(id);
  const paciente = await usuario.getPaciente();
  paciente.destroy();
  usuario.destroy();
}

const gestionMedicos = async (req,res) =>{
  try{
    const { Medico, Especialidad, Usuario } = await seqSync;
    const medicos = await Medico.findAll({include:[Usuario,Especialidad]});
    const especialidades = await Especialidad.findAll()
    res.render('gestionMedicos',{medicos, especialidades,title:"Gestion Medicos"})
  }catch(error){
    console.error(error);
  }
}
//const ingresarMedico = async (req,res) => {}
const editarMedico = async (req,res) => {
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
const eliminarMedico = async (req,res) => {
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

const gestionEspecialidades = async(req,res) => {
  try{
    const { Especialidad } = await seqSync;
    const especialidades = await Especialidad.findAll();
    res.render('gestionEspecialidades',{especialidades,title:"Gestion Especialidades"})
  }catch(error){
    console.error(error);
  }
}
const ingresarEspecialidad = async (req,res) => {
  const nombre = req.body.nombre;
  try{
    const { Especialidad } = await seqSync;
    const especialidad = await Especialidad.create({nombre});
    res.status(200).json({especialidad});
  }catch(error){
    console.error(error);
  }
}
const editarEspecialidad = async (req,res) => {
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
const eliminarEspecialidad =  async (req,res) => {
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

const gestionSeguros =  async (req,res) => {
  try{
    const { Seguro } = await seqSync;
    const seguros = await Seguro.findAll();
    res.render('gestionSeguros',{seguros,title:"Gestion Seguros"})
  }catch(error){
    console.error(error);
  }
}
const ingresarSeguro = async (req,res) => {
  const nombre = req.body.nombre;
  const cobertura = req.body.cobertura;
  try{
    const { Seguro } = await seqSync;
    const seguro = await Seguro.create({nombre,cobertura});
    res.status(200).json({seguro});
  }catch(error){
    console.error(error);
  }
}
const editarSeguro = async (req,res) => {
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
const eliminarSeguro = async (req,res) => {
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

const gestionMedicamentos =  async (req,res) => {
  try{
    const { Medicamento } = await seqSync;
    const medicamentos = await Medicamento.findAll();
    res.render('gestionMedicamentos',{medicamentos,title:"Gestion Medicamentos"})
  }catch(error){
    console.error(error);
  }
}
const ingresarMedicamento = async (req,res) => {
  const nombre = req.body.nombre;
  try{
    const { Medicamento } = await seqSync;
    const medicamento = await Medicamento.create({nombre});
    res.status(200).json({medicamento});
  }catch(error){
    console.error(error);
  }
}
const editarMedicamento = async (req,res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  try{
    const { Medicamento } = await seqSync;
    const medicamento = await Medicamento.findByPk(id);
    medicamento.nombre = nombre;
    medicamento.save()
    res.status(200).json({medicamento});
  }catch(error){
    console.error(error);
  }
}
const eliminarMedicamento = async (req,res) => {
  const id = req.body.id;
  try{
    const { Medicamento } = await seqSync;
    const medicamento = await Medicamento.findByPk(id);
    medicamento.destroy();
    res.status(200).json({eliminado:true});
  }catch(error){
    console.error(error);
  }
}
module.exports = {
  
  mostrarOpciones,

  gestionPacientes,
  //ingresarPaciente,
  editarPaciente,
  eliminarPaciente,

  gestionMedicos,
  //ingresarMedico,
  editarMedico,
  eliminarMedico,

  gestionEspecialidades,
  ingresarEspecialidad,
  editarEspecialidad,
  eliminarEspecialidad,

  gestionSeguros,
  ingresarSeguro,
  editarSeguro,
  eliminarSeguro,

  gestionMedicamentos,
  ingresarMedicamento,
  editarMedicamento,
  eliminarMedicamento
} 
