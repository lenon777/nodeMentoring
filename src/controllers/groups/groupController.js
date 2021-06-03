const logErrorHelper = require('../../logger/loggerHelper');
export default class Group {
    constructor(groupList) {
        this.groupList = groupList;
    }
    async getGroup(req, res, next) {
        try {
            const group = await this.groupList.findOne({
                where: { id: req.params.id }
            });
            res.status(200);
            res.json(group);
        } catch (err) {
            logErrorHelper(req.method, req.params, err.message);
            return next(err);
        }
    }
    async getGroups(req, res, next) {
        try {
            const groups = await this.groupList.findAll();
            res.status(200);
            res.json(groups);
        } catch (err) {
            logErrorHelper(req.method, req.params, err.message);
            return next(err);
        }
    }
    async createGroup(req, res, next) {
        try {
            const group = await this.groupList.create(req.body);
            res.status(201);
            res.json(group);
        } catch (err) {
            logErrorHelper(req.method, req.body, err.message);
            return next(err);
        }
    }

    async updateGroup(req, res, next) {
        try {
            const group = await this.groupList.update(req.body, {
                where: { id: req.body.id }
            });
            res.status(200);
            res.json(group);
        } catch (err) {
            logErrorHelper(req.method, req.body, err.message);
            return next(err);
        }
    }

    async deleteGroup(req, res, next) {
        try {
            await this.groupList.destroy({
                where: { id: req.params.id }
            });
            res.status(200);
            res.json({});
        } catch (err) {
            logErrorHelper(req.method, req.params, err.message);
            return next(err);
        }
    }
}
