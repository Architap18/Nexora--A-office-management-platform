
const prisma = require("../prismaClient");

function getAuthenticatedUserId(req) {
    const rawUserId = req.headers["x-user-id"];

    if (
        rawUserId === undefined ||
        rawUserId === null ||
        String(rawUserId).trim() === ""
    ) {
        return null;
    }

    const userId = Number(rawUserId);

    return Number.isSafeInteger(userId) && userId > 0
        ? userId
        : null;
}

// GET /api/tasks/project/:projectId
const getTasksByProject = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);
        const projectId = Number(req.params.projectId);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        if (!Number.isSafeInteger(projectId) || projectId < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID",
            });
        }

        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                workspace: { owner_id: userId },
            },
            select: { id: true },
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        const tasks = await prisma.task.findMany({
            where: { project_id: projectId },
            orderBy: { created_at: "asc" },
            select: {
                id: true,
                project_id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                assigned_to: true,
                created_by: true,
                due_date: true,
                created_at: true,
                updated_at: true,
            },
        });

        return res.json({ success: true, tasks });
    } catch (error) {
        console.error("getTasksByProject error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch project tasks",
        });
    }
};

// POST /api/tasks
const createTask = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const projectId = Number(req.body?.project_id);
        const title =
            typeof req.body?.title === "string"
                ? req.body.title.trim()
                : "";
        const description =
            typeof req.body?.description === "string"
                ? req.body.description.trim()
                : "";

        if (!Number.isSafeInteger(projectId) || projectId < 1 || !title) {
            return res.status(400).json({
                success: false,
                message: "A valid project_id and title are required",
            });
        }

        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                workspace: { owner_id: userId },
            },
            select: { id: true },
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        const task = await prisma.task.create({
            data: {
                project_id: projectId,
                title,
                description: description || null,
                created_by: userId,
            },
            select: {
                id: true,
                project_id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                assigned_to: true,
                created_by: true,
                due_date: true,
                created_at: true,
                updated_at: true,
            },
        });

        return res.status(201).json({ success: true, task });
    } catch (error) {
        console.error("createTask error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create task",
        });
    }
};

// PATCH /api/tasks/:id/status
const updateTaskStatus = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);
        const id = Number(req.params.id);
        const { status } = req.body || {};

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        if (!Number.isSafeInteger(id) || id < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID",
            });
        }

        const validStatuses = ["todo", "in_progress", "in_review", "done"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value",
            });
        }

        const task = await prisma.task.findFirst({
            where: {
                id,
                project: {
                    workspace: { owner_id: userId },
                },
            },
            select: { id: true },
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { status },
            select: { id: true, status: true },
        });

        return res.json({ success: true, task: updatedTask });
    } catch (error) {
        console.error("updateTaskStatus error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update task",
        });
    }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);
        const id = Number(req.params.id);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        if (!Number.isSafeInteger(id) || id < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID",
            });
        }

        const task = await prisma.task.findFirst({
            where: {
                id,
                project: {
                    workspace: { owner_id: userId },
                },
            },
            select: { id: true },
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        await prisma.task.delete({
            where: { id },
        });

        return res.json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error("deleteTask error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete task",
        });
    }
};

module.exports = {
    getTasksByProject,
    createTask,
    updateTaskStatus,
    deleteTask,
};
