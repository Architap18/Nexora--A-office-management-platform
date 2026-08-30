import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FolderKanban,
    Users,
    CheckCircle2,
} from "lucide-react";

import api from "../services/api";

function Projects() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProjects = async () => {

            try {

                const response = await api.get("/projects");

                setProjects(response.data.projects);

            } catch (error) {

                console.error("Failed to fetch projects:", error);

                setError("Unable to load projects.");

            } finally {

                setLoading(false);

            }

        };

        fetchProjects();

    }, []);

    if (loading) {
        return <h2>Loading projects...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div>

            <div className="flex items-end justify-between mb-[28px]">

                <div>
                    <p className="text-[10px] text-[#71717a] tracking-[0.1em] font-bold m-0 mb-2 uppercase">
                        WORKSPACE
                    </p>

                    <h1 className="m-0 text-[30px] font-bold tracking-[-0.04em] text-[#18181b]">Projects</h1>

                    <p className="text-[#71717a] mt-[7px] mb-0 text-[13px]">
                        Manage your team's projects and progress.
                    </p>
                </div>

                <button className="border-0 bg-[#18181b] hover:bg-[#27272a] text-white rounded-lg px-3.5 py-[9px] text-[13px] font-semibold transition cursor-pointer">
                    + New project
                </button>

            </div>

            <div className="grid grid-cols-3 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1 gap-[16px]">

                {projects.map((project) => {

                    const progress =
                        Math.round(
                            (project.completedTasks /
                                project.totalTasks) * 100
                        );

                    const colorClass =
                        project.color === "blue"
                            ? "bg-[#dbeafe] text-[#2563eb]"
                            : project.color === "green"
                            ? "bg-[#dcfce7] text-[#16a34a]"
                            : "bg-[#f3e8ff] text-[#9333ea]";

                    return (
                        <Link
                            to={`/projects/${project.id}`}
                            className="block bg-white border border-[#e4e4e7] rounded-[12px] p-5 transition duration-200 hover:border-[#a1a1aa] hover:-translate-y-0.5"
                            key={project.id}
                        >

                            <div className="flex justify-between items-center">

                                <div className={`w-[35px] h-[35px] rounded-[9px] flex items-center justify-center font-bold ${colorClass}`}>
                                    <FolderKanban size={20} />
                                </div>

                                <span className="text-[#a1a1aa] text-sm">
                                    ↗
                                </span>

                            </div>

                            <h3 className="m-0 mt-[18px] mb-[5px] text-[15px] font-semibold text-[#18181b]">
                                {project.name}
                            </h3>

                            <p className="text-[#71717a] text-xs m-0 mb-[20px]">
                                {project.description}
                            </p>

                            <div className="flex gap-[15px] text-[#71717a] text-[11px] mb-[16px]">

                                <span className="flex items-center gap-[5px]">
                                    <Users size={15} />
                                    {project.members}
                                </span>

                                <span className="flex items-center gap-[5px]">
                                    <CheckCircle2 size={15} />
                                    {project.completedTasks}/
                                    {project.totalTasks}
                                </span>

                            </div>

                            <div className="h-[5px] bg-[#f4f4f5] rounded-[10px] overflow-hidden">

                                <div
                                    className="h-full bg-[#18181b] rounded-[inherit] transition-all duration-300"
                                    style={{
                                        width: `${progress}%`,
                                    }}
                                />

                            </div>

                            <small className="block mt-[7px] text-[#a1a1aa] text-[10px]">
                                {progress}% completed
                            </small>

                        </Link>
                    );

                })}

            </div>

        </div>
    );
}

export default Projects;