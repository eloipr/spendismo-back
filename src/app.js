const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
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

app.use("/expenses", expensesRouter);
app.use("/users", usersRouter);
app.use("/", authRouter);

module.exports = app;
