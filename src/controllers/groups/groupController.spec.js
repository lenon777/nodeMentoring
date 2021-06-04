import GroupController from './groupController';

const groups = [
    {
        id: 1,
        name: 'group1',
        permission: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    },
    {
        id: 2,
        name: 'group2',
        permission: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    }
];

const groupList = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
};

const groupController = new GroupController(groupList);
const next = jest.fn();

describe('Group routes', () => {
    let req;
    let res;
    beforeEach(() => {
        req = {
            method: 'GET',
            params: {
                id: 1
            },
            body: groups[0]
        },
        res = {
            send: jest.fn(),
            status: jest.fn(),
            json: jest.fn()
        };
    });

    it('should get group by Id', async () => {
        groupList.findOne.mockResolvedValue(groups[0]);
        await groupController.getGroup(req, res, next);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);
        expect(res.json).toHaveBeenNthCalledWith(1, groups[0]);
        expect(next).not.toHaveBeenCalled();
    });

    it('should get all groups', async () => {
        groupList.findAll.mockResolvedValue(groups);
        await groupController.getGroups(req, res, next);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);
        expect(res.json).toHaveBeenNthCalledWith(1, groups);
        expect(next).not.toHaveBeenCalled();
    });

    it('should create group', async () => {
        groupList.create.mockResolvedValue(groups[0]);
        await groupController.createGroup(req, res, next);
        expect(res.status).toHaveBeenNthCalledWith(1, 201);
        expect(res.json).toHaveBeenNthCalledWith(1, groups[0]);
        expect(next).not.toHaveBeenCalled();
    });

    it('should update group', async () => {
        groupList.update.mockResolvedValue(groups[0]);
        await groupController.updateGroup(req, res, next);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);
        expect(res.json).toHaveBeenNthCalledWith(1, groups[0]);
        expect(next).not.toHaveBeenCalled();
    });

    it('should delete group', async () => {
        groupList.destroy.mockResolvedValue({});
        await groupController.deleteGroup(req, res, next);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);
        expect(res.json).toHaveBeenNthCalledWith(1, {});
        expect(next).not.toHaveBeenCalled();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
});
