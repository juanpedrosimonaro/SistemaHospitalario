const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Cita extends Model{}

Cita.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull:false
  },
  motivo: {
    type: DataTypes.STRING
  }
},{ sequelize });

Cita.asociarPaciente = (Paciente) =>{
  Cita.belongsTo(Paciente);
}

Cita.asociarMedico = (Medico) =>{
  Cita.belongsTo(Medico);
}


module.exports = Cita;
