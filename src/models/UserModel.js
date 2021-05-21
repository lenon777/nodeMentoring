const Sequelize = require('sequelize');

const db = require('../data-access/database');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.NUMBER
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

//User.associate = (models) => {
//    User.hasOne(models.RefreshToken, {
//        foreignKey: 'userId',
//        as: 'RefreshToken',
//        onDelete: 'CASCADE'
//    });
//};

module.exports = User;
