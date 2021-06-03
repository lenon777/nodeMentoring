import UserController from './userController';

const users = [
    {
        age: 25,
        id: '1',
        isDeleted: false,
        login: 'login',
        password: 'password'
    },
    {
        age: 30,
        id: '2',
        isDeleted: false,
        login: 'login',
        password: 'password2'
    }
];

const usersList = {
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn()
};
const authService = {
    hash: jest.fn()
};

const suggestUsersService = jest.fn();
const userController = new UserController(usersList, suggestUsersService, authService);

const next = jest.fn();

describe('User Route', () => {
    let req;
    let res;
    beforeEach(() => {
        (req = {
            method: 'GET',
            params: {
                id: 1
            },
            body: users[0],
            query: {
                search: 'l',
                limit: '2'
            }
        }),
            (res = {
                send: jest.fn(),
                status: jest.fn(),
                json: jest.fn()
            });
    });

    it('should get user by Id', async () => {
        usersList.findOne.mockResolvedValue(users[0]);
        await userController.getUser(req, res, next);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);
        expect(res.json).toHaveBeenNthCalledWith(1, users[0]);
        expect(next).not.toHaveBeenCalled();
    });

    it('should create user', async () => {
        usersList.create.mockResolvedValue({});
        await userController.addUser(req, res, next);
        expect(res.status).toHaveBeenNthCalledWith(1, 201);
        expect(res.json).toHaveBeenNthCalledWith(1, {});
        expect(next).not.toHaveBeenCalled();
    });

    it('should update user', async () => {
        usersList.update.mockResolvedValue({});
        await userController.updateUser(req, res, next);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);
        expect(res.json).toHaveBeenNthCalledWith(1, {});
        expect(next).not.toHaveBeenCalled();
    });

    it('should delete user', async () => {
        usersList.destroy.mockResolvedValue({});
        await userController.deleteUser(req, res, next);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);
        expect(res.json).toHaveBeenNthCalledWith(1, {});
        expect(next).not.toHaveBeenCalled();
    });

    it('should return  users', async () => {
        suggestUsersService.mockReturnValue(users);
        await userController.suggestUsers(req, res, next);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);
        expect(res.json).toHaveBeenNthCalledWith(1, users);
        expect(next).not.toHaveBeenCalled();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
});
