const express = require('express');
const router = express.Router();
const schema = require('../validations/user.schema');
import { validateSchema } from '../validations/validations';
import UserController from '../controllers/userController';

const users = require('../models/UserModel');
const suggestUsers = require('../services/suggestUsersService');

const userController = new UserController(users, suggestUsers);

router.get('/users/:id', userController.getUser.bind(userController));

router.post(
    '/users',
    validateSchema(schema),
    userController.addUser.bind(userController)
);

router.put(
    '/users',
    validateSchema(schema),
    userController.updateUser.bind(userController)
);

router.delete(
    '/users/:id',
    userController.deleteUser.bind(userController)
);

router.get(
    '/auto-suggest/users',
    userController.suggestUsers.bind(userController)
);

module.exports = router;
