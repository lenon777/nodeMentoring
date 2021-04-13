const db = require('../data-access/database');

const Users_Groups = db.define('Users_Groups', {}, { timestamps: false });

module.exports = Users_Groups;
