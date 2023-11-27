const express = require('express');
const administradorControlador = require('../controladores/administradorControlador');

const router = express.Router();

router.get('/',administradorControlador.mostrarOpciones);

router.get('/gestion-pacientes',administradorControlador.gestionPacientes);
//router.post('/ingresar-paciente',administradorControlador.ingresarPaciente);
router.put('/editar-paciente',administradorControlador.editarPaciente);
router.delete('/eliminar-paciente',administradorControlador.eliminarPaciente);

router.get('/gestion-medicos',administradorControlador.gestionMedicos);
//router.post('/ingresar-medico',administradorControlador.ingresarMedico);
router.put('/editar-medico',administradorControlador.editarMedico);
router.delete('/eliminar-medico',administradorControlador.eliminarMedico);

router.get('/gestion-especialidades',administradorControlador.gestionEspecialidades);
router.post('/ingresar-especialidad',administradorControlador.ingresarEspecialidad);
router.put('/editar-especialidad',administradorControlador.editarEspecialidad);
router.delete('/eliminar-especialidad',administradorControlador.eliminarEspecialidad);

router.get('/gestion-seguros',administradorControlador.gestionSeguros);
router.post('/ingresar-seguro',administradorControlador.ingresarSeguro);
router.put('/editar-seguro',administradorControlador.editarSeguro);
router.delete('/eliminar-seguro',administradorControlador.eliminarSeguro);

module.exports = router;
