const express = require("express");
const Expense = require("../models/Expense");

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
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).send(error);
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
        res.status(400).send(error);
    }
});

module.exports = router;
