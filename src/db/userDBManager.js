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
    }
};

module.exports = UserDBManager;
