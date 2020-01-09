const mongoose = require("mongoose");
const config = require("config");
const Expense = require("../../src/models/Expense");
const User = require("../../src/models/User");
const ExpenseDBManager = require("../../src/db/ExpenseDBManager");

createExpense = async (username, expense) => {
    // await User.findOne({ username: username }, async (error, user) => {
    //     await expense.save().then(async () => {
    //         user.expenses.push(expense);
    //         await user.save();
    //     });
    // });
    await User.findOneAndUpdate({ username: username }, { $push: { expenses: expense } }, (error, user) => {
        if (!error) {
            expense.save();
        }
    });
};

removeAllCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }
};

describe("ExpenseDBManager", () => {
    beforeAll(async () => {
        await mongoose.connect(`${config.get("db.url")}/${config.get("db.name")}`, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
    });

    afterAll(async () => {
        await removeAllCollections();
    });

    describe("getAll expenses of the logged user", () => {
        beforeAll(done => {
            const user = new User({ username: "eloi" });

            User.init().then(() => {
                // safe to create users now.
                User.create(user, () => done());
            });
        });

        it("should return 0 expenses without errors", done => {
            ExpenseDBManager.getAll(
                "eloi",
                expenses => {
                    expect(expenses.length).toBe(0);
                    done();
                },
                error => {
                    expect(error).toBeNull();
                    done();
                }
            );
        });

        it("should return 1 expense without errors", async done => {
            const expense = new Expense({ amount: 10, name: "test-expense" });
            await createExpense("eloi", expense);
            console.log(expense);
            ExpenseDBManager.getAll(
                "eloi",
                expenses => {
                    console.log(expenses);
                    // expect(expenses.length).toBe(1);
                    expect(JSON.stringify(expenses[0])).toEqual(JSON.stringify(expense));
                    done();
                },
                error => {
                    expect(error).toBeNull();
                    done();
                }
            );
        });
    });

    // describe("create new expense for the logged user", () => {
    //     it("", () => {});
    // });
});
