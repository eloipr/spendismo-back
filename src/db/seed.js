const User = require("../models/User");

const user = new User({ username: "eloi" });

User.init().then(() => {
    // safe to create users now.
    User.create(user, error => {
        if (error) {
            console.log("Default user already created");
        }
    });
});
