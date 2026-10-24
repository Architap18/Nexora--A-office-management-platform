
import { useState, useEffect, useCallback } from "react";
import {
    getTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
} from "../services/taskService";

export function useTasks(projectId) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(Boolean(projectId));
    const [error, setError] = useState("");

    const load = useCallback(async () => {
        if (!projectId) {
            setTasks([]);
            setLoading(false);
            setError("");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await getTasks(projectId);
            setTasks(Array.isArray(data.tasks) ? data.tasks : []);
        } catch (err) {
            setError(err.message || "Failed to load tasks.");
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        void load();
    }, [load]);

    const create = async (taskData) => {
        const result = await createTask({
            ...taskData,
            project_id: Number(projectId),
        });

        await load();
        return result;
    };

    const changeStatus = async (id, status) => {
        await updateTaskStatus(id, status);

        setTasks((previous) =>
            previous.map((task) =>
                task.id === id ? { ...task, status } : task
            )
        );
    };

    const remove = async (id) => {
        await deleteTask(id);

        setTasks((previous) =>
            previous.filter((task) => task.id !== id)
        );
    };

    return {
        tasks,
        loading,
        error,
        load,
        create,
        changeStatus,
        remove,
    };
}
