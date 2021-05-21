const Sequelize = require('sequelize');
const db = require('../data-access/database');

const RefreshToken = db.define('RefreshToken', {
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

module.exports = RefreshToken;
