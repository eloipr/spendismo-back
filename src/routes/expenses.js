const express = require("express");
const ExpenseDBManager = require("../db/expenseDBManager");

const router = express.Router();

/* GET List expenses of the logged user. */
router.get("/", (req, res) => {
    console.log(req.user);
    ExpenseDBManager.getAll("eloi@gmail.com")
        .then(expenses => {
            res.json(expenses);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

/* POST New expense for the logged user. */
router.post("/", (req, res) => {
    ExpenseDBManager.create("eloi@gmail.com", req.body)
        .then(expense => {
            res.status(201).json(expense);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

/* UPDATE The expense with id == expense_id */
router.patch("/:expense_id", (req, res) => {
    const expenseId = req.params.expense_id;
    ExpenseDBManager.update(expenseId, req.body)
        .then(expense => {
            res.status(200).json(expense);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

/* DELETE Remove the specified expense from the logged user. */
router.delete("/:expense_id", (req, res) => {
    const expenseId = req.params.expense_id;
    ExpenseDBManager.delete("eloi@gmail.com", expenseId)
        .then(expense => {
            res.status(200).json(expense);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

module.exports = router;
