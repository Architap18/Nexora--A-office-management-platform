
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
} from "../services/taskService";

function ProjectBoard() {
    const { projectId } = useParams();

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadTasks = useCallback(async () => {
        if (!projectId) {
            setError("A project ID is required.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data = await getTasks(projectId);
            setTasks(data.tasks || []);
        } catch (err) {
            setError(err.message || "Failed to load tasks.");
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        let cancelled = false;

        const fetchTasks = async () => {
            if (!projectId) {
                if (!cancelled) {
                    setError("A project ID is required.");
                    setLoading(false);
                }
                return;
            }

            try {
                const data = await getTasks(projectId);

                if (!cancelled) {
                    setTasks(data.tasks || []);
                    setError("");
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || "Failed to load tasks.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void fetchTasks();

        return () => {
            cancelled = true;
        };
    }, [projectId]);

    const handleCreate = async (event) => {
        event.preventDefault();

        if (!title.trim()) {
            setError("Please enter a task title.");
            return;
        }

        try {
            setError("");

            await createTask({
                project_id: Number(projectId),
                title: title.trim(),
                description: description.trim(),
            });

            setTitle("");
            setDescription("");

            await loadTasks();
        } catch (err) {
            setError(err.message || "Failed to create task.");
        }
    };

    const changeStatus = async (id, status) => {
        try {
            setError("");

            await updateTaskStatus(id, status);

            setTasks((current) =>
                current.map((task) =>
                    task.id === id ? { ...task, status } : task
                )
            );
        } catch (err) {
            setError(err.message || "Failed to update task.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this task?")) return;

        try {
            setError("");
            await deleteTask(id);

            setTasks((current) =>
                current.filter((task) => task.id !== id)
            );
        } catch (err) {
            setError(err.message || "Failed to delete task.");
        }
    };

    const columns = [
        { title: "To Do", status: "todo" },
        { title: "In Progress", status: "in_progress" },
        { title: "Done", status: "done" },
    ];

    if (loading) {
        return <p className="text-zinc-500">Loading tasks...</p>;
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-zinc-900">
                    Project Board
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                    Manage your project tasks.
                </p>
            </div>

            {error && (
                <div
                    role="alert"
                    className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600"
                >
                    {error}
                </div>
            )}

            <form
                onSubmit={handleCreate}
                className="mb-8 rounded-xl border border-zinc-200 bg-white p-6"
            >
                <h2 className="mb-4 font-semibold">Add Task</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Task title"
                        required
                        className="rounded-lg border border-zinc-300 px-4 py-2"
                    />

                    <input
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        placeholder="Task description"
                        className="rounded-lg border border-zinc-300 px-4 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 rounded-lg bg-zinc-900 px-5 py-2 text-sm text-white"
                >
                    + Add Task
                </button>
            </form>

            <div className="grid gap-5 lg:grid-cols-3">
                {columns.map((column) => {
                    const columnTasks = tasks.filter(
                        (task) => task.status === column.status
                    );

                    return (
                        <div
                            key={column.status}
                            className="rounded-xl bg-zinc-100 p-4"
                        >
                            <h2 className="mb-4 font-semibold text-zinc-700">
                                {column.title} ({columnTasks.length})
                            </h2>

                            <div className="space-y-3">
                                {columnTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="rounded-lg border border-zinc-200 bg-white p-4"
                                    >
                                        <h3 className="font-medium text-zinc-900">
                                            {task.title}
                                        </h3>

                                        {task.description && (
                                            <p className="mt-2 text-sm text-zinc-500">
                                                {task.description}
                                            </p>
                                        )}

                                        <select
                                            aria-label={`Status for ${task.title}`}
                                            value={task.status}
                                            onChange={(event) =>
                                                changeStatus(
                                                    task.id,
                                                    event.target.value
                                                )
                                            }
                                            className="mt-4 w-full rounded border border-zinc-300 p-2 text-sm"
                                        >
                                            <option value="todo">To Do</option>
                                            <option value="in_progress">
                                                In Progress
                                            </option>
                                            <option value="done">Done</option>
                                        </select>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(task.id)
                                            }
                                            className="mt-3 text-sm text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}

                                {columnTasks.length === 0 && (
                                    <p className="py-5 text-center text-sm text-zinc-400">
                                        No tasks
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProjectBoard;
