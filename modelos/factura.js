const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Factura extends Model{}

Factura.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  costos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  serviciosPrestados: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('Emitida','Vencida','Pagada','Parcialmente Pagada', 'Cancelada', 'En disputa'),
    allowNull: false
  }
},{ sequelize });

Factura.asociarPaciente = (Paciente) =>{
  Factura.belongsTo(Paciente);
}

module.exports = Factura;
