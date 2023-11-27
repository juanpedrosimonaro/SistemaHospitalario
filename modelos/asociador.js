const Usuario = require("./usuario");
const Paciente = require("./paciente");
const Medico = require("./medico");
const Administrador = require("./administrador");
const Cita = require("./cita");
const Receta = require("./receta");
const Factura = require("./factura");
const Seguro = require("./seguro");
const Especialidad = require("./especialidad");
const Posologia = require("./posologia");
const Medicamento = require("./medicamento");

const sequelize = require("../db");

Usuario.asociarPaciente(Paciente);
Usuario.asociarMedico(Medico);
Usuario.asociarAdministrador(Administrador);

Paciente.asociarUsuario(Usuario);
Paciente.asociarCita(Cita);
Paciente.asociarReceta(Receta);
Paciente.asociarFactura(Factura);
Paciente.asociarSeguro(Seguro);

Medico.asociarCita(Cita);
Medico.asociarReceta(Receta);
Medico.asociarEspecialidad(Especialidad);

Especialidad.asociarMedico(Medico)

Cita.asociarPaciente(Paciente);
Cita.asociarMedico(Medico);

Receta.asociarPaciente(Paciente);
Receta.asociarMedico(Medico);
Receta.asociarMedicamento(Medicamento,Posologia);

Medicamento.asociarReceta(Receta,Posologia);

Factura.asociarPaciente(Paciente);

Seguro.asociarPaciente(Paciente);

module.exports = sequelize.sync().then(()=>
({
    Usuario,
    Paciente,
    Medico,
    Administrador,
    Cita,
    Receta,
    Factura,
    Seguro,
    Especialidad,
    Posologia
})
);
