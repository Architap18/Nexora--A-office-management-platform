import api from "./api";

export const getProjects = () => api.get("/projects");

export const getProjectById = (id) => api.get(`/projects/${id}`);

export const createProject = (projectData) =>
    api.post("/projects", projectData);

export const deleteProject = (id) =>
    api.delete(`/projects/${id}`);