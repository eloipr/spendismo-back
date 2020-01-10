const User = require("../models/User");

const UserDBManager = {
    /* Returns a Promise with all the users */
    getAll: () => {
        return User.find({})
            .populate("expenses")
            .exec();
    }
};

module.exports = UserDBManager;