const Sequelize = require('sequelize');
const logErrorHelper = require('../logger/loggerHelper');
export default class UserController {
    constructor(usersList, suggestedList, authService) {
        this.usersList = usersList;
        this.suggestedList = suggestedList;
        this.authService = authService;
    }
    async getUser(req, res, next) {
        try {
            const user = await this.usersList.findOne({
                where: { id: req.params.id },
                raw: true
            });

            if (!user) {
                return res.status(404).json({ message: 'User does not exist' });
            }

            delete user.password;
            res.status(200).json(user);
        } catch (err) {
            logErrorHelper(req.method, req.params, err.message);
            return next(err);
        }
    }

    async addUser(req, res, next) {
        try {
            let hash = await this.authService.hash(req.body.password, 10);
            await this.usersList.create({
                login: req.body.login,
                password: hash,
                age: req.body.age,
                isDeleted: req.body.isDeleted
            });
            res.status(201).json({});
        } catch (err) {
            logErrorHelper(req.method, req.body, err.message);
            if (err instanceof Sequelize.UniqueConstraintError) {
                err.message = 'Email address already in use!';
                return next(err);
            }
            return next(err);
        }
    }

    async updateUser(req, res, next) {
        try {
            await this.usersList.update(req.body, { where: { id: req.body.id } });
            res.status(200).json({});
        } catch (err) {
            logErrorHelper(req.method, req.body, err.message);
            return next(err);
        }
    }

    async deleteUser(req, res, next) {
        try {
            await this.usersList.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({});
        } catch (err) {
            logErrorHelper(req.method, req.params, err.message);
            return next(err);
        }
    }

    async suggestUsers(req, res, next) {
        try {
            const users = await this.usersList.findAll();
            res.status(200).send(this.suggestedList(users, req.query.search, req.query.limit));
        } catch (err) {
            logErrorHelper(req.method, req.params, err.message);
            return next(err);
        }
    }
}
