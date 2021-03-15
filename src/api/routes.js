const express = require('express');
const router = express.Router();
const schema = require('../validations/user.schema');
import { validateSchema } from '../validations/validations';
import { usersList } from '../services/userDataService';

const findUser = (userId) => {
    return usersList.find((user) => user.id === userId);
};

router.get('/users/:id', (req, res) => {
    const currentUser = findUser(req.params.id);
    if (currentUser) {
        res.status(200).json(currentUser);
    } else {
        res.status(404).send('User not found');
    }
});

router.post('/addUser', validateSchema(schema), (req, res) => {
    const user = findUser(req.body.id);
    if (user) {
        res.status(404).send('This User already exist');
    } else {
        usersList.push(req.body);
        res.status(200).send('User was added successfully');
    }
});

router.put('/updateUser', validateSchema(schema), (req, res) => {
    const user = findUser(req.body.id);
    if (user) {
        usersList[usersList.indexOf(user)] = req.body;
        res.status(200).send('Updated successfully');
    } else {
        res.status(404).send('User not found');
    }
});

router.delete('/removeUser/:id', (req, res) => {
    const user = findUser(req.params.id);
    if (user) {
        usersList[usersList.indexOf(user)].isDeleted = true;
        res.status(200).send('Deleted successfully');
    } else {
        res.status(404).send('User not found');
    }
});

router.get('/auto-suggest/user', (req, res) => {
    const filteredUsers = usersList
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
});

module.exports = router;
