const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Receta extends Model{}

Receta.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
},{ sequelize });

Receta.asociarPaciente = (Paciente) =>{
  Receta.belongsTo(Paciente);
}

Receta.asociarMedico = (Medico) =>{
  Receta.belongsTo(Medico);
}

Receta.asociarMedicamento = (Medicamento,Posologia) =>{
  Receta.belongsToMany(Medicamento,{through:Posologia})
}


module.exports = Receta;
