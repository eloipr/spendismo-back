const User = require("../models/User");

const UserDBManager = {
    getAll: (callback, errorCallback) => {
        try {
            User.find({})
                .populate("expenses")
                .exec((error, users) => {
                    callback(users);
                });
        } catch (error) {
            errorCallback(error);
        }
    }
};

module.exports = UserDBManager;
