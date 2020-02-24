const express = require("express");
const CategoryDBManager = require("./../db/categoryDBManager");

const router = express.Router();

/* GET List categories of the logged user. */
router.get("/", (req, res) => {
    const loggedUser = req.user;
    CategoryDBManager.getAll(loggedUser._id)
        .then(categories => {
            res.json(categories);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

/* POST New category for the logged user. */
router.post("/", (req, res) => {
    const loggedUser = req.user;
    CategoryDBManager.create(loggedUser._id, req.body)
        .then(category => {
            res.status(201).json(category);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

/* DELETE Remove the specified category from the logged user. */
router.delete("/:category_id", (req, res) => {
    const loggedUser = req.user;
    const categoryId = req.params.category_id;
    CategoryDBManager.delete(loggedUser._id, categoryId)
        .then(category => {
            res.status(200).json(category);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

module.exports = router;
