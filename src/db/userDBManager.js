const bcrypt = require("bcryptjs");
const User = require("../models/User");

const UserDBManager = {
    /* Returns a Promise with all the users */
    getAll: () => {
        return User.find({})
            .populate("expenses")
            .exec();
    },
    create: userData => {
        const user = new User(userData);
        return User.create(user);
    },
    login: (email, password) => {
        // Search for a user by email and password.
        return User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    throw new Error({ error: "Invalid login credentials" });
                }
                return bcrypt.compare(password, user.password);
            })
            .then(passwordMatch => {
                if (!passwordMatch) {
                    throw new Error({ error: "Invalid login credentials" });
                }
                return { message: `The user ${email} has sign in successfully` };
            });
    }
};

module.exports = UserDBManager;
