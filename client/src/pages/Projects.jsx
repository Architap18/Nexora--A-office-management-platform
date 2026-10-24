
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    getProjects,
    createProject,
    deleteProject,
} from "../services/projectService";

function Projects() {
    const navigate = useNavigate();
    const location = useLocation();

    const createFormRef = useRef(null);
    const nameInputRef = useRef(null);

    const [projects, setProjects] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getProjects();
            setProjects(data.projects || []);
        } catch (err) {
            setError(err.message || "Failed to load projects.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let cancelled = false;

        const fetchProjects = async () => {
            try {
                const data = await getProjects();

                if (!cancelled) {
                    setProjects(data.projects || []);
                    setError("");
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || "Failed to load projects.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void fetchProjects();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!location.state?.openCreate) return;

        const timer = setTimeout(() => {
            createFormRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            nameInputRef.current?.focus();
        }, 100);

        navigate("/projects", {
            replace: true,
            state: {},
        });

        return () => clearTimeout(timer);
    }, [location.state, navigate]);

    const handleCreate = async (event) => {
        event.preventDefault();

        if (!name.trim()) {
            setError("Please enter a project name.");
            return;
        }

        try {
            setError("");

            await createProject({
                name: name.trim(),
                description: description.trim(),
            });

            setName("");
            setDescription("");

            await loadProjects();
        } catch (err) {
            setError(err.message || "Failed to create project.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) {
            return;
        }

        try {
            setError("");
            await deleteProject(id);

            setProjects((current) =>
                current.filter((project) => project.id !== id)
            );
        } catch (err) {
            setError(err.message || "Failed to delete project.");
        }
    };

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">
                        Projects
                    </h1>

                    <p className="mt-1 text-sm text-zinc-500">
                        Manage your projects and tasks.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        createFormRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });

                        nameInputRef.current?.focus();
                    }}
                    className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                >
                    + New Project
                </button>
            </div>

            <form
                ref={createFormRef}
                onSubmit={handleCreate}
                className="mb-8 rounded-xl border border-zinc-200 bg-white p-6"
            >
                <h2 className="mb-4 text-lg font-semibold text-zinc-800">
                    Create New Project
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <input
                        ref={nameInputRef}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Project name"
                        required
                        className="rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                    />

                    <input
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        placeholder="Short description"
                        className="rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                >
                    + Create Project
                </button>
            </form>

            {error && (
                <div
                    role="alert"
                    className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600"
                >
                    {error}
                </div>
            )}

            {loading ? (
                <p className="text-zinc-500">Loading projects...</p>
            ) : projects.length === 0 ? (
                <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center">
                    <p className="text-zinc-500">
                        No projects yet. Create your first project!
                    </p>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
                        >
                            <h2 className="text-lg font-semibold text-zinc-900">
                                {project.name}
                            </h2>

                            <p className="mt-2 min-h-[40px] text-sm text-zinc-500">
                                {project.description ||
                                    "No description provided."}
                            </p>

                            <div className="mt-5 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(`/projects/${project.id}`)
                                    }
                                    className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
                                >
                                    Open
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(project.id)}
                                    className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Projects;
