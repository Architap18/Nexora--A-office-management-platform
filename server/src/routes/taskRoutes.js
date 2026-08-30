const express = require("express");

const {
    getTasks,
    getTaskById,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);

router.get("/:id", getTaskById);

module.exports = router;