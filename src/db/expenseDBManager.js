const Expense = require("../models/Expense");
const User = require("../models/User");

const ExpenseDBManager = {
    /* Returns a Promise with all the expenses for the specified user */
    getAll: username => {
        return User.findOne({ username: username })
            .populate("expenses")
            .exec()
            .then(user => {
                if (user) {
                    return user.expenses;
                } else {
                    throw Error("The user '" + username + "'doesn't exist");
                }
            });
    },
    /* Creates a new expense for the specified user */
    create: (username, expenseData) => {
        const expense = new Expense(expenseData);
        return User.findOne({ username: username })
            .then(user => {
                if (user) {
                    user.expenses.push(expense);
                    return user.save();
                } else {
                    throw Error("The user '" + username + "'doesn't exist");
                }
            })
            .then(() => {
                return expense.save();
            });
    },
    /* Deletes the specified expense */
    delete: (username, id) => {
        return User.findOneAndUpdate({ username: username }, { $pull: { expenses: { _id: id } } }).then(() => {
            return Expense.findByIdAndDelete(id);
        });
    }
};

module.exports = ExpenseDBManager;
