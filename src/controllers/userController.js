export default class UserController {
    constructor(usersList) {
        this.usersList = usersList;
    }
    findUser(userId) {
        return this.usersList.find((user) => user.id === userId);
    }
    getUser(req, res) {
        const currentUser = this.findUser(req.params.id);
        if (currentUser) {
            res.status(200).json(currentUser);
        } else {
            res.status(404).send('User not found');
        }
    }

    addUser(req, res) {
        const user = this.findUser(req.body.id);
        if (user) {
            res.status(404).send('This User already exist');
        } else {
            this.usersList.push(req.body);
            res.status(200).send('User was added successfully');
        }
    }

    updateUser(req, res) {
        const user = this.findUser(req.body.id);
        if (user) {
            this.usersList[this.usersList.indexOf(user)] = req.body;
            res.status(200).send('Updated successfully');
        } else {
            res.status(404).send('User not found');
        }
    }

    deleteUser(req, res) {
        const user = this.findUser(req.params.id);
        if (user) {
            this.usersList[this.usersList.indexOf(user)].isDeleted = true;
            res.status(200).send('Deleted successfully');
        } else {
            res.status(404).send('User not found');
        }
    }

    suggestUsers(req, res) {
        const filteredUsers = this.usersList
            .filter((user) => {
                return user.login.includes(req.query.search);
            })
            .sort((a, b) => {
                return a.login.localeCompare(b.login);
            })
            .slice(0, req.query.limit);
        if (filteredUsers.length !== 0) {
            res.status(200).send(filteredUsers);
        } else {
            res.status(404).send('Users not found');
        }
    }
}
