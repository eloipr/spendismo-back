const UserDBManager = require("../../src/db/userDBManager");
const TestHelper = require("../testHelper");
const User = require("../../src/models/User");

describe("UserDBManager", () => {
    const username1 = "Eloi";
    const username2 = "Miquel";

    beforeAll(async () => {
        TestHelper.initDBConnection("userDBManagerTest");

        const user1 = new User({ username: username1 });
        const user2 = new User({ username: username2 });

        return User.init()
            .then(() => {
                // safe to create users now.
                return User.create(user1);
            })
            .then(() => {
                return User.create(user2);
            });
    });

    afterAll(async () => {
        return TestHelper.finishDBConnection();
    });

    describe("#getAll the users", () => {
        it("should return 2 users without errors", () => {
            return UserDBManager.getAll().then(users => {
                expect(users.length).toBe(2);
            });
        });
    });
});
