import api from "./api";

export const getTasks = (projectId) =>
    api.get(`/tasks/project/${projectId}`);

export const createTask = (taskData) =>
    api.post("/tasks", taskData);

export const updateTaskStatus = (id, status) =>
    api.patch(`/tasks/${id}/status`, { status });

export const deleteTask = (id) =>
    api.delete(`/tasks/${id}`);