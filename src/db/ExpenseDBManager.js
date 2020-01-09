const Expense = require("../models/Expense");
const User = require("../models/User");

const ExpenseDBManager = {
    getAll: (username, callback, errorCallback) => {
        try {
            User.findOne({ username: username })
                .populate("expenses")
                .exec((error, user) => {
                    if (error) throw error;
                    callback(user.expenses);
                });
        } catch (error) {
            errorCallback(error);
        }
    },
    create: (username, expenseData, callback, errorCallback) => {
        try {
            const expense = new Expense(expenseData);
            User.findOne({ username: username }, (error, user) => {
                expense.save().then(error => {
                    user.expenses.push(expense);
                    user.save();
                    callback(expense);
                });
            });
        } catch (error) {
            errorCallback(error);
        }
    },
    delete: (id, callback, errorCallback) => {
        try {
            Expense.findById(id, (error, expense) => {
                if (!expense || expense === undefined) {
                    errorCallback(error);
                }
                User.update({}, { $pull: { expenses: { $in: expense._id } } }, error => {
                    expense.remove();
                    callback(expense);
                });
            });
        } catch (error) {
            errorCallback(error);
        }
    }
};

module.exports = ExpenseDBManager;
