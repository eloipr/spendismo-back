const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isIncome: {
        type: Boolean,
        required: true,
        default: false
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
