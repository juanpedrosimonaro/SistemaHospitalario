const express = require('express');
const authControlador = require('../controladores/authControlador');

const router = express.Router();

router.get('/iniciar-sesion',authControlador.mostrarLogin);
router.post('/iniciar-sesion',authControlador.loguearUsuario);
router.get('/registro',authControlador.mostrarRegistro);
router.post('/registro',authControlador.registrarUsuario);
router.get('/cerrar-sesion',authControlador.cerrarSesion);

module.exports = router;