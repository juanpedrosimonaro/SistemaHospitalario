const express = require('express');
const pacienteControlador = require('../controladores/pacienteControlador');

const router = express.Router();

router.get('/',pacienteControlador.dashboard);
router.get('/establecer-cita',pacienteControlador.mostrarFormularioCita);
router.post('/establecer-cita',pacienteControlador.establecerCita);
router.get('/mostrar-factura/:id',pacienteControlador.mostrarFactura);
router.get('/mostrar-receta/:id',pacienteControlador.mostrarReceta);

module.exports = router;
