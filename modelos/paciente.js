const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Paciente extends Model{}

Paciente.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  historialMedico: {
    type: DataTypes.TEXT
  }
},{ sequelize });

Paciente.asociarUsuario = (Usuario) =>{
  Paciente.belongsTo(Usuario);
}

Paciente.asociarCita = (Cita) =>{
  Paciente.hasMany(Cita);
}

Paciente.asociarReceta = (Receta) =>{
  Paciente.hasMany(Receta);
}

Paciente.asociarFactura = (Factura) =>{
  Paciente.hasMany(Factura);
}

Paciente.asociarSeguro = (Seguro) =>{
  Paciente.hasMany(Seguro);
}

module.exports = Paciente;
