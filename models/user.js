'use strict';
const { Model } = require('sequelize');

class User extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
module.exports = (sequelize, DataTypes) => {
	User.init(
		{
			login: DataTypes.STRING,
			password: DataTypes.STRING,
			age: DataTypes.NUMBER,
			isDeleted: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
