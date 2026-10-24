import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Sidebar() {
    const navigate = useNavigate();
    const { user, logout } = useAuthContext();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const links = [
        { name: "Dashboard", path: "/dashboard", icon: "⌂" },
        { name: "Projects", path: "/projects", icon: "▣" },
        { name: "My Tasks", path: "/tasks", icon: "✓" },
        { name: "Members", path: "/members", icon: "♙" },
        { name: "Chat", path: "/chat", icon: "◉" },
        { name: "Settings", path: "/settings", icon: "⚙" },
    ];

    return (
        <aside className="fixed left-0 top-0 flex h-screen w-[245px] flex-col border-r border-zinc-200 bg-white">

            {/* Logo */}
            <div className="flex h-[70px] items-center border-b border-zinc-200 px-6">
                <span className="text-xl font-bold text-zinc-900">
                    Nexora
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-5">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Workspace
                </p>

                <div className="space-y-1">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                                    isActive
                                        ? "bg-zinc-900 font-medium text-white"
                                        : "text-zinc-600 hover:bg-zinc-100"
                                }`
                            }
                        >
                            <span className="w-5 text-center">
                                {link.icon}
                            </span>

                            {link.name}
                        </NavLink>
                    ))}
                </div>
            </nav>

            {/* User */}
            <div className="border-t border-zinc-200 p-4">
                <div className="mb-3 flex items-center gap-3 px-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500 text-sm font-semibold text-white">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-800">
                            {user?.name || "User"}
                        </p>

                        <p className="truncate text-xs text-zinc-500">
                            {user?.email || ""}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 transition hover:bg-red-50 hover:text-red-600"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;