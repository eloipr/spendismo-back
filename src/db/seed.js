const User = require("../models/User");
const UserDBManager = require("./userDBManager");

const userData = { email: "eloi@gmail.com", username: "epardo", password: "1234" };

User.init().then(() => {
    // safe to create users now.
    UserDBManager.create(userData).catch(error => {
        console.log("Default user already created");
    });
});
