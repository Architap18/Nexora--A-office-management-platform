const express = require("express");
const cors = require("cors");
require("dotenv").config();

const healthRoutes = require("./routes/healthRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// =========================
// Middleware
// =========================

app.use(cors());
app.use(express.json());

// =========================
// Routes
// =========================

app.use("/api/health", healthRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

// =========================
// Root route
// =========================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Nexora API 🚀",
    });
});

// =========================
// Start server
// =========================

app.listen(PORT, () => {
    console.log(`Nexora API running on http://localhost:${PORT}`);
});