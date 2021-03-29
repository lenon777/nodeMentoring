export default class UserController {
    constructor(usersList, suggestedList) {
        this.usersList = usersList;
        this.suggestedList = suggestedList;
    }
    getUser(req, res) {
        this.usersList
            .findOne({ where: { id: req.params.id } })
            .then((user) => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).send('User not found');
                }
            })
            .catch((err) => console.log(err));
    }

    addUser(req, res) {
        console.log(req.body);
        this.usersList
            .create(req.body)
            .then(() => {
                res.status(200).send('User was added successfully');
            })
            .catch((err) => console.log(err));
    }

    updateUser(req, res) {
        this.usersList
            .update(req.body, { where: { id: req.body.id } })
            .then((user) => {
                if (user[0]) {
                    res.status(200).send('Updated successfully');
                } else {
                    res.status(404).send('User not found');
                }
            })
            .catch((err) => console.log(err));
    }

    deleteUser(req, res) {
        this.usersList
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => res.send('Deleted successfully'));
    }

    suggestUsers(req, res) {
        this.usersList.findAll().then((users) => {
            res.send(
                this.suggestedList(users, req.query.search, req.query.limit)
            );
        });
    }
}
