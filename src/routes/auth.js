const express = require("express");
const passport = require("passport");
const UserDBManager = require("../db/userDBManager");

const router = express.Router();

router.post("/sign-in", (req, res) => {
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

router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "http://127.0.0.1:51108/dashboard",
        failureRedirect: "http://127.0.0.1:51108/sign-in"
    })
);

module.exports = router;
