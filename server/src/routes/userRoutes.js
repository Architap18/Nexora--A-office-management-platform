const express = require("express");
const {
  getMyTasks,
  getWorkspaceMembers,
  getDashboardStats,
  updateMe,
} = require("../controllers/userController");

const router = express.Router();

router.use((req, res, next) => {
  console.log('UserRoutes request:', req.method, req.path);
  next();
});

router.get("/me/tasks", getMyTasks);
router.get("/workspace/members", getWorkspaceMembers);
router.get("/dashboard/stats", getDashboardStats);
router.put("/me", updateMe);
router.get("/test", (req, res) => res.json({ success: true, msg: "user test" }));

module.exports = router;
