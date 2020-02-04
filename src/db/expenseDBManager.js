const Expense = require("../models/Expense");
const User = require("../models/User");

const ExpenseDBManager = {
    /* Returns a Promise with all the expenses for the specified user */
    getAll: userId => {
        return User.findById(userId)
            .populate({ path: "expenses", options: { sort: { date: -1 } } })
            .exec()
            .then(user => {
                if (user) {
                    return user.expenses;
                } else {
                    throw new Error({ error: "The specified user doesn't exist" });
                }
            });
    },
    getByMonth: (userId, month) => {
        return User.findById(userId)
            .populate({
                path: "expenses",
                match: {
                    $eq: [{ $month: "$date" }, parseInt(month)]
                },
                // match: {
                //     date: { $gte: new Date(`2020-${month}-01`), $lte: new Date(`2020-${month}-31`) }
                // },
                options: { sort: { date: -1 } }
            })
            .exec()
            .then(user => {
                if (user) {
                    console.log(user);
                    return user.expenses;
                } else {
                    throw new Error({ error: "The specified user doesn't exist" });
                }
            });
    },
    /* Creates a new expense for the specified user */
    create: (userId, expenseData) => {
        const expense = new Expense(expenseData);
        return User.findById(userId)
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
    /* Updates the specified expense */
    update: (expenseId, expenseData) => {
        return Expense.findByIdAndUpdate(expenseId, expenseData);
    },
    /* Deletes the specified expense */
    delete: (userId, expenseId) => {
        return User.findByIdAndUpdate(userId, { $pull: { expenses: { _id: expenseId } } }).then(() => {
            return Expense.findByIdAndDelete(expenseId);
        });
    }
};

module.exports = ExpenseDBManager;
