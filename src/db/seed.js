const User = require("../models/User");
const UserDBManager = require("./userDBManager");

User.init().then(() => {
    // safe to create users now.
});
