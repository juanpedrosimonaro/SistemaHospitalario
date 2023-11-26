const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Receta extends Model{}

Posologia.init({
  cantidad: {
    type: DataTypes.INTEGER,
  },
  frecuencia: {
    type: DataTypes.STRING
  },
  fechaLimite: {
    type: DataTypes.DATE
  }
},{ sequelize });

module.exports = Posologia;
