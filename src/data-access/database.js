const Sequelize = require('sequelize');

module.exports =  new Sequelize('users', 'postgres', 'Marko2021', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
});

