import {
    LayoutDashboard,
    CheckSquare,
    FolderKanban,
    MessageSquare,
    Users,
    Settings,
    LogOut,
    Zap,
    ChevronLeft,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const mainLinks = [
    {
        name: "Overview",
        path: "/",
        icon: LayoutDashboard,
    },
    {
        name: "My Tasks",
        path: "/tasks",
        icon: CheckSquare,
    },
    {
        name: "Projects",
        path: "/projects",
        icon: FolderKanban,
    },
];

const workspaceLinks = [
    {
        name: "Team Chat",
        path: "/chat",
        icon: MessageSquare,
    },
    {
        name: "Members",
        path: "/members",
        icon: Users,
    },
];

function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 bottom-0 z-20 flex flex-col bg-[#111113] text-[#a1a1aa] p-[20px_14px] w-[245px] max-[1000px]:w-[210px] max-[700px]:hidden overflow-y-auto">

            <div className="flex items-center justify-between mb-2">

                <div className="flex items-center gap-[10px] text-white text-[20px] font-bold p-[4px_8px_24px]">
                    <div className="w-[30px] h-[30px] rounded-[9px] bg-white text-[#111113] flex items-center justify-center font-extrabold text-sm">
                        <Zap size={19} />
                    </div>

                    <span>Nexora</span>
                </div>

                <button className="w-[28px] h-[28px] rounded-lg bg-transparent text-[#71717a] hover:text-white flex items-center justify-center border-0 cursor-pointer transition">
                    <ChevronLeft size={17} />
                </button>

            </div>

            <div className="flex items-center gap-[9px] p-2.5 border border-[#29292e] rounded-[10px] mb-[22px]">
                <div className="w-[28px] h-[28px] rounded-[7px] bg-[#e4e4e7] text-[#18181b] flex items-center justify-center font-bold text-xs shrink-0">
                    N
                </div>

                <div className="flex-1 flex flex-col gap-[2px]">
                    <span className="text-[#e4e4e7] text-xs font-semibold">Acme Workspace</span>
                    <small className="text-[10px] text-[#71717a]">8 members</small>
                </div>
            </div>

            <div className="mb-2">

                <p className="text-[10px] tracking-[0.08em] text-[#52525b] font-bold px-[10px] my-[15px_0_8px]">
                    WORKSPACE
                </p>

                <nav>
                    {mainLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-[11px] p-2.5 rounded-[8px] mb-[2px] text-[13px] transition duration-150 text-[#a1a1aa] hover:bg-[#1f1f23] hover:text-[#e4e4e7] ${
                                        isActive ? "bg-[#27272a] text-white" : ""
                                    }`
                                }
                            >
                                <Icon size={18} />
                                <span>{link.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>

            </div>

            <div className="mb-2">

                <p className="text-[10px] tracking-[0.08em] text-[#52525b] font-bold px-[10px] my-[15px_0_8px]">
                    COLLABORATE
                </p>

                <nav>
                    {workspaceLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-[11px] p-2.5 rounded-[8px] mb-[2px] text-[13px] transition duration-150 text-[#a1a1aa] hover:bg-[#1f1f23] hover:text-[#e4e4e7] ${
                                        isActive ? "bg-[#27272a] text-white" : ""
                                    }`
                                }
                            >
                                <Icon size={18} />
                                <span>{link.name}</span>

                                {link.name === "Team Chat" && (
                                    <span className="ml-auto bg-[#ef4444] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                                        3
                                    </span>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

            </div>

            <div className="mb-2">

                <div className="flex items-center justify-between text-[10px] tracking-[0.08em] text-[#52525b] font-bold px-[10px] mb-2">
                    <span>YOUR PROJECTS</span>
                    <button className="text-[#71717a] hover:text-white text-sm cursor-pointer border-0 bg-transparent">+</button>
                </div>

                <div className="flex items-center gap-[10px] p-[8px_10px] text-[13px] text-[#a1a1aa] rounded-[7px] hover:bg-[#1f1f23] hover:text-white cursor-pointer transition">
                    <span className="w-2 h-2 rounded-full shrink-0 bg-[#8b5cf6]"></span>
                    <span>Website Redesign</span>
                </div>

                <div className="flex items-center gap-[10px] p-[8px_10px] text-[13px] text-[#a1a1aa] rounded-[7px] hover:bg-[#1f1f23] hover:text-white cursor-pointer transition">
                    <span className="w-2 h-2 rounded-full shrink-0 bg-[#3b82f6]"></span>
                    <span>Mobile App</span>
                </div>

                <div className="flex items-center gap-[10px] p-[8px_10px] text-[13px] text-[#a1a1aa] rounded-[7px] hover:bg-[#1f1f23] hover:text-white cursor-pointer transition">
                    <span className="w-2 h-2 rounded-full shrink-0 bg-[#22c55e]"></span>
                    <span>Marketing</span>
                </div>

            </div>

            <div className="mt-auto border-t border-[#27272a] pt-3 flex flex-col gap-1">

                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `flex items-center gap-[11px] p-2.5 rounded-[8px] mb-[2px] text-[13px] transition duration-150 text-[#a1a1aa] hover:bg-[#1f1f23] hover:text-[#e4e4e7] ${
                            isActive ? "bg-[#27272a] text-white" : ""
                        }`
                    }
                >
                    <Settings size={18} />
                    <span>Settings</span>
                </NavLink>

                <button className="flex items-center gap-[11px] p-2.5 rounded-[8px] text-[13px] transition duration-150 text-[#a1a1aa] hover:bg-[#1f1f23] hover:text-[#e4e4e7] w-full bg-transparent border-0 cursor-pointer text-left">
                    <LogOut size={18} />
                    <span>Log out</span>
                </button>

                <div className="flex items-center gap-[9px] p-[10px_7px] mt-1">

                    <div className="w-8 h-8 rounded-full bg-[#e4e4e7] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0">
                        AP
                    </div>

                    <div className="flex flex-col gap-[2px]">
                        <strong className="block text-[#e4e4e7] text-xs font-semibold">Alex Parker</strong>
                        <span className="block text-[10px] text-[#71717a]">Admin</span>
                    </div>

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;