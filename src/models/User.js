const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    expenses: [{ type: mongoose.Schema.ObjectId, ref: "Expense" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
