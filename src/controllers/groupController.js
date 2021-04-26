const logger = require('../logger/logger');
export default class Group {
    constructor(groupList) {
        this.groupList = groupList;
    }
    async getGroup(req, res, next) {
        try {
            const group = await this.groupList.findOne({
                where: { id: req.params.id }
            });
            res.status(200).json(group);
        } catch (err) {
            logger.error({
                method: req.method,
                arguments: req.params,
                msg: err.message
            });
            next(err);
        }
    }
    async getGroups(req, res) {
        const groups = await this.groupList.findAll();
        res.status(200).json(groups);
    }
    async createGroup(req, res) {
        const group = await this.groupList.create(req.body);
        res.status(201).json(group[0]);
    }

    async updateGroup(req, res) {
        const group = await this.groupList.update(req.body, {
            where: { id: req.body.id }
        });
        res.status(200).json(group[0]);
    }

    async deleteGroup(req, res) {
        await this.groupList.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json({});
    }
}
