const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const expensesRouter = require("./routes/expenses");
const usersRouter = require("./routes/users");

require("./db/db");
require("./db/seed");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/expenses", expensesRouter);
app.use("/users", usersRouter);

module.exports = app;
