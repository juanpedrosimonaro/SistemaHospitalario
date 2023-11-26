const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Seguro extends Model{}

Seguro.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cobertura: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},{ sequelize });

Seguro.asociarPaciente = (Paciente) =>{
  Seguro.belongsTo(Paciente);
}

module.exports = Seguro;
