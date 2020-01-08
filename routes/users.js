const express = require("express");
const User = require("../models/User");
const UserDBManager = require("../db/UserDBManager");

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
    UserDBManager.getAll(
        users => {
            res.json(users);
        },
        error => {
            res.status(400).json(error);
        }
    );
});

module.exports = router;
