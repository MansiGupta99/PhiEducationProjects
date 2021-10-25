const Sequelize = require("sequelize");
const sequelize = require("../models/config");
const dbConfig = require("../db/primarySQL");

database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;
const { users } = require("./user.js");
const{contactMe} = require("./contactMe");
database.users = users(sequelize, Sequelize);
database.contactMe = contactMe(sequelize,Sequelize);


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
    database   
}