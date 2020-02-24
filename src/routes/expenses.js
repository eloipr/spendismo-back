const express = require("express");
const ExpenseDBManager = require("./../db/expenseDBManager");

const router = express.Router();

/* GET List expenses of the logged user. */
router.get("/", (req, res) => {
    const loggedUser = req.user;
    ExpenseDBManager.getAll(loggedUser._id)
        .then(expenses => {
            res.json(expenses);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

/* GET List the month expenses of the logged user. */
router.get("/month/:month", (req, res) => {
    const month = req.params.month;
    const loggedUser = req.user;
    ExpenseDBManager.getByMonth(loggedUser._id, month)
        .then(expenses => {
            res.json(expenses);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

/* POST New expense for the logged user. */
router.post("/", (req, res) => {
    const loggedUser = req.user;
    ExpenseDBManager.create(loggedUser._id, req.body)
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
    const loggedUser = req.user;
    const expenseId = req.params.expense_id;
    ExpenseDBManager.delete(loggedUser._id, expenseId)
        .then(expense => {
            res.status(200).json(expense);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

module.exports = router;
