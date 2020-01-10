const Expense = require("../models/Expense");
const User = require("../models/User");

const ExpenseDBManager = {
    /* Returns a Promise with all the expenses for the specified user */
    getAll: email => {
        return User.findOne({ email: email })
            .populate("expenses")
            .exec()
            .then(user => {
                if (user) {
                    return user.expenses;
                } else {
                    throw new Error({ error: "The user '" + email + "'doesn't exist" });
                }
            });
    },
    /* Creates a new expense for the specified user */
    create: (email, expenseData) => {
        const expense = new Expense(expenseData);
        return User.findOne({ email: email })
            .then(user => {
                if (user) {
                    user.expenses.push(expense);
                    return user.save();
                } else {
                    throw new Error({ error: "The user '" + email + "'doesn't exist" });
                }
            })
            .then(() => {
                return expense.save();
            });
    },
    /* Deletes the specified expense */
    delete: (email, id) => {
        return User.findOneAndUpdate({ email: email }, { $pull: { expenses: { _id: id } } }).then(() => {
            return Expense.findByIdAndDelete(id);
        });
    }
};

module.exports = ExpenseDBManager;
