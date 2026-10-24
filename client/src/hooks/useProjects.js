
import { useState, useEffect, useCallback } from "react";
import {
    getProjects,
    createProject,
    deleteProject,
} from "../services/projectService";

export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getProjects();
            setProjects(Array.isArray(data.projects) ? data.projects : []);
        } catch (err) {
            setError(err.message || "Failed to load projects.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void load();
    }, [load]);

    const create = async (projectData) => {
        const result = await createProject(projectData);
        await load();
        return result;
    };

    const remove = async (id) => {
        await deleteProject(id);

        setProjects((previous) =>
            previous.filter((project) => project.id !== id)
        );
    };

    return { projects, loading, error, load, create, remove };
}
