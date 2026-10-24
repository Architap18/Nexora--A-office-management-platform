const express = require("express");

const {
    getTasksByProject,
    createTask,
    updateTaskStatus,
    deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/project/:projectId", getTasksByProject);
router.post("/", createTask);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

module.exports = router;