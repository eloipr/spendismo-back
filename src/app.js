const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("./passport-setup");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");

const expensesRouter = require("./routes/expenses");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

require("./db/db");
require("./db/seed");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cookieSession({
        name: "session",
        keys: ["cookie_key"],
        maxAge: 24 * 60 * 60 * 100
    })
);

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());
app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
);

app.use("/expenses", expensesRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

module.exports = app;
