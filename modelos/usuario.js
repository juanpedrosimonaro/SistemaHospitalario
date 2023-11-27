const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Usuario extends Model{}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  contrasena: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  tipo: {
    type: DataTypes.ENUM('Paciente','Medico','Administrador'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
},{ sequelize });

Usuario.asociarPaciente = (Paciente) =>{
  Usuario.hasOne(Paciente);
}

Usuario.asociarMedico = (Medico) =>{
  Usuario.hasOne(Medico);
}

Usuario.asociarAdministrador = (Administrador) =>{
  Usuario.hasOne(Administrador);
}

module.exports = Usuario;
