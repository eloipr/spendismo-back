const mongoose = require("mongoose");
const config = require("config");
const Expense = require("../../src/models/Expense");
const User = require("../../src/models/User");
const ExpenseDBManager = require("../../src/db/ExpenseDBManager");

removeAllCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }
};

describe("ExpenseDBManager", () => {
    const username1 = "Eloi";
    const username2 = "Miquel";
    const expense = new Expense({ name: "test-expense", amount: 20 });

    beforeAll(async () => {
        await mongoose.connect(`${config.get("db.url")}/${config.get("db.name")}`, {
            useNewUrlParser: true,
            useCreateIndex: true
        });

        const user1 = new User({ username: username1 });
        const user2 = new User({ username: username2 });

        return User.init()
            .then(() => {
                // safe to create users now.
                return User.create(user1);
            })
            .then(createdUser1 => {
                createdUser1.expenses.push(expense);
                return createdUser1.save();
            })
            .then(() => {
                return expense.save();
            })
            .then(() => {
                return User.create(user2);
            });
    });

    afterAll(async () => {
        await removeAllCollections();
    });

    describe("#getAll expenses of the specified user", () => {
        it("should return 0 expenses without errors", () => {
            return ExpenseDBManager.getAll(username2).then(expenses => {
                expect(expenses.length).toBe(0);
            });
        });

        it("should thorw an error when the user doesn't exist", () => {
            return ExpenseDBManager.getAll("nonExistentUser").catch(error => {
                expect(error).toBeInstanceOf(Error);
            });
        });

        it("should return 1 expense without errors", () => {
            return ExpenseDBManager.getAll(username1).then(expenses => {
                expect(JSON.stringify(expenses[0])).toEqual(JSON.stringify(expense));
            });
        });
    });

    describe("#create new expense for the specified user", () => {
        it("should return the created expense", () => {
            return ExpenseDBManager.create(username1, { amount: 20, name: "test-expense" }).then(newExpense => {
                expect(newExpense.amount).toBe(20);
                expect(newExpense.name).toBe("test-expense");
            });
        });

        it("should throw an error when the user doesn't exist", () => {
            return ExpenseDBManager.create("nonExistentUser", { amount: 20, name: "test-expense" }).catch(error => {
                expect(error).toBeInstanceOf(Error);
            });
        });
    });

    describe("#delete an expense for the specified user", () => {
        it("should return the deleted expense", () => {
            return ExpenseDBManager.delete(username1, expense._id).then(deletedExpense => {
                expect(JSON.stringify(deletedExpense)).toEqual(JSON.stringify(expense));
            });
        });
    });
});
