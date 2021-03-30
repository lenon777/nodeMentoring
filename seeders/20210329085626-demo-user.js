'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
         await queryInterface.bulkInsert(
            'users',
            [
                {
                    id: 404,
                    login: 'qweasd404@asd.com',
                    password: '1W231RRR23',
                    age: 25,
                    isDeleted: false,
                },
                {
                    id: 500,
                    login: 'qweasd500@asd.com',
                    password: 'D2Wrff5H',
                    age: 35,
                    isDeleted: false,
                },
                {
                    id: 300,
                    login: 'qweasd300@asd.com',
                    password: '1W231RRR23',
                    age: 35,
                    isDeleted: false,
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    },
};
