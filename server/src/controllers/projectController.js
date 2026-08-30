const projects = [
    {
        id: 1,
        name: "Nexora",
        description: "Team collaboration platform",
        members: 8,
        totalTasks: 24,
        completedTasks: 16,
        status: "active",
    },
    {
        id: 2,
        name: "Website Redesign",
        description: "Company website redesign",
        members: 5,
        totalTasks: 18,
        completedTasks: 9,
        status: "active",
    },
    {
        id: 3,
        name: "Mobile App",
        description: "iOS and Android application",
        members: 6,
        totalTasks: 15,
        completedTasks: 12,
        status: "active",
    },
];

const getProjects = (req, res) => {
    res.status(200).json({
        success: true,
        count: projects.length,
        projects,
    });
};

const getProjectById = (req, res) => {
    const id = Number(req.params.id);

    const project = projects.find(
        (project) => project.id === id
    );

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    res.status(200).json({
        success: true,
        project,
    });
};

module.exports = {
    getProjects,
    getProjectById,
};