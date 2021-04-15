const sequelize = require('../data-access/database');

export default class UserGroup {
    constructor(userGroupList) {
        this.userGroupList = userGroupList;
    }

    async addUserToGroup(req, res) {
        await sequelize.sync();
        await sequelize.transaction(async (t) => {
            try {
                await this.userGroupList.create(req.body, { transaction: t });
                res.status(201).json({});
            } catch (err) {
                res.sendStatus(400);
                console.log(err);
            }
        });
    }
}
