require("dotenv/config");
module.exports = {
    HOST: "localhost",
    database: "userdb",
    PASSWORD: "password",
    dialect: "mysql",
    user: 'sqluser',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

