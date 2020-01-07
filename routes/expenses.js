const express = require("express");
const Expense = require("../models/Expense");
const User = require("../models/User");

const router = express.Router();

/* GET expenses listing. */
router.get("/", (req, res) => {
    try {
        Expense.find({}, (err, expenses) => {
            res.json(expenses);
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

/* POST new expense. */
router.post("/", async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await User.findOne({ username: "eloi" }, (error, user) => {
            user.expenses.push(expense);
            user.save();
            res.status(201).json(expense);
        });
        // await expense.save();
    } catch (error) {
        res.status(400).json(error);
    }
});

/* DELETE remove expense. */
router.delete("/", async (req, res) => {
    try {
        const id = req.body.id;
        Expense.findById(id, (err, expense) => {
            expense.remove();
            res.status(202).json(expense);
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;
