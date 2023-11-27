const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Medicamento extends Model{}

Medicamento.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  efectosSecundarios: {
    type: DataTypes.TEXT
  }
},{ sequelize });

Medicamento.asociarReceta = (Receta,Posologia) =>{
  Medicamento.belongsToMany(Receta,{through:Posologia})
}


module.exports = Medicamento;
