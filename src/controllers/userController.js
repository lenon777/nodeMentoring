export default class UserController {
    constructor(usersList, suggestedList) {
        this.usersList = usersList;
        this.suggestedList = suggestedList;
    }
    async getUser(req, res) {
        const user = await this.usersList.findOne({
            where: { id: req.params.id },
        });
        user
            ? res.status(200).json(user)
            : res.status(404).send('User not found');
    }

    async addUser(req, res) {
        await this.usersList.create(req.body);
        res.status(200).send('User was added successfully');
    }

    async updateUser(req, res) {
        await this.usersList.update(req.body, { where: { id: req.body.id } });
        res.status(200).send('Updated successfully');
    }

    async deleteUser(req, res) {
        await this.usersList.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.send('Deleted successfully');
    }

    async suggestUsers(req, res) {
        const users = await this.usersList.findAll();
        res.send(this.suggestedList(users, req.query.search, req.query.limit));
    }
}
