
const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api"
).replace(/\/+$/, "");

async function request(endpoint, options = {}) {
    let user = null;

    try {
        user = JSON.parse(localStorage.getItem("nexoraUser") || "null");
    } catch {
        localStorage.removeItem("nexoraUser");
    }

    const normalizedEndpoint = endpoint.startsWith("/")
        ? endpoint
        : `/${endpoint}`;

    const headers = {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(user?.id ? { "x-user-id": String(user.id) } : {}),
        ...options.headers,
    };

    let response;

    try {
        response = await fetch(`${API_BASE_URL}${normalizedEndpoint}`, {
            ...options,
            headers,
        });
    } catch {
        throw new Error(
            `Cannot connect to the backend at ${API_BASE_URL}. Check that the server is running.`
        );
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            data.message || `Request failed with status ${response.status}`
        );
    }

    return data;
}

const api = {
    get: (endpoint) => request(endpoint),

    post: (endpoint, body) =>
        request(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        }),

    put: (endpoint, body) =>
        request(endpoint, {
            method: "PUT",
            body: JSON.stringify(body),
        }),

    patch: (endpoint, body) =>
        request(endpoint, {
            method: "PATCH",
            body: JSON.stringify(body),
        }),

    delete: (endpoint) =>
        request(endpoint, { method: "DELETE" }),
};

export default api;
