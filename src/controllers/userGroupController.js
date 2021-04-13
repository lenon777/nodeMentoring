const sequelize = require('../data-access/database');

export default class UserGroup {
    constructor(usersList, groupList) {
        this.usersList = usersList;
        this.groupList = groupList;
    }

    async addUserToGroup(req, res) {
        await sequelize.sync();
        await sequelize.transaction(async (t) => {
            const user = await this.usersList.findOne({ where: { id: req.query.userId } });
            const group = await this.groupList.findOne({ where: { id: req.query.groupId } });
            if (user && group) {
                await user.addGroup(group, { transaction: t });
                res.status(201).json({});
            } else {
                res.status(404).json({});
            }
        });
    }
}
