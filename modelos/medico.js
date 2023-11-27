const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Medico extends Model{}

Medico.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  horaInicial: {
    type: DataTypes.TIME,
    allowNull: false
  },

  horaFinal: {
    type: DataTypes.TIME,
    allowNull: false
  }
},{ sequelize });


Medico.asociarCita = (Cita) =>{
  Medico.hasMany(Cita);
}

Medico.asociarReceta = (Receta) =>{
  Medico.hasMany(Receta);
}

Medico.asociarEspecialidad = (Especialidad) =>{
  Medico.belongsTo(Especialidad);
}

module.exports = Medico;
