const express = require("express");
const Expense = require("../models/Expense");
const User = require("../models/User");

const router = express.Router();

/* GET List expenses of the logged user. */
router.get("/", (req, res) => {
    try {
        User.findOne({ username: "eloi" })
            .populate("expenses")
            .exec((error, user) => {
                res.json(user.expenses);
            });
    } catch (error) {
        res.status(400).json(error);
    }
});

/* POST New expense for the logged user. */
router.post("/", async (req, res) => {
    try {
        const expense = new Expense(req.body);
        User.findOne({ username: "eloi" }, (error, user) => {
            expense.save().then(error => {
                user.expenses.push(expense);
                user.save();
                res.status(201).json(expense);
            });
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

/* DELETE Remove the specified expense from the logged user. */
router.delete("/", async (req, res) => {
    try {
        const id = req.body.id;
        Expense.findById(id, (err, expense) => {
            if (!expense || expense === undefined) {
                res.status(404).json({ message: "There is no expense with the specified id" });
            }
            User.update({}, { $pull: { expenses: { $in: expense._id } } }, error => {
                expense.remove();
                res.status(202).json(expense);
            });
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;
