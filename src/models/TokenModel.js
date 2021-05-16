const Sequelize = require('sequelize');
const db = require('../data-access/database');

const Token = db.define('Token', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER
    },
    token: {
        type: Sequelize.STRING
    }
});

module.exports = Token;
