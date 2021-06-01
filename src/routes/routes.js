const express = require('express');
const router = express.Router();
const schema = require('../validations/user.schema');
const authMiddleware = require('../middleware/auth');
import { validateSchema } from '../validations/validations';
import UserController from '../controllers/users/userController';
import GroupController from '../controllers/groupController';
import UserGroupController from '../controllers/userGroupController';
import AuthController from '../controllers/AuthController';
import AuthService from '../services/authService';

const user = require('../models/UserModel');
const group = require('../models/GroupModel');
const usersGroups = require('../models/UserGroupModel');
const token = require('../models/RefreshTokens');

user.belongsToMany(group, { through: usersGroups });
group.belongsToMany(user, { through: usersGroups });
user.hasOne(token);

const suggestUsers = require('../services/suggestUsersService');
const authService = new AuthService(token);

const userController = new UserController(user, suggestUsers, authService);
const groupController = new GroupController(group);
const usersGroupController = new UserGroupController(usersGroups);
const authController = new AuthController(token, user, authService);

// User routes
router.get('/users/:id', authMiddleware, userController.getUser.bind(userController));
router.post('/users', validateSchema(schema), userController.addUser.bind(userController));
router.put('/users', authMiddleware, validateSchema(schema), userController.updateUser.bind(userController));
router.delete('/users/:id', authMiddleware, userController.deleteUser.bind(userController));
router.get('/auto-suggest/users', authMiddleware, userController.suggestUsers.bind(userController));

// Group routes

router.get('/groups/:id', authMiddleware, groupController.getGroup.bind(groupController));
router.get('/groups', authMiddleware, groupController.getGroups.bind(groupController));
router.post('/groups', authMiddleware, groupController.createGroup.bind(groupController));
router.put('/groups/:id', authMiddleware, groupController.updateGroup.bind(groupController));
router.delete('/groups/:id', authMiddleware, groupController.deleteGroup.bind(groupController));
router.post('/addUserToGroup', authMiddleware, usersGroupController.addUserToGroup.bind(usersGroupController));
router.get('/groupMembers/:id', authMiddleware, usersGroupController.getGroupMembers.bind(usersGroupController));
router.get('/userGroups/:id', authMiddleware, usersGroupController.getUserGroups.bind(usersGroupController));

// Auth routes
router.post('/login', authController.login.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));

module.exports = router;
