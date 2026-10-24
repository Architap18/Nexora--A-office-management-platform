const requireAuth = (req, res, next) => {
    const userId = req.headers["x-user-id"];

    if (!userId || isNaN(Number(userId))) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    req.userId = Number(userId);
    next();
};

module.exports = { requireAuth };
