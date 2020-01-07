const mongoose = require("mongoose");
const Expense = require("./Expense");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    expenses: [Expense.schema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
