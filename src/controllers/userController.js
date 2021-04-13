export default class UserController {
    constructor(usersList, suggestedList) {
        this.usersList = usersList;
        this.suggestedList = suggestedList;
    }
    async getUser(req, res) {
        const user = await this.usersList.findOne({
            where: { id: req.params.id }
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({});
        }
    }

    async addUser(req, res) {
        await this.usersList.create(req.body);
        res.status(201).json({});
    }

    async updateUser(req, res) {
        await this.usersList.update(req.body, { where: { id: req.body.id } });
        res.status(200).json({});
    }

    async deleteUser(req, res) {
        await this.usersList.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({});
    }

    async suggestUsers(req, res) {
        const users = await this.usersList.findAll();
        res.status(200).send(this.suggestedList(users, req.query.search, req.query.limit));
    }
}
