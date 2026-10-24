
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

// GET /api/users/me/tasks
const getMyTasks = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    { assigned_to: userId },
                    {
                        created_by: userId,
                        project: {
                            workspace: { owner_id: userId },
                        },
                    },
                ],
            },
            select: {
                id: true,
                project_id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                due_date: true,
                created_at: true,
                project: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });

        return res.json({ success: true, tasks });
    } catch (error) {
        console.error("getMyTasks error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch tasks",
        });
    }
};

// GET /api/users/workspace/members
const getWorkspaceMembers = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const workspace = await prisma.workspace.findFirst({
            where: { owner_id: userId },
            select: {
                id: true,
                members: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                username: true,
                                created_at: true,
                            },
                        },
                    },
                },
            },
        });

        const members = workspace
            ? [
                  {
                      id: userId,
                      ...(await prisma.user.findUnique({
                          where: { id: userId },
                          select: {
                              name: true,
                              email: true,
                              username: true,
                              created_at: true,
                          },
                      })),
                  },
                  ...workspace.members.map((member) => member.user),
              ].filter(
                  (member, index, list) =>
                      member &&
                      list.findIndex((item) => item.id === member.id) === index
              )
            : [];

        return res.json({ success: true, members });
    } catch (error) {
        console.error("getWorkspaceMembers error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch workspace members",
        });
    }
};

// GET /api/users/dashboard/stats
const getDashboardStats = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const [
            activeProjects,
            totalTasks,
            tasksDueSoon,
            teamMembers,
        ] = await Promise.all([
            prisma.project.count({
                where: {
                    workspace: { owner_id: userId },
                    status: "active",
                },
            }),
            prisma.task.count({
                where: {
                    project: {
                        workspace: { owner_id: userId },
                    },
                },
            }),
            prisma.task.count({
                where: {
                    project: {
                        workspace: { owner_id: userId },
                    },
                    status: { not: "done" },
                    due_date: {
                        not: null,
                        gte: new Date(),
                        lte: new Date(
                            Date.now() + 7 * 24 * 60 * 60 * 1000
                        ),
                    },
                },
            }),
            prisma.workspaceMember.count({
                where: {
                    workspace: { owner_id: userId },
                    user_id: { not: userId },
                },
            }),
        ]);

        return res.json({
            success: true,
            stats: {
                activeProjects,
                totalTasks,
                tasksDueSoon,
                teamMembers,
            },
        });
    } catch (error) {
        console.error("getDashboardStats error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics",
        });
    }
};

// PUT /api/users/me
const updateMe = async (req, res) => {
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

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
        });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { name },
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
                phone_number: true,
            },
        });

        return res.json({ success: true, user });
    } catch (error) {
        console.error("updateMe error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
};

module.exports = {
    getMyTasks,
    getWorkspaceMembers,
    getDashboardStats,
    updateMe,
};
