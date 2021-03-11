const express = require('express');
const app = express();
const router = express.Router();
const schema = require('./validations/user.schema');
import { validateSchema } from './validations/validations';
import { usersList } from './services/userDataService';

const findUser = (userId) => {
    return usersList.find((user) => user.id === userId);
};

app.listen(3000);
app.use(express.json());

router.get('/users/:id', (req, res) => {
    const currentUser = usersList.find((user) => user.id === req.params.id);
    if (currentUser) {
        res.json(currentUser);
    } else {
        res.send('User not found');
    }
});

router.post('/addUser', validateSchema(schema), (req, res) => {
    const user = findUser(req.body.id);
    if (user) {
        res.send('This User already exist');
    } else {
        usersList.push(req.body);
        res.send('User was added successfully');
    }
});

router.put('/updateUser', validateSchema(schema), (req, res) => {
    const user = findUser(req.body.id);
    if (user) {
        usersList[usersList.indexOf(user)] = req.body;
        res.send('Updated successfully');
    } else {
        res.send('User not found');
    }
});

router.delete('/removeUser/:id', (req, res) => {
    const user = findUser(req.params.id);
    if (user) {
        usersList[usersList.indexOf(user)].isDeleted = true;
        res.send('Deleted successfully');
    } else {
        res.send('User not found');
    }
});

app.use('/', router);
app.use((req, res) => {
    res.send('<h1> Page not found </h1>');
});
