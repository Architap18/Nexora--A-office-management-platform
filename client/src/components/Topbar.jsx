import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Topbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const pageNames = {
        "/dashboard": "Dashboard",
        "/projects": "Projects",
        "/tasks": "My Tasks",
        "/members": "Members",
        "/chat": "Team Chat",
        "/settings": "Settings",
    };

    const title =
        pageNames[location.pathname] ||
        (location.pathname.startsWith("/projects/")
            ? "Project Board"
            : "Nexora");

    const handleNewProject = () => {
        navigate("/projects", {
            state: { openCreate: true },
        });
    };

    return (
        <header className="fixed left-[245px] right-0 top-0 z-20 flex h-[70px] items-center justify-between border-b border-zinc-200 bg-white px-8">
            <div>
                <h1 className="text-lg font-semibold text-zinc-900">
                    {title}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={handleNewProject}
                    className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                    + New Project
                </button>

                <div
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500 text-sm font-semibold text-white"
                    title={user?.name || "User"}
                    aria-label={`Signed in as ${user?.name || "User"}`}
                >
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
            </div>
        </header>
    );
}

export default Topbar;