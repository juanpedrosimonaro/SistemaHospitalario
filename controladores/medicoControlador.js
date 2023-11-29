const seqSync = require('../modelos/asociador');
const jwt = require('jsonwebtoken');

const obtenerUsuario = (token) => {
  return  jwt.verify(token, 'clave_ultrasecreta', (err, decoded) => {
    if (err) {
      console.log(err)
      return res.redirect('/auth/iniciar-sesion');
    }
    return decoded.usuario;
  });
}

const dashboard = async (req,res) =>{
  const usuario = obtenerUsuario(req.cookies.token)
  try{
    const { Cita, Receta, Paciente, Medico, Medicamento, Factura, Usuario } = await seqSync;
    const medico = await Medico.findByPk(usuario.Medico.id,{include:[{model:Cita,include:{model:Paciente,include:Usuario}},{model:Receta,include:{model:Paciente,include:Usuario}}]});
    res.render('dashboardMedico',{medico,title:"Dashboard Medico"});
  }catch(error){
    console.log(error)
  }
}

const crearReceta = async (req,res) =>{
  try{
    const PacienteId = req.params.id;
    const usuario = obtenerUsuario(req.cookies.token)
    const { Receta } = await seqSync;
    const receta = await Receta.create({MedicoId:usuario.Medico.id,PacienteId})
    res.redirect(`/medico/establecer-medicamento-receta/${receta.id}`)
    //res.render('formularioReceta',{medicamentos, receta, title:"Formulario Receta"})
  }catch(error){
    console.log(error)
  }
}


const mostrarFormularioReceta = async (req,res) =>{
  const RecetaId = req.params.id;
  const usuario = obtenerUsuario(req.cookies.token)
  try{
    const { Medicamento, Receta, Medico } = await seqSync;
    const receta = await Receta.findByPk(RecetaId,{include:[Medico,Medicamento]});
    if (receta.Medico.id != usuario.Medico.id) throw new Error("La receta no le petenece al medico");
    const medicamentos = await Medicamento.findAll();
    res.render('formularioReceta',{medicamentos, receta, title:"Formulario Receta"})
  }catch(error){
    console.log(error)
  }
}

const agregarMedicamentoReceta = async (req,res) =>{
  const RecetaId = req.params.id;
  const MedicamentoId = req.body.MedicamentoId;
  const cantidad = req.body.cantidad;
  const frecuencia = req.body.frecuencia;
  const fechaLimite = req.body.fechaLimite;
  try{
    const { Receta, Medicamento } = await seqSync;
    const receta = await Receta.findByPk(RecetaId);
    const medicamento = await Medicamento.findByPk(MedicamentoId);
    await receta.addMedicamento(medicamento,{through:{cantidad,frecuencia,fechaLimite}})
    res.status(200).json({receta})
  }catch(error){
    console.log(error)
  }
}

const eliminarMedicamentoReceta = async (req,res) =>{
  const RecetaId = req.params.id;
  const MedicamentoId = req.body.id;
  try{
    const { Receta, Medicamento } = await seqSync;
    const receta = await Receta.findByPk(RecetaId);
    const medicamento = await Medicamento.findByPk(MedicamentoId);
    await receta.removeMedicamento(medicamento);
    res.status(200).json({receta});
  }catch(error){
    console.log(error)
  }
}

const mostrarReceta = async (req,res) =>{
  const id = req.params.id
  const usuario = obtenerUsuario(req.cookies.token);
  try{
    const { Paciente, Receta, Medicamento, Medico } = await seqSync;
    const medico = await Medico.findByPk(usuario.Medico.id);
    const medicoRecetas = await medico.getReceta();
    const receta = await Receta.findByPk(id,{include:[Medicamento,Paciente,Medico]});
    if(!medicoRecetas.map(meRe=>meRe.id).includes(receta.id))throw new Error("La receta no le pertenece al paciente");
    res.render('mostrarReceta',{receta,title:"Receta"})

  }catch(error){
    console.log(error)
  }
}

const mostrarFormularioFactura = async (req,res) =>{
  const { Factura } = await seqSync;
  const PacienteId = req.params.id;
  const estadosFactura = await Factura.getAttributes().estado.values;
  res.render('formularioFactura',{PacienteId, estadosFactura, title:"Formulario Cita"});
}

const establecerFactura = async (req,res) =>{
  const PacienteId = req.params.id;
  const serviciosPrestados = req.body.serviciosPrestados
  const costos = req.body.costos;
  const estado = req.body.estado
  try{
    const { Factura } = await seqSync;
    await Factura.create({PacienteId,serviciosPrestados,costos,estado});
    res.redirect('/medico/');
  }catch(error){
    console.log(error)
  }
}



module.exports = {
  dashboard,
  crearReceta,
  mostrarFormularioReceta,
  agregarMedicamentoReceta,
  eliminarMedicamentoReceta,
  mostrarReceta,
  mostrarFormularioFactura,
  establecerFactura
} 
