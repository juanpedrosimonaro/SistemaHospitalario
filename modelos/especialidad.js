const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Especialidad extends Model{}

Especialidad.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{ sequelize });

Especialidad.asociarMedico = (Medico) =>{
  Especialidad.hasMany(Medico);
}

module.exports = Especialidad;
