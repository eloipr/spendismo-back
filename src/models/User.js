const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const DBErrorHandler = require("../errors/dbErrorHandler");
require("./Category");
require("./Expense");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: "Invalid Email address" });
            }
        }
    },
    facebookId: {
        type: String,
        unique: true
    },
    expenses: [{ type: mongoose.Schema.ObjectId, ref: "Expense" }],
    categories: [{ type: mongoose.Schema.ObjectId, ref: "Category" }]
});

userSchema.pre("save", async function(next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.post("save", DBErrorHandler.handleDuplicateKey);
userSchema.post("update", DBErrorHandler.handleDuplicateKey);
userSchema.post("findOneAndUpdate", DBErrorHandler.handleDuplicateKey);
userSchema.post("insertMany", DBErrorHandler.handleDuplicateKey);

const User = mongoose.model("User", userSchema);

module.exports = User;
