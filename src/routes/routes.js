const express = require('express');
const router = express.Router();
const schema = require('../validations/user.schema');
import { validateSchema } from '../validations/validations';
import UserController from '../controllers/userController';
import GroupController from '../controllers/groupController';
import UserGroupController from '../controllers/userGroupController';

const user = require('../models/UserModel');
const group = require('../models/GroupModel');
const usersGroups = require('../models/UserGroupModel');

user.belongsToMany(group, { through: usersGroups });
group.belongsToMany(user, { through: usersGroups });

const suggestUsers = require('../services/suggestUsersService');

const userController = new UserController(user, suggestUsers);
const groupController = new GroupController(group);
const usersGroupController = new UserGroupController(usersGroups);

const runAsyncWrapper = (callback) => {
    return (req, res, next) => {
        callback(req, res, next).catch(next);
    };
};

// User routes
router.get('/users/:id', runAsyncWrapper(userController.getUser.bind(userController)));

router.post('/users', validateSchema(schema), runAsyncWrapper(userController.addUser.bind(userController)));

router.put('/users', validateSchema(schema), runAsyncWrapper(userController.updateUser.bind(userController)));

router.delete('/users/:id', runAsyncWrapper(userController.deleteUser.bind(userController)));

router.get('/auto-suggest/users', runAsyncWrapper(userController.suggestUsers.bind(userController)));

// Group routes

router.get('/groups/:id', groupController.getGroup.bind(groupController));
router.get('/groups', runAsyncWrapper(groupController.getGroups.bind(groupController)));

router.post('/groups', runAsyncWrapper(groupController.createGroup.bind(groupController)));
router.put('/groups/:id', runAsyncWrapper(groupController.updateGroup.bind(groupController)));
router.delete('/groups/:id', runAsyncWrapper(groupController.deleteGroup.bind(groupController)));

router.post('/addUserToGroup', runAsyncWrapper(usersGroupController.addUserToGroup.bind(usersGroupController)));
router.get('/groupMembers/:id', runAsyncWrapper(usersGroupController.getGroupMembers.bind(usersGroupController)));
router.get('/userGroups/:id', runAsyncWrapper(usersGroupController.getUserGroups.bind(usersGroupController)));

module.exports = router;
