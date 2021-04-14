const Sequelize = require('sequelize');
const db = require('../data-access/database');

const Users_Groups = db.define(
    'Users_Groups',
    {
        userId: {
            type: Sequelize.INTEGER
        },
        groupId: {
            type: Sequelize.INTEGER
        }
    },
    { timestamps: false }
);

module.exports = Users_Groups;
