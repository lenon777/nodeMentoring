'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users_Groups extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Users_Groups.init(
        {
            userId: DataTypes.INTEGER,
            groupId: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Users_Groups'
        }
    );
    return Users_Groups;
};
