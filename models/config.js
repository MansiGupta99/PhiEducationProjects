const Sequelize = require("sequelize");
const dbConfig = require("../db/primarySQL");
module.exports = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});