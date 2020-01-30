const TestHelper = require("../testHelper");
const Expense = require("../../src/models/Expense");
const User = require("../../src/models/User");
const ExpenseDBManager = require("../../src/db/expenseDBManager");

describe("ExpenseDBManager", () => {
    const userData1 = { email: "eloi@gmail.com", username: "epardo", password: "1234" };
    const userData2 = { email: "miquel@gmail.com", username: "miki", password: "4567" };
    const expense = new Expense({ name: "test-expense", amount: 20 });

    beforeAll(async () => {
        TestHelper.initDBConnection("expenseDBManagerTest");

        const user1 = new User(userData1);
        const user2 = new User(userData2);

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
        return TestHelper.finishDBConnection();
    });

    describe("#getAll expenses of the specified user", () => {
        it("should return 0 expenses without errors", () => {
            return ExpenseDBManager.getAll(userData2.email).then(expenses => {
                expect(expenses.length).toBe(0);
            });
        });

        it("should thorw an error when the user doesn't exist", () => {
            return ExpenseDBManager.getAll("nonExistentUser").catch(error => {
                expect(error).toBeInstanceOf(Error);
            });
        });

        it("should return 1 expense without errors", () => {
            return ExpenseDBManager.getAll(userData1.email).then(expenses => {
                expect(JSON.stringify(expenses[0])).toEqual(JSON.stringify(expense));
            });
        });
    });

    describe("#create new expense for the specified user", () => {
        it("should return the created expense", () => {
            return ExpenseDBManager.create(userData1.email, { amount: 20, name: "test-expense" }).then(newExpense => {
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
            return ExpenseDBManager.delete(userData1.email, expense._id).then(deletedExpense => {
                expect(JSON.stringify(deletedExpense)).toEqual(JSON.stringify(expense));
            });
        });
        it("should throw an error when the user doesn't exist", () => {
            return ExpenseDBManager.delete("nonExistentUser", expense._id).catch(error => {
                expect(error).toBeInstanceOf(Error);
            });
        });
    });
});
