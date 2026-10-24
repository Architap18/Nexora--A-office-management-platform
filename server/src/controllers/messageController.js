const prisma = require("../prismaClient");

// Helper: get or create workspace for user
async function getWorkspaceId(userId) {
    const existing = await prisma.workspace.findFirst({
        where: { owner_id: userId },
        select: { id: true },
    });
    if (existing) return existing.id;
    const created = await prisma.workspace.create({
        data: { name: "My Workspace", owner_id: userId },
        select: { id: true },
    });
    return created.id;
}

// GET /api/messages
const getMessages = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const workspaceId = await getWorkspaceId(userId);

        const result = await prisma.message.findMany({
            where: { workspace_id: workspaceId },
            select: {
                id: true,
                message: true,
                created_at: true,
                user: {
                    select: { id: true, name: true, username: true },
                },
            },
            orderBy: { created_at: 'asc' },
            take: 100,
        });

        res.json({ success: true, messages: result });
    } catch (error) {
        console.error("getMessages error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// POST /api/messages
const sendMessage = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const { message } = req.body;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        if (!message || !message.trim()) {
            return res.status(400).json({ success: false, message: "Message is required" });
        }

        const workspaceId = await getWorkspaceId(userId);

        const result = await prisma.message.create({
            data: {
                workspace_id: workspaceId,
                user_id: userId,
                message: message.trim(),
            },
            select: { id: true, message: true, created_at: true },
        });

        // Fetch the full message with user info
        const full = await prisma.message.findUnique({
            where: { id: result.id },
            select: {
                id: true,
                message: true,
                created_at: true,
                user: { select: { id: true, name: true, username: true } },
            },
        });

        res.status(201).json({ success: true, message: full });
    } catch (error) {
        console.error("sendMessage error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { getMessages, sendMessage };
