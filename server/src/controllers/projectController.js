
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

async function getOrCreateWorkspace(userId) {
    const existingWorkspace = await prisma.workspace.findFirst({
        where: { owner_id: userId },
        select: { id: true },
    });

    if (existingWorkspace) {
        return existingWorkspace.id;
    }

    const workspace = await prisma.workspace.create({
        data: {
            name: "My Workspace",
            owner_id: userId,
        },
        select: { id: true },
    });

    return workspace.id;
}

// GET /api/projects
const getProjects = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const projects = await prisma.project.findMany({
            where: {
                workspace: { owner_id: userId },
            },
            select: {
                id: true,
                workspace_id: true,
                name: true,
                description: true,
                color: true,
                status: true,
                created_at: true,
                updated_at: true,
                _count: {
                    select: { tasks: true },
                },
            },
            orderBy: { created_at: "desc" },
        });

        return res.json({
            success: true,
            projects,
        });
    } catch (error) {
        console.error("getProjects error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
        });
    }
};

// GET /api/projects/:id
const getProjectById = async (req, res) => {
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
                message: "Invalid project ID",
            });
        }

        const project = await prisma.project.findFirst({
            where: {
                id,
                workspace: { owner_id: userId },
            },
            select: {
                id: true,
                workspace_id: true,
                name: true,
                description: true,
                color: true,
                status: true,
                created_at: true,
                updated_at: true,
                _count: {
                    select: { tasks: true },
                },
            },
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        return res.json({ success: true, project });
    } catch (error) {
        console.error("getProjectById error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch project",
        });
    }
};

// POST /api/projects
const createProject = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const name =
            typeof req.body?.name === "string"
                ? req.body.name.trim()
                : "";
        const description =
            typeof req.body?.description === "string"
                ? req.body.description.trim()
                : "";

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Project name is required",
            });
        }

        const workspaceId = await getOrCreateWorkspace(userId);

        const project = await prisma.project.create({
            data: {
                workspace_id: workspaceId,
                name,
                description: description || null,
                created_by: userId,
            },
            select: {
                id: true,
                workspace_id: true,
                name: true,
                description: true,
                color: true,
                status: true,
                created_at: true,
                updated_at: true,
            },
        });

        return res.status(201).json({
            success: true,
            project,
        });
    } catch (error) {
        console.error("createProject error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create project",
        });
    }
};

// DELETE /api/projects/:id
const deleteProject = async (req, res) => {
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
                message: "Invalid project ID",
            });
        }

        const project = await prisma.project.findFirst({
            where: {
                id,
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

        await prisma.project.delete({
            where: { id },
        });

        return res.json({
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error("deleteProject error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete project",
        });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    deleteProject,
};
