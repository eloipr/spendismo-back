const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const expensesRouter = require("./routes/expenses");
const usersRouter = require("./routes/users");

require("./db/db");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/expenses", expensesRouter);
app.use("/users", usersRouter);

module.exports = app;
