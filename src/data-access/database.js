const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

module.exports = new Sequelize(
    config.database,
    config.dialect,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,

        pool: {
            max: 5,
            min: 0,
            acquire: 3000,
            idle: 10000,
        },
    }
);
