require("dotenv").config()
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASENAME,process.env.DBUSERNAME,process.env.DBPASSWORD,{
  host: process.env.DBHOST,
  dialect: process.env.DBDIALECT
});

module.exports = sequelize;