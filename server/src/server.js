
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prisma = require("./prismaClient");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const PORT = Number(process.env.PORT) || 5002;

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
}));
app.use(express.json({ limit: "1mb" }));

app.get("/api/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Nexora API is running",
    });
});

app.get("/api/health", async (req, res) => {
    try {
        const result = await prisma.$queryRaw`SELECT NOW() AS now`;

        res.status(200).json({
            success: true,
            database: "connected",
            time: result[0].now,
        });
    } catch (error) {
        console.error("Health check failed:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed",
        });
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
});

app.use((err, req, res, next) => {
    console.error("Unhandled request error:", err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        success: false,
        message:
            err.status && err.status < 500
                ? err.message
                : "Internal server error",
    });
});

const server = app.listen(PORT, () => {
    console.log(`Nexora API running at http://localhost:${PORT}`);
    console.log("Routes registered: auth, projects, tasks, users, messages");
});

async function shutdown() {
    server.close(async () => {
        try {
            await prisma.$disconnect();
        } finally {
            process.exit(0);
        }
    });
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

module.exports = app;
