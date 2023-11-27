const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Posologia extends Model{}

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
