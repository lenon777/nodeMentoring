'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users_Groups', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                onDelete: 'CASCADE'
            },
            groupId: {
                type: Sequelize.INTEGER,
                references: { model: 'groups', key: 'id' },
                onDelete: 'CASCADE'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users_Groups');
    }
};
