const tasks = [
    {
        id: 1,
        title: "Design login page",
        project: "Nexora",
        priority: "high",
        status: "in-progress",
        assignee: "Archita",
    },
    {
        id: 2,
        title: "Create authentication API",
        project: "Backend",
        priority: "high",
        status: "todo",
        assignee: "Archita",
    },
    {
        id: 3,
        title: "Setup project board",
        project: "Nexora",
        priority: "medium",
        status: "in-progress",
        assignee: "Archita",
    },
];

const getTasks = (req, res) => {
    res.status(200).json({
        success: true,
        count: tasks.length,
        tasks,
    });
};

const getTaskById = (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(
        (task) => task.id === id
    );

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    res.status(200).json({
        success: true,
        task,
    });
};

module.exports = {
    getTasks,
    getTaskById,
};