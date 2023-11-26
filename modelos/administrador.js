const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Administrador extends Model{}

Administrador.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  departamento: {
    type: DataTypes.STRING,
  }
},{ sequelize });


module.exports = Administrador;
