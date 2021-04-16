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
    async getGroupMembers(req, res) {
        const members = await this.userGroupList.findAll({
            where: {
                groupId: req.params.id
            }
        });
        if (members.length) {
            res.status(200).json(members);
        } else {
            res.sendStatus(404);
        }
    }

    async getUserGroups(req, res) {
        const groups = await this.userGroupList.findAll({
            where: {
                userId: req.params.id
            }
        });
        if (groups.length) {
            res.status(200).json(groups);
        } else {
            res.sendStatus(404);
        }
    }
}
