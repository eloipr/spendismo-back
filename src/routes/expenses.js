const express = require("express");
const ExpenseDBManager = require("../db/expenseDBManager");

const router = express.Router();

/* GET List expenses of the logged user. */
router.get("/", (req, res) => {
    ExpenseDBManager.getAll("eloi")
        .then(expenses => {
            res.json(expenses);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

/* POST New expense for the logged user. */
router.post("/", async (req, res) => {
    ExpenseDBManager.create("eloi", req.body)
        .then(expense => {
            res.status(201).json(expense);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

/* DELETE Remove the specified expense from the logged user. */
router.delete("/", async (req, res) => {
    ExpenseDBManager.delete("eloi", req.body.id)
        .then(expense => {
            res.status(200).json(expense);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

module.exports = router;
