'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (t) => {
            try {
                await queryInterface.sequelize.query('ALTER TABLE users ADD UNIQUE (login);', { transaction: t });
            } catch (err) {
                console.log(err);
                await t.rollback();
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
