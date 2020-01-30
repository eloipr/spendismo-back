const express = require("express");
const UserDBManager = require("../db/userDBManager");

const router = express.Router();

router.post("/sign_in", (req, res) => {
    const { email, password } = req.body;
    UserDBManager.login(email, password)
        .then(message => {
            req.session.email = email;
            res.json(message);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

module.exports = router;
