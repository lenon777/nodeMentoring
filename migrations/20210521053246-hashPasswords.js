'use strict';

const bcrypt = require('bcrypt');
const { QueryTypes } = require('sequelize');

const getHash = (value) => {
    return bcrypt.hashSync(value, 10);
};

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const users = await queryInterface.sequelize.query(`select id, password from public.users`, {
            type: QueryTypes.SELECT
        });
        await queryInterface.sequelize.transaction(async (t) => {
            try {
                for (let i = 0; i < users.length; i++) {
                    await queryInterface.sequelize.query(
                        `UPDATE public.users set password = '${getHash(users[i].password)}'  where id=${users[i].id}`,
						{ transaction: t }
                    );
                }
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

//await this.userGroupList.create(req.body, { transaction: t });
