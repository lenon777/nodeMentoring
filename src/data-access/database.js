const Sequelize = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(process.env.database, process.env.dialect, process.env.password, {
    host: process.env.host,
    dialect: process.env.dialect,

    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
});
