const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    "postgres",
    "postgres",
    "mama33mama",
    {
        dialect: 'postgres',
        host: process.env.HOST_DB,
        port: process.env.PORT_DB,
    }
);