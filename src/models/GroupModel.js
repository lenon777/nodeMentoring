const Sequelize = require('sequelize');

const db = require('../data-access/database');

const Group = db.define('group', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
    },
    permission: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    }
});

module.exports = Group;
