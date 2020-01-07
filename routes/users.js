const express = require("express");
const User = require("../models/User");

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
    try {
        User.find({}, (err, users) => {
            res.json(users);
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;
