const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportSetup = require("./passport-setup");
const logger = require("morgan");

const expensesRouter = require("./routes/expenses");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

require("./db/db");
require("./db/seed");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        secret: "my_secret",
        resave: false,
        saveUninitialized: false
    })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use("/expenses", expensesRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

module.exports = app;
