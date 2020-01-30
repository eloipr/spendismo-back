const express = require("express");
const UserDBManager = require("../db/userDBManager");

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
    if (req.session.email) {
        console.log("user logged");
        UserDBManager.getAll()
            .then(users => {
                res.json(users);
            })
            .catch(error => {
                res.status(400).json(error);
            });
    } else {
        console.log("unauthorized");
        res.status(401).json("unauthorized");
    }
});

module.exports = router;
