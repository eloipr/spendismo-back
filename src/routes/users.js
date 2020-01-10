const express = require("express");
const UserDBManager = require("../db/userDBManager");

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
    UserDBManager.getAll()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

module.exports = router;
