const Sequelize = require('sequelize');

const db = require('../data-access/database');

const User = db.define('user', {
    login: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.NUMBER
    },
    isDeleted: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = User;
