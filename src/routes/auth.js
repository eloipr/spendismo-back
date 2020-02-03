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

router.post("/logout", (req, res) => {
    req.logout();
    res.json({ message: "Logout successfully" });
});

router.get("/is-authenticated", (req, res) => {
    res.json({ isAuthenticated: req.isAuthenticated() });
});

router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "http://localhost:3000/",
        failureRedirect: "http://localhost:3000/sign-in"
    })
);

module.exports = router;
