const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
