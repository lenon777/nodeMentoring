const UserController = require('./userController');
//const _ = new UserController();
 async function sum(a, b) {
    return Promise.resolve(a + b);
};

describe('Should be', () => {
    test('qweqweqwe', () => {
        //await _.getUser(3);
        //await expect(_.getUser(3)).toBe(3);
		const data  = await sum(1+2);
          expect(data).toBe(3)
    });

    //test('zxzxzxzx',()=> {
    //})
});
