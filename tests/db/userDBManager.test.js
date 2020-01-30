const bcrypt = require("bcryptjs");
const UserDBManager = require("../../src/db/userDBManager");
const TestHelper = require("../testHelper");
const User = require("../../src/models/User");

describe("UserDBManager", () => {
    const userData1 = { email: "eloi@gmail.com", username: "epardo", password: "1234" };
    const userData2 = { email: "miquel@gmail.com", username: "miki", password: "4567" };

    beforeAll(async () => {
        TestHelper.initDBConnection("userDBManagerTest");

        const user1 = new User(userData1);
        const user2 = new User(userData2);

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

    describe("#create a new user", () => {
        it("should return the created user", () => {
            const userData = { email: "test@gmail.com", username: "testing", password: "pwtest" };
            return UserDBManager.create(userData)
                .then(user => {
                    expect(user.email).toBe(userData.email);
                    expect(user.username).toBe(userData.username);
                    return bcrypt.compare(userData.password, user.password);
                })
                .then(passwordMatch => {
                    expect(passwordMatch).toBeTruthy();
                });
        });

        it("should throw an error if the user already exists", () => {
            return UserDBManager.create(userData1).catch(error => {
                expect(error).toBeInstanceOf(Error);
            });
        });
    });
});
