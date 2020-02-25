const Expense = require("../../Expense");
const User = require("./../models/User");

const ExpenseDBManager = {
    /* Returns a Promise with all the expenses for the specified user */
    getAll: userId => {
        return User.findById(userId)
            .populate({ path: "expenses", options: { sort: { date: -1 } } })
            .exec()
            .then(user => {
                if (!user) {
                    throw new Error({ error: "The specified user doesn't exist" });
                }
                return user.expenses;
            });
    },
    getByMonth: (userId, month) => {
        return User.aggregate([
            { $match: { _id: userId } },
            { $lookup: { from: "expenses", localField: "expenses", foreignField: "_id", as: "expenses" } },
            {
                $project: {
                    expenses: {
                        $filter: {
                            input: "$expenses",
                            as: "expense",
                            cond: {
                                $eq: [{ $month: "$$expense.date" }, parseInt(month)]
                            }
                        }
                    }
                }
            }
        ])
            .exec()
            .then(result => {
                if (result.length > 0) {
                    return result[0].expenses;
                } else return [];
            });
    },
    /* Creates a new expense for the specified user */
    create: (userId, expenseData) => {
        const expense = new Expense(expenseData);
        return User.findById(userId)
            .then(user => {
                if (!user) {
                    throw new Error({ error: "The specified user doesn't exist" });
                }
                user.expenses.push(expense);
                return user.save();
            })
            .then(() => {
                return expense.save();
            })
            .catch(error => {
                throw error;
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
