const Sequelize = require('sequelize');
const db = require('../data-access/database');

const Token = db.define(
    'Token',
    {
        id: {
            type: Sequelize.INTEGER,
			primaryKey: true,
        },
        token: {
            type: Sequelize.STRING
        }
    },
    { timestamps: false }
);

module.exports = Token;
