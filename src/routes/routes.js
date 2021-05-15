const express = require('express');
const router = express.Router();
const schema = require('../validations/user.schema');
import { validateSchema } from '../validations/validations';
import UserController from '../controllers/userController';
import GroupController from '../controllers/groupController';
import UserGroupController from '../controllers/userGroupController';

import checkToken from '../controllers/AuthController';

const user = require('../models/UserModel');
const group = require('../models/GroupModel');
const usersGroups = require('../models/UserGroupModel');
const token = require('../models/TokenModel');

user.belongsToMany(group, { through: usersGroups });
group.belongsToMany(user, { through: usersGroups });
token.belongsTo(user);

//const tokens = token.findAll();
//console.log(tokens);

const suggestUsers = require('../services/suggestUsersService');

const userController = new UserController(user, suggestUsers);
const groupController = new GroupController(group);
const usersGroupController = new UserGroupController(usersGroups);

// User routes
router.get('/users/:id', userController.getUser.bind(userController));

router.post('/users', checkToken, validateSchema(schema), userController.addUser.bind(userController));

router.put('/users', validateSchema(schema), userController.updateUser.bind(userController));

router.delete('/users/:id', userController.deleteUser.bind(userController));

router.get('/auto-suggest/users', userController.suggestUsers.bind(userController));

router.post('/login', userController.login.bind(userController));

// Group routes

router.get('/groups/:id', groupController.getGroup.bind(groupController));
router.get('/groups', checkToken, groupController.getGroups.bind(groupController));

router.post('/groups', groupController.createGroup.bind(groupController));
router.put('/groups/:id', groupController.updateGroup.bind(groupController));
router.delete('/groups/:id', groupController.deleteGroup.bind(groupController));

router.post('/addUserToGroup', usersGroupController.addUserToGroup.bind(usersGroupController));
router.get('/groupMembers/:id', usersGroupController.getGroupMembers.bind(usersGroupController));
router.get('/userGroups/:id', usersGroupController.getUserGroups.bind(usersGroupController));

module.exports = router;
