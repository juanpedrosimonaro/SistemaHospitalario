const express = require('express');
const medicoControlador = require('../controladores/medicoControlador');

const router = express.Router();

router.get('/',medicoControlador.dashboard);
router.get('/establecer-receta/:id',medicoControlador.crearReceta);
router.get('/establecer-medicamento-receta/:id',medicoControlador.mostrarFormularioReceta);
router.post('/agregar-medicamento-receta/:id',medicoControlador.agregarMedicamentoReceta);
router.delete('/eliminar-medicamento-receta/:id',medicoControlador.eliminarMedicamentoReceta);
router.get('/mostrar-receta/:id',medicoControlador.mostrarReceta);
router.get('/establecer-factura/:id',medicoControlador.mostrarFormularioFactura);
router.post('/establecer-factura/:id',medicoControlador.establecerFactura);

module.exports = router;
