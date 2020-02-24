const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        // expense or income
        type: String,
        required: true,
        default: "expense"
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: { type: mongoose.Schema.ObjectId, ref: "Category", required: true }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
