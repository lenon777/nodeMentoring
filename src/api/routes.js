const express = require('express');
const router = express.Router();
const schema = require('../validations/user.schema');
import { validateSchema } from '../validations/validations';
import { usersList } from '../services/userDataService';
import UserController from '../controllers/userController';

const userController = new UserController(usersList);

router.get('/users/:id', userController.getUser.bind(userController));

router.post(
    '/addUser',
    validateSchema(schema),
    userController.addUser.bind(userController)
);

router.put(
    '/updateUser',
    validateSchema(schema),
    userController.updateUser.bind(userController)
);

router.delete(
    '/removeUser/:id',
    userController.deleteUser.bind(userController)
);

router.get(
    '/auto-suggest/user',
    userController.suggestUsers.bind(userController)
);

module.exports = router;
